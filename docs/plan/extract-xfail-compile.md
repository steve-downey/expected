# Plan: extract-xfail-compile

**Branch:** `extract-xfail-compile` (from `upstream/main` at `cb743bf`)
**Read first:** `docs/plan/tests-overview.md` §3 and §6 — the negative
compile test pattern and the coverage rule that makes it load-bearing.

---

## Goal

Turn the `add_fail_test()` macro in `tests/beman/expected/CMakeLists.txt`
into a reusable CMake module that lives in `bemanproject/infra` next to
`beman-install-library.cmake` and `BuildTelemetryConfig.cmake`, is consumed
the same way (`include(infra/cmake/<module>.cmake)` then one function call per
test), and is documented in the infra README in the same shape as those two.

`beman.expected` becomes the first consumer, with no change to which tests
pass, and `beman.optional` is the obvious second one.

## What exists today

### In `beman.expected`

`tests/beman/expected/CMakeLists.txt` defines a three-argument macro and
calls it 59 times:

```cmake
macro(add_fail_test name source reason)
    add_library(beman.expected.tests.${name} OBJECT)
    target_sources(beman.expected.tests.${name} PRIVATE ${source})
    target_link_libraries(beman.expected.tests.${name} PRIVATE beman::expected)
    set_target_properties(beman.expected.tests.${name}
        PROPERTIES EXCLUDE_FROM_ALL true EXCLUDE_FROM_DEFAULT_BUILD true)
    add_test(NAME ${name}
        COMMAND ${CMAKE_COMMAND} --build "${CMAKE_BINARY_DIR}"
                --target beman.expected.tests.${name} --config $<CONFIGURATION>)
    set_tests_properties(${name} PROPERTIES PASS_REGULAR_EXPRESSION "${reason}")
endmacro()
```

The moving parts, each of which the module has to keep:

- **An OBJECT library per test**, excluded from `all`, so the ill-formed
  translation unit is never built by an ordinary build and is never linked.
  Linking to `beman::expected` is what gives it the real include paths,
  compile features, and (under `BEMAN_EXPECTED_USE_MODULES`) the module BMI.
- **The test is a nested build.** ctest runs `cmake --build --target` on that
  one object library, so the compiler invocation is exactly the one the
  library's own tests get: same toolchain file, same flags, same launcher.
- **Pass means "the output matched the regex".** A compile that succeeds
  produces no diagnostic and fails the test. A compile that fails for an
  unrelated reason also fails the test, because the regex names the intended
  `static_assert` text, deleted-function wording, or "no matching function".
  The regexes carry alternations for gcc, clang, and MSVC phrasing.

Every `*_fail.test.cpp` is also supposed to carry a header comment
(`// NEGATIVE: ...` and `// EXPECT: "<regex>"`) repeating the regex. An
audit on this branch's base shows that convention has drifted:

| EXPECT comment vs CMake regex | Files |
|---|---|
| identical | 35 |
| different (CMake regex is a superset, usually adding MSVC/clang wording) | 15 |
| no EXPECT comment at all | 9 |

So the CMake argument is the authority today and the comment is
documentation that has fallen behind. See
[expect-authority](#expect-authority).

### In `beman.optional`

One negative test (`constructor_fails`) built the same way, but checked with
`WILL_FAIL true` and the regex check commented out. That is the weaker form:
it passes when the file fails to compile for *any* reason, including a typo.
It is the same mechanism with the diagnostic check turned off, which is
exactly what a shared module makes cheap to turn back on.

### In `infra`

`infra/cmake/` holds two reusable modules and the shape to copy:

- `beman-install-library.cmake`: `include_guard(GLOBAL)`, a long header
  comment giving Usage / Arguments / Brief / Cache variables / Caveats, a
  `cmake_parse_arguments` keyword interface, verbose `message()`s prefixed
  with the function name, and a sibling data file (`Config.cmake.in`) found
  via `CMAKE_CURRENT_FUNCTION_LIST_DIR`.
- `BuildTelemetryConfig.cmake` plus `telemetry.sh`: a module that ships a
  helper script next to itself, callable via `include()` or via
  `find_package()` with `CMAKE_PREFIX_PATH=infra/cmake`.
- Both documented in `infra/README.md` under "CMake Modules".
- Formatting is gersemi, enforced by infra's pre-commit.

Nothing in infra does compile-failure tests, and infra has no tests of its
own modules; consumers are the test.

`infra/` in this repo is subtree-vendored by the `beman-submodule` CLI
(pinned in `infra/.beman_submodule` to `749c558`), so edits made under
`infra/` here are overwritten by the next `beman-submodule update`. The
module has to go upstream through a fork of `bemanproject/infra`
(`~/src/beman-infra/main`, `origin` = `steve-downey/infra`; it needs an
`upstream` remote added for the PR).

## Proposed interface

```cmake
include(infra/cmake/beman-xfail-compile.cmake)

beman_add_xfail_compile_test(unexpected_array_fail
    SOURCE unexpected_array_fail.test.cpp
    LINK_LIBRARIES beman::expected
    EXPECT "E must not be an array type"
)
```

```
beman_add_xfail_compile_test(<name>
    SOURCE <file>
    [EXPECT <regex>]                 # omitted: read `// EXPECT: "..."` from SOURCE
    [LINK_LIBRARIES <target>...]
    [COMPILE_DEFINITIONS <def>...]
    [TARGET_PREFIX <prefix>]         # default "${PROJECT_NAME}.tests."
    [LABELS <label>...]              # always also gets "xfail-compile"
)
```

- `<name>` is the ctest name, unchanged from today so `ctest -R` habits and
  CI logs keep working.
- The object-library target is `<TARGET_PREFIX><name>`; the default
  reproduces `beman.expected.tests.<name>` for this repo with no argument.
- Every test gets the label `xfail-compile`, so `ctest -L xfail-compile`
  runs just the negative suite and `-LE` skips it.
- Every test gets `RESOURCE_LOCK beman-xfail-compile-build-tree`. See
  [concurrent-nested-builds](#concurrent-nested-builds).
- A tiny `beman-xfail-compile-driver.cmake` next to the module is what
  ctest actually runs. See [failure-detection](#failure-detection).

## Stages

Ordinals are reading order only. Identity is the slug.

### Stage 1 — [module-in-project](#module-in-project)

Write the module as `cmake/beman-xfail-compile.cmake` in this repo, with
the exact content intended for infra (SPDX line, `include_guard(GLOBAL)`,
header doc block, gersemi-clean). Convert all 59 `add_fail_test` calls to
`beman_add_xfail_compile_test` with explicit `EXPECT`, keeping each regex
byte-identical. Delete the macro.

Acceptance: `ctest -N` lists the same 59 test names; the full suite passes
on gcc and on clang with libstdc++ (`make TOOLCHAIN=gcc-16 test`,
`make TOOLCHAIN=clang-23-libstdc++ test`); `make lint` is clean; a
deliberately broken regex on one test makes that one test fail.

This stage is mergeable to `main` on its own and does not wait on infra.

**Status:** DONE 2026-10-19. Log: call sites use gersemi's
definition-aware layout (`--definitions cmake/beman-xfail-compile.cmake`),
which also passes a plain `gersemi --check`. The `make lint` gate is read
as "every hook except beman-tidy's pre-existing failures", which clean
`main` shows too; they come from `.venv`/`.build` contents and the
repository name, not from these files.

### Stage 2 — [driver-script](#driver-script)

Add `cmake/beman-xfail-compile-driver.cmake` and have the module's
`add_test` run it with `-P`, passing build dir, target, `$<CONFIG>`, and
the regex. The driver runs the nested build with `execute_process`, then:

- exit code 0 → fail with "compiled, but was expected to fail";
- nonzero and output does not match → fail with "failed, but not for the
  expected reason", echoing the output;
- nonzero and output matches → pass, printing the matched line.

Also replace `$<CONFIGURATION>` with `$<CONFIG>`, add the `xfail-compile`
label, and set the `RESOURCE_LOCK`.

Acceptance: same 59 pass; the three outcomes above each produce their
message when provoked (a file that compiles, a file with a syntax error, a
genuine mandate violation); `ctest -j 8 -L xfail-compile` is clean.

**Status:** DONE 2026-10-19. Log: the driver omits `--config` when
`$<CONFIG>` is empty (single-config generators). Catch2 tests are
discovered at ctest time, so `ctest -LE xfail-compile -N` undercounts;
`-LE` still runs the right set.

### Stage 3 — [expect-in-source](#expect-in-source)

Make the source comment and the CMake regex agree again, then let the
module read the comment when `EXPECT` is omitted.

- Update the 15 drifted `// EXPECT:` lines to the CMake regex (the CMake
  one is the superset that already passes on three compilers) and add the
  missing 9.
- Implement the omitted-`EXPECT` path with `file(STRINGS ... REGEX)` at
  configure time plus `CMAKE_CONFIGURE_DEPENDS` on the source, and a
  `FATAL_ERROR` when neither an argument nor a comment supplies a regex.
- Drop the `EXPECT` arguments from the 59 calls in this repo so the
  comment is the one place the regex lives.
- Rewrite `docs/plan/tests-overview.md` §3 for the new function and the
  new rule ("the comment *is* the regex").

Acceptance: 59/59 of the `_fail.test.cpp` files carry an EXPECT comment;
removing one makes configure fail with a message naming the file.

### Stage 4 — [infra-pr](#infra-pr)

In `~/src/beman-infra/main`: add `upstream` → `bemanproject/infra`, branch,
copy the module and driver into `cmake/`, add a README section modelled on
the `beman_install_library` one (usage snippet, argument list, what the
test does, the label and lock, the EXPECT-from-source rule), run
pre-commit, open the PR against `bemanproject/infra`. Point at this repo's
59 uses and optional's one as the implementation experience.

### Stage 5 — [adopt-pin](#adopt-pin)

After the infra PR merges: `beman-submodule update --remote` here, delete
`cmake/beman-xfail-compile*.cmake`, change the `include()` path to
`infra/cmake/`, and re-run the Stage 1 acceptance. Then offer
`beman.optional` a one-test PR that swaps its `WILL_FAIL` for the module
with a real regex.

Stages 1–3 are a single PR to `bemanproject/expected` (one commit each, or
squashed; the review unit is the PR). Stage 4 is a PR elsewhere. Stage 5
is a small follow-up PR here.

## Decisions

Entry shape: Question / Status / Decision / Why / Decided by / Log.
Divergences append dated lines to the Log of the question they touch.

### module-name

**Question:** What are the module file and function called?
**Status:** OPEN (recommendation below; final name is the infra reviewers')
**Decision (proposed):** `beman-xfail-compile.cmake` providing
`beman_add_xfail_compile_test()`.
**Why:** Matches `beman-install-library.cmake` / `beman_install_library()`
in the file-to-function mapping. "xfail" is the established test-suite term
for "expected to fail" (DejaGnu, pytest, lit); "compile" says which phase.
"negative test" was rejected because it does not say *compile*.
**Decided by:** plan author, pending infra review.
**Log:** 2026-10-19 opened.

### argument-shape

**Question:** Positional `(name source reason)` as today, or keywords?
**Status:** DECIDED
**Decision:** Keywords via `cmake_parse_arguments`; `<name>` positional.
**Why:** Matches `beman_install_library`. Positional would have to grow
(link targets, definitions, labels) and a third positional regex is already
hard to read in the 59 call sites. Cost: every call site changes once.
**Decided by:** plan author.
**Log:** 2026-10-19 decided.

### build-mechanism

**Question:** Keep the nested `cmake --build --target` or switch to
`try_compile` / a direct compiler invocation?
**Status:** DECIDED
**Decision:** Keep the nested build of an excluded OBJECT library.
**Why:** It is the only mechanism that inherits the target's full usage
requirements — include dirs, `cxx_std_23`, module BMIs, toolchain flags,
compiler launcher — without re-deriving them. `try_compile` at test time
would need those exported by hand and would silently diverge from the real
build. Both beman repos that have negative tests already use this form.
Costs: each test is a `cmake` + `ninja` process pair (acceptable for 59),
and nested builds in one tree must not run concurrently (see
[concurrent-nested-builds](#concurrent-nested-builds)).
**Decided by:** plan author.
**Log:** 2026-10-19 decided.

### failure-detection

**Question:** `PASS_REGULAR_EXPRESSION` alone, `WILL_FAIL`, or a driver?
**Status:** DECIDED
**Decision:** A `-P` driver script that checks exit status *and* regex.
**Why:** `WILL_FAIL` alone passes on any failure, including a syntax error
in the test file (optional's current weakness). `PASS_REGULAR_EXPRESSION`
alone is what this repo has and it works, but it cannot distinguish "built
successfully" from "failed for the wrong reason" in its report, and it
would pass if a *successful* build's output happened to contain the regex
(a warning quoting the message, say). ctest cannot combine WILL_FAIL with
a regex check, because WILL_FAIL inverts the whole result. The driver gives
all three outcomes a distinct message, which is what someone debugging a
new compiler's phrasing needs. Precedent for a helper script beside the
module: `telemetry.sh`.
**Decided by:** plan author.
**Log:** 2026-10-19 decided. Regex reaches the driver as a `-D` value;
`|` and spaces are fine, `;` is not, and no regex here contains one — the
module will `FATAL_ERROR` on a `;`.

### expect-authority

**Question:** Which is authoritative, the `// EXPECT:` comment or the CMake
argument?
**Status:** DECIDED
**Decision:** The comment, once reconciled; the argument is an override.
**Why:** Two copies drift — 24 of 59 already have. The regex is a statement
about the test file's diagnostic, so it belongs next to the ill-formed
line it describes, and a reviewer reading one file sees both. CMake reads
it at configure time cheaply. The argument stays for files the project
cannot annotate (vendored sources) and for one-off overrides.
**Decided by:** plan author.
**Log:** 2026-10-19 decided. Reconciliation goes toward the CMake regex,
not the comment, because the CMake regex is the one proven on gcc, clang,
and MSVC.

### concurrent-nested-builds

**Question:** Is it safe to run these tests under `ctest -j`?
**Status:** DECIDED
**Decision:** Set `RESOURCE_LOCK` on every xfail test so ctest serializes
them against each other (other tests still run alongside).
**Why:** Several `ninja` processes in one build directory race on
`.ninja_log` and `.ninja_deps`. Today's CI and `make test` run ctest
serially so it has not bitten, but a shared module will be used by repos
that pass `-j`. A lock is free when serial and correct when not.
**Decided by:** plan author.
**Log:** 2026-10-19 decided.

### target-naming

**Question:** How is the per-test object library named?
**Status:** DECIDED
**Decision:** `${TARGET_PREFIX}${name}`, default prefix
`${PROJECT_NAME}.tests.`.
**Why:** Reproduces `beman.expected.tests.<name>` here with no argument,
and gives any `beman.<x>` project the same convention automatically. The
argument exists for projects whose test targets are named otherwise.
**Decided by:** plan author.
**Log:** 2026-10-19 decided.

### staging-path

**Question:** Develop the module under `infra/` here, or under `cmake/`?
**Status:** DECIDED
**Decision:** Under `cmake/` here first, identical content, then move.
**Why:** `infra/` is vendored and would be clobbered by the next pin
update, and a PR here cannot depend on when infra merges. The project-local
copy is deleted in [adopt-pin](#adopt-pin); the only diff at that point is
one `include()` path.
**Decided by:** plan author.
**Log:** 2026-10-19 decided.

### infra-self-test

**Question:** Should infra gain a test of this module?
**Status:** OPEN
**Decision:** None yet. Infra has no module tests today and its CI is
pre-commit only; a smoke project under `cmake/` would be a new kind of
thing there. Raise it in the infra PR and let the maintainers choose.
**Decided by:** —
**Log:** 2026-10-19 opened.

### find-package-form

**Question:** Offer `find_package(BemanXfailCompile)` like telemetry does?
**Status:** DECIDED
**Decision:** No. `include()` only, like `beman_install_library`.
**Why:** The telemetry Config file exists so the module can be injected via
`CMAKE_PROJECT_TOP_LEVEL_INCLUDES` into builds that do not know about it.
A test-registration function is always called from the consuming
CMakeLists, so there is nothing to inject.
**Decided by:** plan author.
**Log:** 2026-10-19 decided.

## Files touched

| Stage | File | Change |
|---|---|---|
| module-in-project | `cmake/beman-xfail-compile.cmake` | new |
| module-in-project | `tests/beman/expected/CMakeLists.txt` | macro removed; 59 calls rewritten |
| driver-script | `cmake/beman-xfail-compile-driver.cmake` | new |
| expect-in-source | `tests/beman/expected/*_fail.test.cpp` | 24 EXPECT lines added or aligned |
| expect-in-source | `docs/plan/tests-overview.md` | §3 rewritten |
| infra-pr | `bemanproject/infra: cmake/beman-xfail-compile*.cmake`, `README.md` | new module + docs |
| adopt-pin | `infra/`, `cmake/beman-xfail-compile*.cmake` | pin bumped; local copies deleted |

## Out of scope

- Changing *which* diagnostics the 59 tests expect. Regex text moves; it
  does not change.
- Making the negative suite faster by batching translation units. One
  file per test is what gives each mandate its own named result.
- beman-tidy rules about negative tests.
