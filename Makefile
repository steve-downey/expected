#! /usr/bin/make -f
# Makefile                                                       -*-makefile-*-
# SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception

NO_COLOR=1

INSTALL_PREFIX?=.install/
BUILD_DIR?=.build
DEST?=$(INSTALL_PREFIX)
CMAKE_FLAGS?=


PYEXECPATH ?= $(shell which python3.13 || which python3.12 || which python3.11 || which python3.10 || which python3.9 || which python3.8 || which python3)
PYTHON ?= $(notdir $(PYEXECPATH))
VENV := .venv
UV := $(shell command -v uv 2> /dev/null)
ACTIVATE := $(UV) run
PYEXEC := $(UV) run python
MARKER=.initialized.venv.stamp

PRE_COMMIT := $(UV) run pre-commit

TARGETS := test clean all ctest

export

.update-submodules:
	git submodule update --init --recursive
	touch .update-submodules

.gitmodules: .update-submodules

CONFIG?=Asan

export

ifeq ($(strip $(TOOLCHAIN)),)
	_build_name?=build-system/
	_build_dir?=.build/
	_local_toolchain?=$(CURDIR)/cmake/toolchain.cmake
else
	_build_name?=build-$(TOOLCHAIN)
	_build_dir?=.build/
	_local_toolchain?=$(CURDIR)/cmake/$(TOOLCHAIN)-toolchain.cmake
endif

_configuration_types?="RelWithDebInfo;Debug;Tsan;Asan;Gcov"

_build_path?=$(_build_dir)/$(_build_name)
_build_path:=$(subst //,/,$(_build_path))
_build_path:=$(patsubst %/,%,$(_build_path))

VCPKG ?= $(shell command -v vcpkg 2> /dev/null)

ifeq ($(VCPKG),)
	_cmake_top_level?="./cmake/use-fetch-content.cmake"
	_toolchain:=$(_local_toolchain)
	_args=
else
	_vcpkg_toolchain:=$(VCPKG_ROOT)/scripts/buildsystems/vcpkg.cmake
	_cmake_top_level?=$(_vcpkg_toolchain)
	export PROJECT_VCPKG_TOOLCHAIN=$(_local_toolchain)
	_toolchain:=$(_local_toolchain)
	_args=-DVCPKG_OVERLAY_TRIPLETS=$(CURDIR)/cmake -DVCPKG_TARGET_TRIPLET=x64-linux-custom
	# for debugging add 	-DVCPKG_INSTALL_OPTIONS="--debug"
endif

CMAKE ?= $(UV) run cmake
CTEST ?= $(UV) run ctest

define run_cmake =
	$(CMAKE) \
	-G "Ninja Multi-Config" \
	-DCMAKE_CONFIGURATION_TYPES=$(_configuration_types) \
	-DCMAKE_INSTALL_PREFIX=$(abspath $(INSTALL_PREFIX)) \
	-DCMAKE_EXPORT_COMPILE_COMMANDS=1 \
	-DCMAKE_PREFIX_PATH=$(CURDIR)/infra/cmake \
	-DCMAKE_PROJECT_TOP_LEVEL_INCLUDES=$(_cmake_top_level) \
	-DCMAKE_C_COMPILER_LAUNCHER=ccache \
	-DCMAKE_CXX_COMPILER_LAUNCHER=ccache \
	-DCMAKE_TOOLCHAIN_FILE=$(_toolchain) \
    $(_args) \
	$(_cmake_args) \
	$(CURDIR)
endef

default: test
.PHONY: default

$(_build_path):
	mkdir -p $(_build_path)

$(_build_path)/CMakeCache.txt: | $(_build_path) .gitmodules $(VENV)
	cd $(_build_path) && $(run_cmake)

$(_build_path)/compile_commands.json : $(_build_path)/CMakeCache.txt

.PHONY: compile_commands.json
compile_commands.json: $(_build_path)/compile_commands.json
compile_commands.json: ## symlink the current compile commands db
	if [ "$(shell readlink compile_commands.json)" != "$(_build_path)/compile_commands.json" ] ; then \
		ln -sf $(_build_path)/compile_commands.json ; \
	fi

TARGET:=all
.PHONY: TARGET

.PHONY: compile
compile: $(_build_path)/CMakeCache.txt
compile: compile_commands.json
compile:  ## Compile the project
	$(CMAKE) --build $(_build_path)  --config $(CONFIG) --target all -- -k 0

.PHONY: compile-headers
compile-headers: $(_build_path)/CMakeCache.txt ## Compile the headers
	 $(CMAKE) --build $(_build_path)  --config $(CONFIG) --target all_verify_interface_header_sets -- -k 0

.PHONY: install
install: $(_build_path)/CMakeCache.txt compile ## Install the project
	$(CMAKE) --install $(_build_path) --config $(CONFIG) --verbose

.PHONY: clean-install
clean-install:
	-rm -rf .install

.PHONY: realclean
realclean: clean-install

.PHONY: ctest
ctest: $(_build_path)/CMakeCache.txt ## Run CTest on current build
	$(CTEST) --test-dir $(_build_path) --output-on-failure -C $(CONFIG)

.PHONY: ctest_
ctest_ : compile
	$(CTEST) --test-dir $(_build_path) --output-on-failure -C $(CONFIG)

.PHONY: test
test: ctest_ ## Rebuild and run tests

.PHONY: cmake
cmake: |  $(_build_path)
	cd $(_build_path) && ${run_cmake}

.PHONY: clean
clean: $(_build_path)/CMakeCache.txt ## Clean the build artifacts
	$(CMAKE) --build $(_build_path)  --config $(CONFIG) --target clean

.PHONY: realclean
realclean: ## Delete the build directory
	rm -rf $(_build_path)

.PHONY: env
env:
	$(foreach v, $(.VARIABLES), $(info $(v) = $($(v))))

.PHONY: papers
papers: wording
	$(MAKE) -C papers papers

# ---- Generated [expected] wording ------------------------------------------
#
# The three annotated headers are one specgen document each and one paper: a
# single invocation renders them together, so --validate sees the paper-wide
# union of documented names and a name specified by a sibling header is not
# foreign.
#
# specgen writes the fragments; this makefile assembles expected.tex from them,
# because the paper's clause order is not the headers' declaration order and
# cannot be. bad_expected_access<void> is the base class of
# bad_expected_access<E>, so the header has to define it first, while the draft
# states the primary template first. $(WORDING_CLAUSES) is where that one
# divergence is written down.

SPECGEN ?= specgen

WORDING_HEADERS := $(addprefix include/beman/expected/, \
    unexpected.hpp bad_expected_access.hpp expected.hpp)

# In the draft's clause order, by stable name. These are the fragments that
# become expected.tex; specgen also writes one *.root.tex per document, holding
# the exposition-only helpers that sit outside every clause. The draft states
# those inline in the clause that uses them -- reinit-expected inside
# [expected.object.assign]'s own intro -- so they are deliberately not part of
# the assembled wording.
WORDING_CLAUSES := \
    expected.unexpected \
    expected.bad \
    expected.bad.void \
    expected.expected \
    expected.void \
    expected.ref

WORDING_DIR := papers/wording
WORDING_FRAGMENTS := \
    $(addprefix $(WORDING_DIR)/fragments/,$(addsuffix .tex,$(WORDING_CLAUSES)))

SPECGEN_CLANG_ARGS := -std=c++2c -Iinclude
ifneq ($(SPECGEN_GCC_TOOLCHAIN),)
SPECGEN_CLANG_ARGS += --gcc-toolchain=$(SPECGEN_GCC_TOOLCHAIN)
endif

# A grouped target (GNU Make 4.3+): one invocation writes all of these, and
# make must not run it once per fragment.
$(WORDING_FRAGMENTS) &: $(WORDING_HEADERS)
	@mkdir -p papers/.deps
	$(SPECGEN) generate $(WORDING_HEADERS) \
	    --backend latex --validate --base-section-depth 2 \
	    --split $(WORDING_DIR)/fragments \
	    --root expected.unexpected.root \
	    --root expected.bad.root \
	    --root expected.root \
	    --depfile papers/.deps/wording.d \
	    $(addprefix --dep-target ,$(WORDING_FRAGMENTS)) \
	    --no-compile-commands -- $(SPECGEN_CLANG_ARGS)

# Assembled into a temporary first: a half-written expected.tex that make
# believes is finished is worse than no expected.tex at all.
$(WORDING_DIR)/expected.tex: $(WORDING_DIR)/preamble.tex $(WORDING_FRAGMENTS)
	@cat $(WORDING_DIR)/preamble.tex > $@.tmp
	@for clause in $(WORDING_CLAUSES); do \
	    printf '\n' >> $@.tmp; \
	    cat $(WORDING_DIR)/fragments/$$clause.tex >> $@.tmp; \
	done
	@mv $@.tmp $@
	@echo "Wrote $@"

.PHONY: wording
wording: $(WORDING_DIR)/expected.tex ## Regenerate papers/wording/ from the annotated headers via specgen

# What specgen read to produce the fragments -- including headers reached only
# through an #include, which is the edge a hand-written prerequisite list
# forgets. Written by --depfile above; absent until the first run, hence
# $(wildcard): a bare glob that matches nothing stays a literal target name,
# and .DEFAULT below would hand it to cmake. Named, not globbed: papers/.deps/
# is also latexmk's -deps-out directory, and its paths are relative to papers/.
-include $(wildcard papers/.deps/wording.d)

.DEFAULT: $(_build_path)/CMakeCache.txt ## Other targets passed through to cmake
	$(CMAKE) --build $(_build_path)  --config $(CONFIG) --target $@ -- -k 0

.PHONY: all
all: compile


.PHONY: venv
venv: ## Create python virtual env
venv: $(VENV)/$(MARKER)

.PHONY: clean-venv
clean-venv:
clean-venv: ## Delete python virtual env
	-rm -rf $(VENV)

realclean: clean-venv

.PHONY: show-venv
show-venv: venv
show-venv: ## Debugging target - show venv details
	$(PYEXEC) -c "import sys; print('Python ' + sys.version.replace('\n',''))"
	@echo venv: $(VENV)

uv.lock: pyproject.toml
	$(UV) lock

$(VENV):
	$(UV) venv --python $(PYTHON)

$(VENV)/$(MARKER): uv.lock | $(VENV)
	$(UV) sync
	touch $(VENV)/$(MARKER)

.PHONY: dev-shell
dev-shell: venv
dev-shell: ## Shell with the venv activated
	$(ACTIVATE) $(notdir $(SHELL))

.PHONY: bash zsh
bash zsh: venv
bash zsh: ## Run bash or zsh with the venv activated
	$(ACTIVATE) $@

.PHONY: lint
lint: venv
lint: ## Run all configured tools in pre-commit
	$(PRE_COMMIT) run -a

.PHONY: lint-manual
lint-manual: venv
lint-manual: ## Run all manual tools in pre-commit
	$(PRE_COMMIT) run --hook-stage manual -a

.PHONY: coverage
coverage: ## Build and run the tests with the GCOV profile and process the results
coverage: venv $(_build_path)/CMakeCache.txt
	$(CMAKE) --build $(_build_path) --config Gcov
	$(ACTIVATE) ctest --build-config Gcov --output-on-failure --test-dir $(_build_path)
	$(CMAKE) --build $(_build_path) --config Gcov --target process_coverage

.PHONY: view-coverage
view-coverage: ## View the coverage report
	sensible-browser $(_build_path)/coverage/coverage.html

.PHONY: docs
docs: ## Build the docs with Doxygen
	doxygen docs/Doxyfile

.PHONY: mrdocs
mrdocs: ## Build the docs with Doxygen
	-rm -rf docs/adoc
	cd docs && NO_COLOR=1 mrdocs mrdocs.yml 2>&1 | sed 's/\x1b\[[0-9;]*m//g'
	find docs/adoc -name '*.adoc' | xargs asciidoctor

.PHONY: testinstall
testinstall: install
testinstall: ## Test the installed package
	mkdir -p installtest
	$(CMAKE) -S installtest -B installtest/.build
	$(CMAKE) --build  installtest/.build --target test

.PHONY: clean-testinstall
clean-testinstall:
	-rm -rf installtest/.build

realclean: clean-testinstall

ifeq ($(UV),)
define install_uv_cmd
pipx install uv
endef

define uv_error_message

'uv' command not found.
Please install uv or set the UV variable to the path of the uv binary.
The makefile target "install-uv" will run ``$(install_uv_cmd)''
endef

$(error "$(uv_error_message)")
endif

.PHONY: install-uv
install-uv: ## install uv via `pipx install uv`
	$(install_uv_cmd)

# ------------------------------------------------------------------------------
# Blog: org-mode -> GFM markdown, with UUID-anchored source transclusion.
#
# docs/blog/*.org posts pull code out of the tree with org-transclusion,
# resolved by the elisp in .emacs.d/. orgit-file: links are pinned to a
# committed git rev, so a published post keeps showing the code its prose was
# written about. See docs/blog/pins.md for the post-to-rev mapping.
# ------------------------------------------------------------------------------
EMACS := $(shell command -v emacs 2> /dev/null)

ORGFILES := $(wildcard *.org)

%.html : %.org
	$(EMACS) --init-directory=.emacs.d/ \
	--batch --load .emacs.d/init.el  \
	-f package-initialize \
	--eval "(setq enable-local-variables :all)" \
	--visit $< \
	--eval "(org-transclusion-mode t)" \
	--eval "(org-export-to-file 'html \"$@\")"
	echo $@ : \\ > $@.deps
	echo "  $<" \\ >> $@.deps
	sed -n "s/^.*\[\[file:\(\S*\)::.*$$/\1/p" < $<  | sort -u | xargs printf "  %s \\\\\\n" >> $@.deps

-include $(wildcard $(ORGFILES:%.org=%.html.deps))

%-slides.html : %.org
	$(EMACS) --init-directory=.emacs.d/ \
	--batch --load .emacs.d/init.el  \
	-f package-initialize \
	--eval "(setq enable-local-variables :all)" \
	--visit $< \
	--eval "(org-transclusion-mode t)" \
	--eval "(org-export-to-file 're-reveal \"$@\")"
	echo $@ : \\ > $@.deps
	echo "  $<" \\ >> $@.deps
	sed -n "s/^.*\[\[file:\(\S*\)::.*$$/\1/p" < $<  | sort -u | xargs printf "  %s \\\\\\n" >> $@.deps

-include $(wildcard $(ORGFILES:%.org=%-slides.html.deps))

BLOG_ORGFILES := $(wildcard docs/blog/*.org)

docs/blog/%.md : docs/blog/%.org
	$(EMACS) --init-directory=.emacs.d/ \
	--batch --load .emacs.d/init.el  \
	-f package-initialize \
	--eval "(setq enable-local-variables :all)" \
	--visit $< \
	--eval "(org-transclusion-mode t)" \
	--eval "(require 'ox-gfm)" \
	--eval "(org-export-to-file 'gfm \"$(abspath $@)\")"
	echo $@ : \\ > $@.deps
	echo "  $<" \\ >> $@.deps
	sed -n \
	  -e "s/^.*\[\[file:\(\S*\)::.*$$/\1/p" \
	  -e "s/^.*\[\[orgit:[^:]*::\([^:]*\)::.*$$/\1/p" \
	  < $< | sort -u | xargs printf "  %s \\\\\\n" >> $@.deps

-include $(wildcard $(BLOG_ORGFILES:.org=.md.deps))

.PHONY: blog-md
blog-md: $(BLOG_ORGFILES:.org=.md) ## convert docs/blog/*.org to GFM markdown

.PHONY: clean-blog-md
clean-blog-md:
	-rm -f $(BLOG_ORGFILES:.org=.md) $(BLOG_ORGFILES:.org=.md.deps)
clean: clean-blog-md


.PHONY: clean-emacs.d
clean-emacs.d:
	-rm -rf .emacs.d/eln-cache
	-rm -rf .emacs.d/elpa*

realclean: clean-emacs.d

.PHONY: clean-org-deps
clean-org-deps:
	-rm $(ORGFILES:%.org=%.org.deps)

# Help target
.PHONY: help
help: ## Show this help.
	@awk 'BEGIN {FS = ":.*?## "} /^[.a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'  $(MAKEFILE_LIST) | sort
