#! /usr/bin/make -f
# cmake-format: off
# /Makefile -*-makefile-*-
# SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
# cmake-format: on

# MAKEFLAGS += --warn-undefined-variables
SHELL := /bin/bash
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:
.SUFFIXES:

INSTALL_PREFIX?=.install/
PROJECT?=$(shell basename $(CURDIR))
BUILD_DIR?=.build
DEST?=$(INSTALL_PREFIX)
CMAKE_FLAGS?=

TARGETS := test clean all ctest

export

CONFIG?=Asan

export

ifeq ($(strip $(TOOLCHAIN)),)
	_build_name?=build-system/
	_build_dir?=.build/
	_configuration_types?="RelWithDebInfo;Debug;Tsan;Asan"
	_cmake_args=-DCMAKE_TOOLCHAIN_FILE=$(CURDIR)/etc/toolchain.cmake
else
	_build_name?=build-$(TOOLCHAIN)
	_build_dir?=.build/
	_configuration_types?="RelWithDebInfo;Debug;Tsan;Asan"
	_cmake_args=-DCMAKE_TOOLCHAIN_FILE=$(CURDIR)/etc/$(TOOLCHAIN)-toolchain.cmake
endif


_build_path?=$(_build_dir)/$(_build_name)

define run_cmake =
	cmake \
	-G "Ninja Multi-Config" \
	-DCMAKE_CONFIGURATION_TYPES=$(_configuration_types) \
	-DCMAKE_INSTALL_PREFIX=$(abspath $(INSTALL_PREFIX)) \
	-DCMAKE_EXPORT_COMPILE_COMMANDS=1 \
	$(_cmake_args) \
	$(CURDIR)
endef

default: test

$(_build_path):
	mkdir -p $(_build_path)

$(_build_path)/CMakeCache.txt: | $(_build_path)
	cd $(_build_path) && $(run_cmake)
	-rm compile_commands.json
	ln -s $(_build_path)/compile_commands.json

compile: $(_build_path)/CMakeCache.txt ## Compile the project
	cmake --build $(_build_path)  --config $(CONFIG) --target all -- -k 0

install: $(_build_path)/CMakeCache.txt ## Install the project
	DESTDIR=$(abspath $(DEST)) ninja -C $(_build_path) -k 0  install

ctest: $(_build_path)/CMakeCache.txt ## Run CTest on current build
	cd $(_build_path) && ctest --output-on-failure

ctest_ : compile
	cd $(_build_path) && ctest --output-on-failure

test: ctest_ ## Rebuild and run tests

cmake: |  $(_build_path)
	cd $(_build_path) && ${run_cmake}

clean: $(_build_path)/CMakeCache.txt ## Clean the build artifacts
	cmake --build $(_build_path)  --config $(CONFIG) --target clean

realclean: ## Delete the build directory
	rm -rf $(_build_path)

env:
	$(foreach v, $(.VARIABLES), $(info $(v) = $($(v))))

.PHONY: compile install ctest ctest_ test cmake clean realclean env

.PHONY: papers
papers:
	$(MAKE) -C papers papers

# Help target
.PHONY: help
help: ## Show this help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'  $(MAKEFILE_LIST) | sort

PYEXECPATH ?= $(shell which python3.12 || which python3.11 || which python3.10 || which python3.9 || which python3.8 || which python3.7 || which python3)
PYTHON ?= $(shell basename $(PYEXECPATH))
VENV := .venv
ACTIVATE := source $(VENV)/bin/activate;
PYEXEC := $(ACTIVATE) $(PYTHON)
INPUT_REQS := requirements.in
DEV_INPUT_REQS := requirements-dev.in
ALL_REQS := $(INPUT_REQS) $(DEV_INPUT_REQS) $(wildcard requirements-dev/*.in)
REQS_MARKER := $(VENV)/bin/.pip-sync

PIP := $(PYEXEC) -m pip

PIP_SYNC := $(PYEXEC) -m piptools sync

PIPTOOLS_COMPILE := $(PYEXEC) -m piptools compile --no-header

PRE_COMMIT := $(ACTIVATE) pre-commit

BASH := bash

setup := $(PYEXEC) setup.py

.PHONY: init-venv
init-venv:
	$(PYTHON) -m venv $(VENV)
	$(PIP) install -U setuptools pip wheel pip-tools
	@touch $(REQS_MARKER)

.PHONY: setup_venv
setup_venv:
	test -f $(VENV)/bin/activate || make init-venv


.PHONY: create-venv
create-venv: ## Create virtual environment from scratch and install all requirements.
	rm -rf $(VENV)/*
	make init-venv
	test -f requirements.txt || make resolve-requirements
	test -f requirements-dev.txt || make resolve-requirements
	make sync-dev-requirements

$(ALL_REQS) &:
	@touch $(ALL_REQS)

$(REQS_MARKER): $(ALL_REQS)
	make resolve-requirements

.PHONY: sync-dev-requirements
sync-dev-requirements: setup_venv $(REQS_MARKER)
	test -f requirements-dev.txt || make resolve-requirements
	$(PIP_SYNC) requirements-dev.txt

.PHONY: sync-requirements
sync-requirements: setup_venv $(REQS_MARKER)
	test -f requirements.txt || make resolve-requirements
	$(PIP_SYNC) requirements.txt

.PHONY: resolve-requirements
resolve-requirements:
	$(PIPTOOLS_COMPILE) --output-file=requirements-dev.txt $(DEV_INPUT_REQS)
	@echo "Updated requirements-dev.txt"
	$(PIPTOOLS_COMPILE) --output-file=requirements.txt $(INPUT_REQS)
	@echo "Updated requirements.txt"
	@touch $(REQS_MARKER)

.PHONY: update-requirements
update-requirements: ## Update all requirements to latest versions.
update-requirements:
	$(PIPTOOLS_COMPILE) --upgrade --output-file=requirements-dev.txt $(DEV_INPUT_REQS)
	@echo "Updated requirements-dev.txt"
	$(PIPTOOLS_COMPILE) --upgrade --output-file=requirements.txt $(INPUT_REQS)
	@echo "Updated requirements.txt"
	@touch $(REQS_MARKER)
	make sync-dev-requirements

.PHONY: check-requirements
check-requirements:
	@echo "Checking requirements..."
	$(eval REQ_TEMPDIR := $(shell mktemp -d))
	$(PIPTOOLS_COMPILE) --output-file=$(REQ_TEMPDIR)/requirements-dev.txt $(DEV_INPUT_REQS)
	$(PIPTOOLS_COMPILE) --output-file=$(REQ_TEMPDIR)/requirements.txt $(INPUT_REQS)
	@diff requirements-dev.txt $(REQ_TEMPDIR)/requirements-dev.txt && \
	diff requirements.txt $(REQ_TEMPDIR)/requirements.txt || \
	{ echo "Requirements are not up-to-date: run 'make update-requirements' to fix them."; \
	echo "Expected requirements.txt:"; cat $(REQ_TEMPDIR)/requirements.txt; \
	echo "Expected requirements-dev.txt:"; cat $(REQ_TEMPDIR)/requirements-dev.txt; \
	exit 1; }

.PHONY: dev-shell
dev-shell: sync-dev-requirements
dev-shell: ## Shell with the venv activated
	$(ACTIVATE) bash
