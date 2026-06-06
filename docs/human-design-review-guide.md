# Human Design Review Guide: `beman::expected`

**Target Audience:** Human reviewers, WG21 participants, and anyone deciding whether this code should become standard library wording.

## What This Is

A complete implementation of `std::expected` (C++26) extended with six template specializations that allow `T` and/or `E` to be reference types, proposed for C++29. The reference semantics follow P2988 (`optional<T&>`): rebind on assignment, shallow const, dangling prevention via deleted constructors.

**File count:** 3 headers, ~4400 lines of implementation, 15 positive test files (469 tests), 54 negative compile tests.

**This guide is not a checklist.** It's a map of the decisions that shaped this code. Some are obviously correct. Some are defensible but debatable. Some might be wrong. Your job is to decide which is which.

---

## Decision 1: Six Separate Specializations, Zero Abstraction

### What was done

The implementation provides six complete, independent partial specializations:

| Specialization | Lines | Storage |
|----------------|-------|---------|
| `expected<T, E>` | ~1100 | `union { T val_; E unex_; }` + bool |
| `expected<void, E>` | ~800 | `union { E unex_; }` + bool |
| `expected<T&, E>` | ~700 | `T*` + `union { E unex_; }` + bool |
| `expected<T, E&>` | ~700 | `union { T val_; }` + `E*` + bool |
| `expected<T&, E&>` | ~550 | `T*` + `E*` + bool |
| `expected<void, E&>` | ~450 | `E*` + bool |

Each specialization is a self-contained class with its own constructors, assignment operators, observers, swap, equality, and monadic operations. There is no shared base class, no CRTP, no mixin, no macro that generates them.

### Why this matters

The total is ~4300 lines of template code in a single header. A factored implementation using a common base or policy template could plausibly cut this by 40-60%. The monadic operations alone account for 4 operations x 4 ref-qualified overloads x 6 specializations = 96 method definitions that share structural similarity.

### The argument for the current approach

- Standard library implementations (libstdc++, libc++, MSVC STL) use flat specializations for `optional` and `expected`. Inheritance-based factoring produces incomprehensible error messages.
- Each specialization can be read and audited independently against whatever future standard wording emerges.
- When constraints differ subtly between specializations (and they do — `T&` doesn't need `is_nothrow_move_constructible` checks, `E&` doesn't support `unexpected<G>` construction), a shared base must either disable features via SFINAE or push complexity into the base, which hides it rather than removing it.

### The argument against

- **Maintenance burden.** A bug in `and_then` must be fixed in 6 places. A new monadic operation (hypothetical `or_transform`) must be added 24 times (4 overloads x 6 specializations).
- **Consistency risk.** Are all 6 specializations actually consistent? Small divergences creep in when hand-copying constraint clauses. The only way to verify is exhaustive side-by-side comparison.
- **Review fatigue.** A reviewer looking at 4300 lines of structurally similar code will inevitably skim. The 95th `requires` clause gets less scrutiny than the 5th.

### What to decide

Is the flat structure appropriate for a reference implementation intended to validate proposed wording? Or should this be refactored before being held up as "this is how it should look in a standard library"?

---

## Decision 2: Rebind Semantics (Not Assign-Through)

### What was done

Assignment to `expected<T&, E>` rebinds the internal pointer to point at a different object. It does not assign through the reference to modify the original referent.

```cpp
int a = 1, b = 2;
expected<int&, int> e(a);
e = expected<int&, int>(b);  // e now points to b; a is unchanged
```

### Why this is the only defensible choice

P2988 settled this for `optional<T&>` after years of debate. JeanHeyd Meneide's research demonstrated that assign-through semantics are a persistent source of bugs in practice, and every production optional-with-references implementation that tried assign-through was eventually abandoned or revised. The same logic applies to `expected`.

### What to discuss anyway

- **User expectation.** C++ programmers coming from `std::reference_wrapper` expect assign-through (that's what `reference_wrapper::operator=` does). This will surprise some users.
- **`emplace` also rebinds.** `e.emplace(new_ref)` rebinds, which is the only sensible behavior, but it differs from `expected<T, E>::emplace(args...)` which constructs in-place. The name `emplace` is arguably misleading for reference types since nothing is being "emplaced" — a pointer is being reassigned.
- **Swap rebinds both sides.** Two `expected<T&, E>` objects swap their pointers, not the values they point to. This is consistent with rebind semantics but will surprise users who think of references as aliases.

---

## Decision 3: Shallow Const

### What was done

`const expected<T&, E>` still returns a non-const `T&` from `operator*()`. The constness of the `expected` container does not propagate to the referent.

### Why

This matches `T* const` (const pointer to non-const T), `std::reference_wrapper`, and P2988 `optional<T&>`. A `const expected<T&, E>` is an expected whose *binding* cannot change, not an expected whose *referent* is immutable.

### What to discuss

- **`const_cast` concerns.** If someone passes a `const expected<T&, E>&` to a function, that function can modify the referent. This is correct behavior, but it may violate the expectations of API designers who use `const&` parameters to express "I won't modify your data."
- **`expected<const T&, E>` exists as the alternative.** Users who want deep const must spell it. This is well-established in C++ but not universally known.

---

## Decision 4: No `unexpected<G>` Construction or Assignment for `E&` Specializations

### What was done

For `expected<T, E&>`, `expected<T&, E&>`, and `expected<void, E&>`, constructing from `unexpected<G>` is `= delete`. So is assignment from `unexpected<G>`.

```cpp
int err = 42;
expected<int, int&> e(unexpect, err);       // OK: unexpect_t ctor takes lvalue
expected<int, int&> e2(unexpected(42));      // ERROR: deleted
e = unexpected(42);                          // ERROR: deleted
```

### Why

An `unexpected<G>` is a temporary that owns its `G`. Binding `E&` to the `G` inside it creates a dangling reference the moment the `unexpected` is destroyed (end of the full-expression). There is no safe way to support this.

### What to discuss

- **Is `unexpected<G&>` the answer?** If someone has `unexpected<int&>(ref)`, could that be used to construct `expected<T, int&>`? Currently this path doesn't exist. Should it?
- **Ergonomic cost.** The "obvious" way to create an error-state expected is `expected<T, E&>(unexpected(err))`. That doesn't work. Users must write `expected<T, E&>(unexpect, err)` instead. This will be a FAQ.
- **The `= delete("message")` diagnostics help but don't solve the discoverability problem.** A user gets `expected<T,E&>: no constructor from unexpected<G>; use (unexpect, lvalue_ref)` — but they have to trigger the error to see it. Can we do better in documentation?

---

## Decision 5: Dangling Prevention via `reference_constructs_from_temporary_v`

### What was done

A `detail::reference_constructs_from_temporary_v` concept (lines 88-100 of `expected.hpp`) guards every constructor where `T&` or `E&` could bind to a temporary. When the concept detects a dangling risk, a deleted overload with a diagnostic message catches the call.

### The subtlety

`reference_constructs_from_temporary_v<int&, int>` is **false** — a non-const lvalue reference simply cannot bind to a temporary, so the concept says "no, this doesn't construct from a temporary." The construction fails anyway via SFINAE ("no matching function"), but the deleted overload with its nice message doesn't fire.

The deleted overload with its diagnostic fires for cases like `const int&` binding to a prvalue `int`, where `reference_constructs_from_temporary_v` is **true**.

### What to discuss

- **Two failure modes, two diagnostics.** Binding `int&` to `42` gives "no matching function." Binding `const int&` to `42` gives the deleted message. Both are correct rejections, but the user experience differs. The negative tests handle this with regex alternation (`"binding a temporary|no matching function"`). Is this acceptable or should the overload set be restructured so the diagnostic is always the deleted message?
- **Compiler support.** `reference_constructs_from_temporary_v` is a C++23 feature. The implementation provides a fallback (line 88-100). Is the fallback correct for all edge cases? The trait relies on compiler built-ins (`__reference_constructs_from_temporary`) when available.

---

## Decision 6: `= delete("message")` as a Diagnostic Strategy

### What was done

Every deleted operation carries a C++26 `= delete("message")` string explaining **what** is wrong and **what to do instead**:

- `"expected<T&,E>: no default constructor; T& cannot be null"`
- `"expected<T,E&>: no constructor from unexpected<G>; use (unexpect, lvalue_ref)"`
- `"expected<void,E&>: no value_or for void specialization"`

### What to discuss

- **C++26 feature.** `= delete("message")` is not available in C++23 or earlier. The README claims C++17+ support. This feature silently degrades — compilers that don't support it treat it as plain `= delete` — but the claim of C++17+ compatibility deserves scrutiny against the actual minimum language version needed for the rest of the code (`requires` clauses, concepts, `constexpr` union, etc.).
- **Message quality.** Are the messages actionable? Do they guide the user to the correct alternative? Review each message for clarity and accuracy.
- **Is this the right mechanism?** An alternative is `static_assert(false, "message")` inside a constrained-away-but-still-instantiable template. That would work in C++23 but is arguably worse. The `= delete("message")` approach is cleaner and should be preferred if C++26 is truly the floor.

---

## Decision 7: `value_or` Deleted for `expected<void, E&>`

### What was done

`expected<void, E&>::value_or()` is `= delete("no value_or for void specialization")` rather than simply not being declared.

### What to discuss

- **Why not just omit it?** The primary `expected<void, E>` doesn't declare `value_or` at all (there's no value to return). The `void, E&` specialization explicitly deletes it. This inconsistency should be intentional — is it? Does the delete give a better error message than "no member named 'value_or'"?
- **Precedent.** Does `expected<void, E>` (the standard one) have `value_or`? If not, mimicking that by omission would be more consistent.

---

## Decision 8: Monadic Operations on Reference Specializations

### What was done

All four monadic operations (`and_then`, `or_else`, `transform`, `transform_error`) are provided for all six specializations, with four ref-qualified overloads each (`&`, `const&`, `&&`, `const&&`).

For reference specializations, the callable always receives `T&` (dereferenced pointer), regardless of the expected object's own value category. This means:

```cpp
expected<int&, int> e(x);
auto f = [](int& r) { return expected<int&, int>(r); };
std::move(e).and_then(f);  // f still gets int&, not int&&
```

### What to discuss

- **Is four ref-qualified overloads correct for reference types?** Since the stored value is a pointer, the expected object's value category doesn't affect how the referent is passed. All four overloads do the same thing for the value path. Should there be only one, or is the four-overload pattern maintained for API consistency?
- **Error forwarding for `E&` specializations.** When `and_then`'s callable is not invoked (error case), the error must be forwarded to the result. For `E&`, this always passes `E&` (dereferenced error pointer). The expected object's rvalue-ness doesn't move the error. Is this clearly documented?
- **Return type inference.** When `transform(f)` is called on `expected<T&, E>`, and `f` returns `U&`, does the result become `expected<U&, E>` or `expected<U, E>`? This depends on how `std::invoke_result_t` deduces the return type. Verify the tests cover this case.

---

## Decision 9: Test Architecture

### What exists

- 15 positive test files with 469 Catch2 `TEST_CASE` entries
- 54 negative compile tests (`_fail.cpp`) each with a `PASS_REGULAR_EXPRESSION` regex
- Separate constraint test files for primary and `T&` specializations
- Hardened precondition tests under `BEMAN_EXPECTED_HARDENED`

### Gaps to discuss

- **No constraint test files for `expected<T, E&>`, `expected<T&, E&>`, or `expected<void, E&>`.** The primary template has `expected_constraints.test.cpp` and `expected<T&, E>` has `expected_ref_constraints.test.cpp`. The other three reference specializations have no dedicated constraint test file. Their SFINAE behavior is untested under `static_assert(!is_constructible_v<...>)` patterns.
- **No monadic constraint tests for reference specializations.** `expected_monadic_constraints.test.cpp` covers only the primary and void specializations with move-only error types. The same constraints apply to reference specializations but are untested.
- **No triviality tests for reference specializations.** `expected_trivial.test.cpp` covers only primary and void. Reference specializations (especially `T&, E&` and `void, E&`, which are pointer-only) should be trivially copyable, movable, and destructible unconditionally. This is not verified.
- **Monadic tests are embedded in general test files** rather than having dedicated `_monadic.test.cpp` files for reference specializations. This makes it harder to verify completeness.

### What to decide

Is the test suite sufficient for standardization review? The positive coverage is good — every operation has basic tests. But the systematic constraint/SFINAE testing that exists for the primary template is absent for three of the four reference specializations. This gap should be closed before submitting to WG21.

---

## Decision 10: Single Header vs Multi-Header

### What exists

Everything is in `expected.hpp`. The `unexpected.hpp` and `bad_expected_access.hpp` are separate (matching the standard's `[expected.syn]` structure), but all six specializations live in one file.

### What to discuss

- **4400 lines in one file.** This is at the boundary of manageable. A reviewer can `grep` and navigate, but side-by-side comparison of specializations requires tooling.
- **The standard doesn't mandate file structure.** But for a reference implementation intended to demonstrate proposed wording, would splitting `expected_ref.hpp` (or similar) improve reviewability?
- **Compile times.** Every translation unit that includes `expected.hpp` parses all six specializations. For users who only need `expected<T, E>`, this is wasted work. The module build path (`expected.cppm`) mitigates this but is opt-in and not the default.

---

## How to Approach Your Review

When giving feedback, focus on the rationale behind these macro-level decisions rather than just line-by-line nitpicks. Consider the following when leaving comments:

- **If something feels off:** What alternative design would you prefer, and what trade-offs does it bring?
- **If you agree with a constraint:** Did we actually implement it faithfully, or are there hidden loopholes?
- **Ergonomics:** Will standard C++ developers be able to understand the error messages and API bounds?

Please don't review this code as if it were a typical pull request. Review it as proposed standard library wording rendered into C++. The core question is not just "does it compile and pass tests?" — it does. The question is: *"Should this be how `expected<T&, E>` works for every C++ programmer for the next 30 years?"* Your human perspective and architectural judgment are exactly what we need to answer that.

---

## References & Citations

- **P2988 (`std::optional<T&>`)**: [https://wg21.link/p2988](https://wg21.link/p2988) — The baseline proposal establishing rebind semantics and shallow const for reference wrappers.
- **P3168 (Give `std::optional` Range Support)**: [https://wg21.link/p3168](https://wg21.link/p3168) — Related context by JeanHeyd Meneide on the widespread failures of assign-through semantics in practice.
- **P2573 (`= delete("should have a reason");`)**: [https://wg21.link/p2573](https://wg21.link/p2573) — The C++26 feature enabling customized diagnostic messages on deleted functions.
- **P2255 (A type trait to detect reference binding to temporary)**: [https://wg21.link/p2255](https://wg21.link/p2255) — The C++23 feature (`reference_constructs_from_temporary_v`) used for dangling reference prevention.
