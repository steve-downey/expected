# Fix: PR #57 Review Corrections

**Branch:** `fix-review-corrections`
**Depends on:** `expected-over-references` (all 10 steps complete)
**Read first:** `docs/plan/handoff.md`

---

## Goal

Fix four issues identified in the PR #57 code review:

1. `expected<void, E&>` unsafely accepts `unexpected<G>` (const_cast UB)
2. `expected<T&, E>::value() &&` over-constrains E (requires copy+move, only needs move)
3. Tautological `requires` clause on `expected<T&, E>` partial specialization
4. Member layout inconsistency in `expected<void, E&>` (unex_ptr_ before has_val_)

## Changes

### expected.hpp

**Issue 1:** Replace `unexpected<G>` constructors (lines 3908-3922) with
unconditionally deleted overloads matching `expected<T, E&>` and
`expected<T&, E&>`. Add deleted `operator=(unexpected<G>&)` overloads
after `operator=(expected&&)`.

**Issue 2 (investigated, no change):** The fallback
`reference_constructs_from_temporary_v` concept is correct for how it is
used. All constructor templates use forwarding references (U&&); lvalues
deduce U=T& (reference type), skipping the problematic disjunct 1.
Rvalues deduce U=T (non-reference), correctly triggering deletion.
GCC 11/12 hit the fallback and all CI checks pass.

**Issue 3:** `expected<T&, E>::value() &&` static_assert changed from
`is_copy_constructible_v<E> && is_move_constructible_v<E>` to just
`is_move_constructible_v<E>` (throw uses std::move). `expected<void,
E&>::value() &&` changed to just `is_copy_constructible_v<E>` (throw
copies, no std::move).

**Issue 4:** Removed `requires std::is_lvalue_reference_v<T&>` from the
`expected<T&, E>` partial specialization declaration. Always true by
construction.

**Issue 5:** Swapped `expected<void, E&>` member declaration order to
`bool has_val_; E* unex_ptr_;` matching all other specializations. Fixed
initializer-list order in default and in_place_t constructors.

### New test files

- `expected_void_ref_e_construct_from_unexpected_fail.cpp`
- `expected_void_ref_e_assign_unexpected_fail.cpp`

### CMakeLists.txt

Two new `add_fail_test()` entries with regex patterns matching the
existing `expected_ref_e_construct_from_unexpected_fail` pattern.

## Verification

```bash
make TOOLCHAIN=gcc-16 test
make lint
```
