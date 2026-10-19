# Test Plan Overview — beman::expected

This document summarises the testing approach across all 10 implementation
steps. Agents working a specific step should read this file and the
corresponding `tests-stepN.md` file for that step.

---

## Test Framework

**Catch2** (`catch2/catch_test_macros.hpp`, `Catch2::Catch2WithMain`).

---

## Standard Testing Conventions

### 1. Header idempotence
Every test file includes the header under test **twice**:
```cpp
#include <beman/expected/unexpected.hpp>
#include <beman/expected/unexpected.hpp>
```

### 2. Three tiers of negative testing

| Requirement type | Standard wording | How to test |
|-----------------|-----------------|-------------|
| **Constraint** | "Constraints: X is true" | Constructor/function removed from overload resolution → `static_assert(!std::is_constructible_v<...>)` in the normal test file |
| **Mandate** | "Mandates: X is true" | Ill-formed at instantiation → `static_assert(!std::is_invocable_v<...>)` or a negative compile file |
| **Hardened precondition** | "Hardened preconditions: X" | Runtime UB without contracts; if the implementation enforces contracts, use `REQUIRE_THROWS` under `#if defined(BEMAN_EXPECTED_HARDENED)` |

### 3. Negative compile test pattern

Each negative compile test is a `.cpp` file that **must not compile**, and
its failure must be verified against a **specific diagnostic** to confirm
the failure is the intended constraint/mandate, not an unrelated build error.

#### Source file format

Every `_fail.test.cpp` must have these comment lines near the top:

```cpp
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
// NEGATIVE: <human-readable description of what must not compile>
// EXPECT: "<regex that matches the compiler diagnostic>"
```

**The `EXPECT` line is the regex.** CMake reads it at configure time; there
is no second copy to keep in step. It is a CMake regular expression and
must not contain `;`. A file may carry several `EXPECT` lines; they are
joined with `|`, so split a long alternation one compiler's wording per
line rather than let clang-format reflow a line past column 119 (which
would also merge it into the comment after it). The regex should match:
- The `static_assert` message string for **mandates**
  (e.g. `"E must not be void"`)
- The `= delete("...")` message, or `"use of deleted function|call to
  deleted|attempting to reference"` (gcc, clang, MSVC) for deleted
  overloads without one
- `"no matching function|no matching constructor|no overloaded function
  could convert"` for **SFINAE / constraint** failures where no overload is
  viable
- An alternation of those when either form is possible depending on the
  compiler. Every alternative must be a wording some supported compiler
  actually produces; the test passes on the first match.

#### CMakeLists pattern

Register the file with `beman_add_xfail_compile_test()` from
`cmake/beman-xfail-compile.cmake`:

```cmake
beman_add_xfail_compile_test(
    expected_ref_e_void_fail
    SOURCE expected_ref_e_void_fail.test.cpp
    LINK_LIBRARIES beman::expected
)
```

The function builds an OBJECT library `beman.expected.tests.<name>` that is
excluded from the default build, and registers a ctest named `<name>` that
runs `cmake/beman-xfail-compile-driver.cmake`. The driver does a nested
build of just that target and passes only when the build fails **and** its
output matches `EXPECT`. It reports the two ways of failing separately:

- *compiled, but was expected to fail* — the constraint or mandate is not
  firing;
- *failed to compile, but not for the expected reason* — a typo in the
  test, or a compiler whose wording the regex does not yet cover. The
  build output is echoed; add the new wording as an alternative.

Every test carries the label `xfail-compile` (`ctest -L xfail-compile`
runs just this suite, `-LE` skips it) and a resource lock so `ctest -j`
never runs two nested builds at once. `EXPECT <regex>` may be passed
explicitly to override the comment; the header of the module documents
the full interface.

### 4. Type-trait / static_assert tests

Use `static_assert` outside any `TEST_CASE` for type-level requirements that
are checkable without runtime execution:

```cpp
// Positive: type IS constructible
static_assert(std::is_constructible_v<unexpected<int>, int>);

// Negative: constraint violation → type is NOT constructible
static_assert(!std::is_constructible_v<unexpected<int>, std::string>);

// Noexcept specification
static_assert(std::is_nothrow_move_constructible_v<expected<int, int>>);

// Triviality
static_assert(std::is_trivially_copy_constructible_v<expected<int, int>>);
```

### 5. Hardened precondition tests

The standard marks several observers with "Hardened preconditions:" — these
are UB when the condition is violated unless the implementation enforces
contracts:

| Function | Precondition |
|----------|-------------|
| `expected<T,E>::operator->()` | `has_value()` is true |
| `expected<T,E>::operator*()` | `has_value()` is true |
| `expected<T,E>::error()` | `has_value()` is false |
| `expected<void,E>::operator*()` | `has_value()` is true |
| `expected<void,E>::error()` | `has_value()` is false |

Guard these tests:
```cpp
#if defined(BEMAN_EXPECTED_HARDENED)
TEST_CASE("hardened: operator* on empty terminates", "[hardened]") {
    expected<int, int> e(unexpect, 0);
    REQUIRE_THROWS(e.operator*());  // or CHECK_THAT with death test
}
#endif
```

---

## Files per Step

| Step | Type | Test file | Negative compile files |
|------|------|-----------|----------------------|
| 1 | `unexpected<E>` | `unexpected.test.cpp` | `unexpected_array_fail.cpp`, `unexpected_cvref_fail.cpp`, `unexpected_self_fail.cpp` |
| 2 | `bad_expected_access<E>` | `bad_expected_access.test.cpp` | none |
| 3 | `expected<T,E>` (non-monadic) | `expected.test.cpp` | `expected_t_ref_fail.cpp`, `expected_e_ref_fail.cpp`, `expected_t_array_fail.cpp`, `expected_value_mandate_fail.cpp`, `expected_emplace_throwing_fail.cpp` |
| 4 | `expected<void,E>` | `expected_void.test.cpp` | E-constraint fail files |
| 5 | `expected<T,E>` monadic | `expected_monadic.test.cpp` | `and_then_wrong_error_type_fail.cpp`, `and_then_not_expected_fail.cpp`, `or_else_wrong_value_type_fail.cpp` |
| 6 | `expected<void,E>` monadic | `expected_void_monadic.test.cpp` | `void_and_then_wrong_error_type_fail.cpp`, `void_or_else_wrong_value_type_fail.cpp` |
| 7 | `expected<T&,E>` | `expected_ref.test.cpp` | `expected_ref_temporary_fail.cpp`, `expected_ref_no_default_fail.cpp`, `expected_ref_inplace_value_fail.cpp` |
| 8 | `expected<T,E&>` | `expected_ref_e.test.cpp` | `expected_ref_e_temporary_error_fail.cpp`, `expected_ref_e_const_lvalue_assignment_fail.cpp` |
| 9 | `expected<T&,E&>` | `expected_ref_both.test.cpp` | `expected_ref_both_temp_value_fail.cpp`, `expected_ref_both_temp_error_fail.cpp`, `expected_ref_both_no_default_fail.cpp` |
| 10 | `expected<void,E&>` | `expected_void_ref_e.test.cpp` | `expected_void_ref_e_temporary_fail.cpp`, `expected_void_ref_e_const_lvalue_fail.cpp`, `expected_void_ref_e_no_value_or_fail.cpp` |

### 6. Constraint and mandate coverage requirement

**Every `requires` clause, concept constraint, and `static_assert` mandate
in the implementation must have a corresponding negative test.** This is a
standing rule — not optional per step.

#### How to cover each kind:

**Constraints (requires clauses / SFINAE-friendly):**

Write `static_assert(!trait_v<...>)` in a `*_constraints.test.cpp` file.
For operations that need a callable argument (monadic ops, etc.), use a
concept detector:

```cpp
template <class X, class F>
concept has_and_then = requires(F f) { std::declval<X>().and_then(f); };

// Negative: lvalue overload constrained out when E is move-only
static_assert(!has_and_then<expected<int, MoveOnly>&, decltype(lambda)>);

// Positive: rvalue overload works (E is move-constructible)
static_assert(has_and_then<expected<int, MoveOnly>&&, decltype(lambda)>);
```

For rvalue-argument constraints (dangling prevention, emplace from rvalue),
use `std::declval` to force the argument category:

```cpp
template <class X, class U>
concept has_emplace_from = requires { std::declval<X&>().emplace(std::declval<U>()); };
```

**Mandates (static_assert — ill-formed on instantiation):**

Write a `*_fail.cpp` negative compile test registered with `add_fail_test()`
in CMakeLists. The file should be minimal — just `#include` the header and
attempt the ill-formed instantiation:

```cpp
#include <beman/expected/expected.hpp>
void test() {
    beman::expected::expected<int&, void> e; // must not compile
}
```

**Hardened preconditions:**

Write runtime tests under `#if defined(BEMAN_EXPECTED_HARDENED)` in a
`*_hardened.test.cpp` file compiled with `-DBEMAN_EXPECTED_HARDENED`.

#### What to cover for each step:

- Class-level `static_assert`s (E/T type requirements) → negative compile tests
- Constructor `requires` clauses → `static_assert(!is_constructible_v<...>)`
- Assignment `requires` clauses → `static_assert(!is_assignable_v<...>)`
- Member function `requires` clauses (swap, emplace, monadic) → concept detectors
- Triviality (`= default` paths) → `static_assert(is_trivially_*_v<...>)`
- Non-triviality → `static_assert(!is_trivially_*_v<...>)` with non-trivial E/T

#### Naming convention:

- `<specialization>_constraints.test.cpp` — SFINAE/requires tests
- `<specialization>_<what>_fail.cpp` — negative compile tests
- `<specialization>_hardened.test.cpp` — runtime precondition tests

---

## Standard Reference Summary

Key sections from the C++26 standard (docs/standard/expected.txt):

| Section | Covers |
|---------|--------|
| [expected.un.general] | `unexpected<E>` — ill-formed instantiations |
| [expected.un.cons] | `unexpected<E>` — constructor constraints |
| [expected.un.swap] | `unexpected<E>::swap` — Mandates |
| [expected.un.eq] | `unexpected<E>::operator==` — Mandates |
| [expected.bad] | `bad_expected_access<E>` |
| [expected.object.general] | `expected<T,E>` — ill-formed T and E |
| [expected.object.cons] | Constructors — Constraints, postconditions |
| [expected.object.assign] | Assignment — Constraints, reinit protocol |
| [expected.object.obs] | Observers — Hardened preconditions, Mandates |
| [expected.object.monadic] | Monadic ops — Constraints, Mandates on return type |
| [expected.void.*] | Same sections for void specialization |

Steps 7–10 (reference specializations) are not in the standard; they follow
the P2988 design (rebind semantics, dangling prevention, shallow const).

---

## CMakeLists Structure

Each step adds to `tests/beman/expected/CMakeLists.txt`:

```cmake
# Normal test target
add_executable(beman.expected.tests.<step>)
target_sources(beman.expected.tests.<step> PRIVATE <step>.test.cpp)
target_link_libraries(
    beman.expected.tests.<step>
    PRIVATE beman::expected Catch2::Catch2WithMain
)

include(Catch)
catch_discover_tests(beman.expected.tests.<step>)

# Negative compile targets (one per _fail.cpp)
# ... see negative compile pattern above
```
