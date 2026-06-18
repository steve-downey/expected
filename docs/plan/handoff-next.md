# Handoff: After Step 7 (expected<T&, E> Complete)

## What Was Done

Step 7 is complete. Branch `step7-expected-ref-t` implements
`expected<T&, E>` — the reference-value partial specialization (P2988).
313 tests pass, lint clean.

### Changes in Step 7

**`include/beman/expected/expected.hpp`:**
- Added `detail::reference_constructs_from_temporary_v` (portable fallback
  using `__cpp_lib_reference_from_temporary` when available, otherwise
  approximation via `is_convertible_v`)
- Added `expected<T&, E>` partial specialization (~670 lines) after the void
  specialization, with:
  - Storage: `union { T* val_; E unex_; }` + `bool has_val_`
  - No default constructor (`= delete`)
  - Copy/move constructors (trivial + non-trivial paths)
  - Value constructor with dangling-prevention delete overload
  - Converting constructors from `expected<U&, G>` (copy and move)
  - Error constructors from `unexpected<G>` (copy and move)
  - `unexpect_t` in-place error constructors
  - Rebind assignment (`operator=`) — rebinds pointer, never assigns through
  - Assignment from `unexpected<G>` (rebinds error)
  - Observers: `operator*()` → `T&`, `operator->()` → `T*`, `value()` → `T&`
  - Shallow const: `const expected<T&, E>` still gives `T*`/`T&` (not const)
  - `value_or()`, `error_or()`, `error()`
  - `swap()`, equality operators
  - Monadic ops: `and_then`, `or_else`, `transform`, `transform_error`
    (2 ref-qualified overloads each — `&` and `&&`)
  - Mandate static_asserts: E must not be reference, void, array, or cv-qual

**New test files:**
- `tests/beman/expected/expected_ref.test.cpp` — 477 lines of runtime tests
- `tests/beman/expected/expected_ref_constraints.test.cpp` — 259 lines of
  static_assert / type-trait checks
- Negative compile tests:
  - `expected_ref_temporary_fail.cpp` — binding temporary to T& is deleted
  - `expected_ref_no_default_fail.cpp` — no default constructor
  - `expected_ref_inplace_value_fail.cpp` — no in_place_t value constructor
  - `expected_ref_e_ref_fail.cpp` — E must not be reference
  - `expected_ref_e_void_fail.cpp` — E must not be void
  - `expected_ref_e_array_fail.cpp` — E must not be array
  - `expected_ref_e_cv_fail.cpp` — E must not be cv-qualified

**`tests/beman/expected/CMakeLists.txt`:**
- Added `beman.expected.tests.expected_ref` target
- Added `beman.expected.tests.expected_ref_constraints` target
- Added all 7 negative-compile fail targets

### Test count

313 tests total, all passing.

## Build Commands

```bash
make TOOLCHAIN=gcc-16 test   # 313 tests, all passing
make lint                    # all linters pass
```

## Step 7 Checklist

- [x] Step 7: `expected<T&, E>` — pointer storage, rebind assignment,
  observers returning T&, value_or, monadic ops, dangling prevention

## What Comes Next

**Step 8: `expected<T, E&>` error-reference specialization.**

Read `docs/plan/step8-expected-ref-e.md` for the full specification.

### Key differences from Step 7

The `expected-over-references` branch now has a fully conformant `expected<T,E>`
and `expected<void,E>` (modulo the extensions noted in the audit as conforming).
All constraint, Mandates, trivial SMF, monadic SFINAE, and precondition gaps
identified in the audit are resolved.

## Upstream Merge (2026-06-02)

Branch `merge-upstream` merged 94 commits from `bemanproject/sandbox-expected`
main and landed portability fixes for the full CI matrix. Now merged to `main`.

Key changes in the merge:
- Upstream dependabot bumps (harden-runner v2.19.4, codeql-action v4.36.0)
- `BEMAN_EXPECTED_CONSTEXPR_EXCEPTION` macro gating constexpr on
  `__cpp_lib_constexpr_exceptions` (std::exception not yet constexpr)
- `BEMAN_EXPECTED_TRAP()` macro for MSVC portability (`__debugbreak`)
- Module include guards (`BEMAN_EXPECTED_INCLUDED_FROM_INTERFACE_UNIT`)
- Inlined `unexpected<E>` bodies and `expected(U&&)` / `operator=(U&&)` for
  MSVC out-of-line requires-clause matching
- MSVC presets bumped to C++23 (avoids deprecated `std::unexpected` conflict)
- Dropped C++17 from CI matrix (implementation requires C++20 concepts)
- ASCII test names (MSVC/CTest garbles UTF-8 in filters)

**Start the next worktree from `origin/main` (post-merge).** All CI is green.
