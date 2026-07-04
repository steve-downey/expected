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

## Decision 4: `unexpected<G>` Construction for `E&` Specializations — Allowed Only When `G` Is a Reference

### What was done

For `expected<T, E&>`, `expected<T&, E&>`, and `expected<void, E&>`, construction from `unexpected<G>` is allowed **only when `G` is itself a reference** (i.e. from `unexpected<E&>`), and `= delete`d when `G` is a value type. Assignment from `unexpected<G>` is still not offered for reference `E` (construction-only, for now).

```cpp
int err = 42;
expected<int, int&> a(unexpect, err);           // OK: unexpect_t ctor takes an lvalue
expected<int, int&> b(unexpected<int&>(err));    // OK: source holds a reference to external err
expected<int, int&> c(unexpected(42));           // ERROR: deleted — value G would dangle
```

### Why

`unexpected<E&>` stores a *pointer* to an external object, so binding `E&` to its `error()` cannot dangle regardless of the source's value category (even a temporary `unexpected<int&>` refers to something external). `unexpected<G>` for a *value* `G` owns its `G`, so binding `E&` to it dangles the moment the (typically temporary) `unexpected` is destroyed — that overload stays deleted.

This supersedes the original blanket deletion ("Option A"): the earlier design deleted *all* `unexpected<G>` construction for reference `E`, which also rejected the safe `unexpected<E&>` case. The current rule ("Option B") accommodates that safe case, consistent with the WG21 view that reasonably-safe uses should work. The dangling guard is `reference_constructs_from_temporary_v` (Decision 5), reliable now that GCC 13 — which provides the builtin — is the baseline.

### What to discuss

- **Assignment symmetry.** Construction from `unexpected<E&>` works, but rebinding *assignment* (`e = unexpected<int&>(g)`) is still absent. Adding it is a clean follow-up but was deferred deliberately: any new synthesis path must be checked against the move-steal hazard in Decision 11.
- **The value-`G` cliff.** `expected<T,E&>(unexpected<int&>(g))` works; `expected<T,E&>(unexpected(42))` does not. The distinction (reference vs. value `G`) is principled but still a likely FAQ; the `= delete` diagnostic should name it.

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

## Decision 11: Shallow Conversions Must Not Steal — the Move-Then-Deref Idiom

### What was done

Converting from a reference-holding `expected` (or `unexpected`) to a value-holding one **copies** the referent; it never moves out of it, even from an rvalue source. Given `std::string s = "bar"; expected<std::string&, int> r{s};`, both `expected<std::string, int>{std::move(r)}` and `o = std::move(r)` leave `s == "bar"`. The internal idiom is **move the wrapper, then access** — `*std::move(rhs)`, `std::move(rhs).error()`, `std::move(e).error()` — never **access, then move** — `std::move(*rhs)`, `std::move(rhs.error())`, `std::move(e.error())`.

### Why this matters

`std::move(*rhs)` (deref-then-move) forces an rvalue onto whatever the accessor returns. For a reference specialization the accessor is *shallow*: it yields a reference to an **external** object the wrapper does not own, so the `std::move` steals from a caller's object that was only lent by reference. This is the exact `boost::optional<T&>` pitfall (`optional<string> o; optional<string&> r{s}; o = std::move(r);` moved `s` out from under the caller).

`*std::move(rhs)` (move-then-deref) delegates the value-category decision to the ref-qualified accessor, which is the one place that knows ownership: deep (`T&&`) for owned values, shallow (`T&`) for references. So genuine value moves still move; reference conversions copy. This is the same idiom `optional<T&>` uses (`construct(*std::move(rhs))`).

### What to discuss / watch in review

- **`std::move(*x)` and `std::move(x.value()/error())` are the anti-pattern**, and they are *not* locally distinguishable by eye from the safe form — both compile, and the difference surfaces only as a moved-from referent at runtime. Treat every `std::move(<deref-or-accessor>)` as suspect; the safe forms wrap the whole object: `*std::move(x)`, `std::move(x).accessor()`.
- **The invariant it rests on:** rvalue accessors must stay shallow for reference specializations and deep for value ones. If someone makes `operator*() &&` / `error() &&` deep on a reference spec, the idiom silently breaks. Behavioral regression tests in `expected_review_corrections.test.cpp` cover both directions (referent survives; owned value still moves).

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
