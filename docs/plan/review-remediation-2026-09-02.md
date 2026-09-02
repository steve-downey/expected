# Review Remediation Plan

## Objective

Resolve every confirmed code, proposal, documentation, citation, packaging, and
CI issue found in the 2026-09-02 repository review. Preserve
`docs/review-findings-2026-08-06.md` unchanged.

## Implementation

1. Reject initializer-list error construction whenever `E` is a reference in
   all three `expected` class-template forms. Apply matching constraints to
   declarations and definitions, provide a clear deleted-overload diagnostic,
   and update proposal wording so the unsafe form is explicitly unavailable.
2. Replace the reserved placeholder `__cpp_lib_expected_ref` with the public
   Beman-owned macro `BEMAN_EXPECTED_HAS_REFERENCES`, defined as `1` through
   shared public configuration. Document that macro detection is available to
   header consumers; module support itself is unconditional.
3. Add a global module fragment that includes `<version>` before
   `export module beman.expected`, ensuring feature-test-dependent declarations
   such as constexpr exception support match textual-header mode.
4. Preserve the current type-based rejection of xvalues and the current
   conservative exception specifications for reference-error assignment. Add
   rationale and tests rather than changing those semantics.

## Proposal and Citations

1. Correct every statement claiming `std::reference_wrapper::operator=` assigns
   through. Describe its actual rebinding semantics and retain only the valid
   objections: `.get()` friction, wrapper type identity, and monadic adaptation.
2. Correct the tuple/variant contradiction: tuple and pair support references;
   variant does not.
3. Change illustrative error storage from raw `E` to `unexpected<E>`.
4. Specify both `error_or` overloads with the non-reference error value type,
   matching the implementation.
5. Replace the claimed working-draft `static_assert` with the actual
   ill-formed-program requirement and remove the statement that included edits
   arrive in a later revision.
6. Explain that type-based dangling detection intentionally rejects xvalues
   because expression provenance cannot be recovered from the constructor's
   deduced types.
7. Set the paper date to `2026-09-02`.
8. Label D4270R0 as an unpublished draft and pin its citation to commit
   `5060f1e5c22db1e36db0bdb270e4e0efdcbd575d`.
9. Reflow wording and code blocks until significant overfull-box warnings are
   removed without changing normative meaning.

## Documentation and Infrastructure

1. Reconcile README platform guidance by retaining Windows setup information
   while clearly marking MSVC builds unsupported and unverified. Repair the
   malformed installed-tree code fence.
2. Rewrite install-test instructions for `beman.expected`, install all
   components by omitting `--component`, and set the consumer project to C++20.
3. Replace GoogleTest references with Catch2 and remove the invalid C++17
   contributing example.
4. Remove the developer-local GoogleTest override from the root Makefile and
   point its paper target at the current `papers` directory.
5. Remove the nonexistent `/papers/P2988` Dependabot entry.
6. Add CodeQL `c-cpp` analysis using a manual existing CMake preset build while
   retaining GitHub Actions analysis.
7. Refresh both review guides to describe three `expected` class-template
   forms, `unexpected<E>` storage, current assignment behavior, 3,405
   implementation lines, 19 positive test files, 688 Catch2 `TEST_CASE`s, and
   56 negative compile tests.
8. Delete `docs/optional_references.md` and replace any in-repository links to
   it with stable P2988 references.

## Tests and Acceptance Criteria

1. Add negative compile tests for initializer-list reference errors in
   `expected<T, E&>`, `expected<void, E&>`, and `expected<T&, E&>`.
2. Add positive/constraint assertions proving initializer-list construction for
   object error types remains available.
3. Add conditional header/module parity coverage for constexpr-exception
   declarations where supported.
4. Add tests that lock down prvalue and xvalue rejection and the existing
   conservative `noexcept` results.
5. Require GCC and Clang debug builds to pass all existing and new tests.
6. Require a clean install and external consumer test from a temporary prefix.
7. Build the paper with no unresolved citations or significant overfull boxes.
8. Run `clang-format --dry-run`, `gersemi --check`, `codespell`, Markdown/link
   checks, and workflow syntax validation.
9. Confirm final repository status contains only intended changes plus the
   untouched pre-existing untracked review document.

## Public Interface Effects

- Remove `__cpp_lib_expected_ref`.
- Add `BEMAN_EXPECTED_HAS_REFERENCES` with value `1`.
- Make initializer-list error constructors ill-formed for reference error
  types; these calls were previously accepted but always unsafe.
- Make no other ownership, layout, ABI, rebinding, or monadic semantic changes.
