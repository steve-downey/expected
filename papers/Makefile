# Makefile                                                       -*-makefile-*-
# SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception

export

MAKEFLAGS += --no-builtin-rules

.SUFFIXES:

PYEXECPATH ?= $(shell which python3.13 || which python3.12 || which python3.11 || which python3.10 || which python3.9 || which python3.8 || which python3)
PYTHON ?= $(notdir $(PYEXECPATH))
VENV := .venv
UV := $(shell command -v uv 2> /dev/null)
ACTIVATE := $(UV) run
PYEXEC := $(UV) run python
MARKER = .initialized.venv.stamp
DEPS_DIR := .deps

default: papers

.PHONY: env
env:
	$(foreach v, $(.VARIABLES), $(info $(v) = $($(v))))

.PHONY: realclean
realclean: ## Delete all artifacts

.PHONY: venv
venv: ## Create python virtual env
venv: $(VENV)

.PHONY: clean-venv
clean-venv: ## Delete python virtual env
	-rm -rf $(VENV)

realclean: clean-venv

$(VENV):
	$(UV) venv --python $(PYTHON)

.PHONY: dev-shell
dev-shell: venv
dev-shell: ## Shell with the venv activated
	$(ACTIVATE) $(notdir $(SHELL))

.PHONY: bash zsh
bash zsh: venv
bash zsh: ## Run bash or zsh with the venv activated
	$(ACTIVATE) $@

$(DEPS_DIR):
	mkdir -p $(DEPS_DIR)

.PHONY: papers
papers: D4280R0.pdf ## Compile papers

D4280R0.pdf : D4280R0.tex expected-new.tex wg21.bib

%.pdf : %.tex $(DEPS_DIR) | $(VENV)
	latexmk -f -shell-escape -pdflua -use-make -deps -deps-out=$(DEPS_DIR)/$@.d -MP $<

.PHONY: strip-wording
strip-wording: expected-clean.tex ## Assemble clean [expected] wording for a working-draft pull request

# expected-clean.tex is the clean [expected] wording to submit as a pull request
# against the C++ working draft. Its subclause bodies are the specgen-generated
# fragments -- the source of truth -- assembled by the repository-root makefile
# into wording/expected.tex, so this file cannot lag the annotated headers. Only
# [expected.general] and [expected.syn] are hand-authored prose specgen does not
# emit; they are taken from expected-new.tex, everything above the first
# generated clause, with its \added/addedblock change markup stripped.
expected-clean.tex: expected-new.tex strip-wording.py wording/expected.tex
	{ sed '/\\rSec2\[expected\.unexpected\]/,$$d' expected-new.tex \
	    | python3 strip-wording.py; \
	  cat wording/expected.tex; } > $@.tmp
	mv $@.tmp $@

# wording/expected.tex is generated from the annotated headers by the
# repository-root makefile. Delegate to it unconditionally, so a build started
# here rather than by `make papers` from the root still regenerates any clause a
# header edit staled; the root rule rewrites the file only when something
# changed, so this stays a no-op -- and expected-clean.tex only rebuilds -- when
# nothing did.
.PHONY: FORCE
wording/expected.tex: FORCE
	$(MAKE) -C .. wording
FORCE:

define curl_cmd =
	curl https://wg21.link/index.bib > wg21.bib
endef

wg21.bib:
	$(curl_cmd)

.PHONY: curl-bib
curl-bib:  ## Download wg21.bib from wg21.link
	$(curl_cmd)

.PHONY: clean
clean:
	-latexmk -c
	-rm *.pdf

# Include dependencies
-include $(DEPS_DIR)/*.d

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

# Help target
.PHONY: help
help: ## Show this help.
	@awk 'BEGIN {FS = ":.*?## "} /^[.a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'  $(MAKEFILE_LIST) | sort
