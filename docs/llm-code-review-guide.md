# LLM Code Review Guide: `beman::expected`

**Target Audience:** High-context Large Language Models acting as rigorous C++ code reviewers.
**Scope:** The entire `include/beman/expected/` header set — one 4400-line header (`expected.hpp`) plus two small companions (`unexpected.hpp`, `bad_expected_access.hpp`).

## Mission

You are reviewing a proposed **C++29** reference implementation of `std::expected` that extends the C++26 standard with reference specializations. The implementation targets standardization via the Beman Project. Your job is not to praise working code — it is to find defects, inconsistencies, specification violations, and latent footguns. "Looks good" is not an acceptable conclusion unless you can demonstrate why every clause was checked.

---

## Specification Sources (Authoritative, In-Repo)

| Source | Location | Use |
|--------|----------|-----|
| C++26 standard wording | `docs/standard/[expected].html` | Normative text for primary and void specializations |
| Standard (org-mode) | `docs/standard/expected.org` | Same content, machine-parseable |
| Standard (plain text) | `docs/standard/expected.txt` | Same content, grep-friendly |
| Conformance audit | `docs/conformance-audit.md` | Every clause checked with PASS/EXT/FIXED status |
| P2988 (optional\<T&\>) | External: open-std.org/P2988 | Rebind semantics design source for reference specializations |
| beman/optional reference impl | `~/src/steve-downey/optional/main/` | Pattern source for T& storage and dangling prevention |

### What You Have No Normative Source For

**This is critical.** The reference specializations (`expected<T&, E>`, `expected<T, E&>`, `expected<T&, E&>`, `expected<void, E&>`) have **no published standard wording**. They are an extension proposed for C++29. The only design authority is:

1. Analogy to P2988's `optional<T&>` semantics (rebind, shallow const, dangling prevention)
2. The implementation's own `docs/plan/step7-*.md` through `step10-*.md` design docs
3. Consistency with the primary template's established patterns

This means: for the primary template and void specialization, you can check clause-by-clause against `[expected.object.*]` and `[expected.void.*]`. For reference specializations, you must instead check **internal consistency** and **design-principle adherence**. Don't fabricate standard references that don't exist.

---

## Review Protocol

### Phase 1: Structural Inventory

Before reading line-by-line, establish the shape:

1. **Count specializations.** There should be exactly 6: `<T,E>`, `<void,E>`, `<T&,E>`, `<T,E&>`, `<T&,E&>`, `<void,E&>`. Each should have complete API surface (constructors, assignment, observers, swap, equality, monadic ops).
2. **Identify the storage model** for each specialization. Primary uses union of T and E. Void uses union of E only. Reference specializations store pointers. Verify no specialization accidentally uses a union member for a reference type.
3. **Map the helper utilities.** `reinit_expected` (lines 65-84) handles destroy-and-reconstruct for value-type transitions. `reference_constructs_from_temporary_v` (lines 88-100) is the dangling-prevention concept. Verify these are used correctly and only where applicable.

### Phase 2: Clause-by-Clause for Primary and Void

For `expected<T, E>` and `expected<void, E>`, audit against the standard:

#### Constraints vs Mandates

The standard distinguishes:
- **Constraints** (`requires` clause on declaration): SFINAE-friendly, checked during overload resolution
- **Mandates** (`static_assert` inside body): hard error on instantiation, not SFINAE-friendly

**Check for these specific misclassifications:**
- Is any Mandate implemented as a `requires` clause? (This would silently hide the error instead of diagnosing it)
- Is any Constraint implemented as a `static_assert`? (This would cause hard errors when SFINAE should apply)
- The conformance audit at `docs/conformance-audit.md` claims all clauses are correct — verify independently by sampling 3-5 constructors against `[expected.object.cons]`

#### Explicit Conditions

Every converting constructor uses `explicit(bool-expr)`. The standard specifies exactly which `is_convertible_v` checks determine explicitness. Verify:
- The logical structure matches (conjunction of negated `is_convertible_v` checks)
- The value categories in the `is_convertible_v` arguments match what the standard says (`const G&` vs `G` vs `G&&`)

#### noexcept Specifications

The implementation adds conditional `noexcept` on some constructors where the standard is silent. `docs/conformance-audit.md` marks these as "EXT" (conforming extension). Verify:
- These are genuinely conforming (strengthening, not weakening)
- They don't accidentally constrain the overload set via SFINAE on `noexcept`

### Phase 3: Reference Specialization Consistency

Since there's no standard wording, check:

#### 1. API Surface Parity

Each reference specialization should offer the **same user-facing operations** as the primary, adapted for reference semantics. Missing operations are bugs unless explicitly justified. Check:

| Operation | `<T,E>` | `<T&,E>` | `<T,E&>` | `<T&,E&>` | `<void,E&>` |
|-----------|---------|-----------|-----------|------------|--------------|
| Default ctor | yes | **deleted** | yes | **deleted** | yes |
| Copy/move ctor | yes | yes | yes | yes | yes |
| Converting ctor | yes | yes (from U&) | yes | yes (from U&,G&) | yes |
| unexpected\<G\> ctor | yes | yes | from `<G&>` only | from `<G&>` only | from `<G&>` only |
| unexpect_t ctor | yes | yes | yes | yes | yes |
| in_place_t ctor | yes | **deleted** | yes | **deleted** | N/A (void) |
| Value assignment | yes | rebind | yes | yes | N/A |
| unexpected assignment | yes | yes | **deleted** | **deleted** | N/A |
| emplace | yes | rebind | yes | rebind | emplace() (void) |
| operator* | T& | T& | T& | T& | void |
| operator-> | T* | T* | T* | T* | N/A |
| value() | throws | throws | throws | throws | throws |
| value_or | yes | yes | yes | yes | **deleted** |
| error_or | yes | yes | yes | yes | yes |
| Monadic (4 ops) | yes | yes | yes | yes | yes |
| swap | yes | yes | yes | yes | yes |
| equality | yes | yes | yes | yes | yes |

Verify each cell. Pay special attention to the **deleted** entries — each should have a `= delete("message")` with a clear diagnostic and a corresponding negative compile test.

For the `from <G&> only` cells: construction from `unexpected<G>` is permitted for reference `E` **only when `G` is itself a reference** (`unexpected<E&>`, which holds a pointer to an external object). Construction from a value-typed `unexpected<G>` stays `= delete`d (it would dangle), and rebinding *assignment* from `unexpected<G>` is not offered for reference `E`. Verify: `is_constructible_v<expected<int, int&>, unexpected<int&>>` is true, `is_constructible_v<expected<int, int&>, unexpected<int>>` is false, and `unexpected<const int&>` → `int&` is rejected (const drop).

#### 2. Dangling Prevention

For every constructor or assignment that accepts a forwarding reference where the destination is `T&` or `E&`:
- Verify `!detail::reference_constructs_from_temporary_v<T&, U>` appears in the `requires` clause
- Verify a deleted overload exists for the case where temporaries would bind
- Verify the deleted overload's message is tested by a `_fail.cpp` negative test

**Known subtlety:** For `expected<int&, int>` constructing from `42`, the constraint rejects via "no matching function" (SFINAE), not via the deleted overload. The deleted overload fires only when `reference_constructs_from_temporary_v` is true (e.g., `const int&` from `int`). Both paths prevent the dangerous construction, but the diagnostic differs. This is correct behavior.

#### 3. Storage Layout

- `expected<T&, E>`: pointer `T*` plus union `{ E unex_; }`  plus `bool has_val_`
- `expected<T, E&>`: value `T` in union plus `E*` pointer plus `bool has_val_`
- `expected<T&, E&>`: two pointers `T*`, `E*` plus `bool has_val_`
- `expected<void, E&>`: pointer `E*` plus `bool has_val_`

Verify:
- No union contains a reference or pointer where the active member tracking could be wrong
- Assignment to reference specializations reassigns pointers (rebind), never destroys/reconstructs
- `reinit_expected` is NOT called for pointer-only transitions

#### 4. Monadic Value Categories

For each monadic operation across all specializations, verify:
- The callable receives the correct value category of the stored value
- For `T&` specializations: callable always receives `T&` (dereferenced pointer), regardless of the expected object's own value category
- For `E&` specializations: error forwarding passes `E&` (dereferenced pointer), never `E&&`
- Return type wrapping preserves the reference nature where appropriate

### Phase 4: Cross-Cutting Checks

#### constexpr Correctness

Every function in this implementation should be `constexpr`. Verify:
- Union member activation via placement-new or `std::construct_at` is constexpr-valid
- Pointer dereference in reference specializations is constexpr-valid
- No `reinterpret_cast` or `void*` arithmetic that would fail constant evaluation

#### Trivial Special Member Functions

The primary and void specializations must be trivially copyable/movable/destructible when T and E are. Reference specializations (pointer-based) should be trivially everything unconditionally. Verify:
- `= default` paths exist for trivial cases
- The conditional dispatch between trivial and non-trivial paths is correct
- Reference specializations don't accidentally have non-trivial destructors

#### Hardened Preconditions

Under `#if defined(BEMAN_EXPECTED_HARDENED)`:
- `operator*` and `operator->` trap when `!has_value()`
- `error()` traps when `has_value()`
- Verify these guards exist in ALL specializations, not just the primary

#### Value Category in Converting Operations (deref-then-move anti-pattern)

Every converting constructor/assignment from `expected<U, G>` or `unexpected<G>` must build the target value/error by **moving the wrapper, then accessing** — `*std::move(rhs)`, `std::move(rhs).error()`, `std::move(e).error()` — never by **accessing, then moving** — `std::move(*rhs)`, `std::move(rhs.error())`, `std::move(e.error())`.

The deref-then-move form is a defect for reference specializations: the accessor is shallow and returns a reference to an **external** object, and the `std::move` then steals from it — the `boost::optional<T&>` move-steal bug. Both forms compile and are **indistinguishable by eye**, so verify by behavior, not inspection:
- `std::string s="bar"; expected<std::string&,int> r{s}; expected<std::string,int> o{std::move(r)};` must leave `s == "bar"` (copied, not stolen). Same for the error axis (`expected<int,std::string&>` → `expected<int,std::string>`) and for `unexpected<E&>` sources, on both construction and assignment.
- A genuine value source (`expected<std::string,int>`/`unexpected<std::string>` rvalue) must **still move** (source left empty).

Mechanical audit: grep the header for `std::move(*` and `std::move(<ident>.value()/error())` — every hit is a candidate defect; the safe forms wrap the whole object (`*std::move(x)`, `std::move(x).accessor()`). This rests on the invariant that rvalue accessors are shallow for reference specializations and deep for value ones (Phase 2 accessor checks).

---

## Known Issues to Confirm or Refute

These are areas where the implementation may have latent bugs. Investigate each:

1. **`expected<bool, E>` value constructor ambiguity.** The implementation could not add a `= delete("message")` overload for the case where `expected<bool, E>` is constructed from another `expected` specialization (because the deleted overload conflicts with the converting constructor). The regex for `expected_bool_value_ctor_from_expected_fail` is still the generic "no matching function". Is this a real problem, or is the constraint sufficient?

2. **Move-only error types in reference specializations.** The monadic constraint tests (`expected_monadic_constraints.test.cpp`) only cover the primary and void specializations. For `expected<T&, E>` with a move-only `E`: are `and_then` and `transform` correctly constrained on their lvalue overloads (which need `is_constructible_v<E, E&>`)? This is untested.

3. **`expected<T&, E&>` equality operators.** When comparing `expected<T&, E&> == expected<U&, G&>`, does the comparison dereference both sides correctly? Is there a test for comparing two reference-expected objects that point to the same underlying object?

4. **`value_or` for reference specializations.** For `expected<T&, E>`, what does `value_or(default_ref)` return? A `T&`? A `T`? The return type semantics differ fundamentally from the primary template. Verify the return type is documented and tested.

5. **Swap for `expected<T&, E&>`.** Swapping two pointer-only expected objects should be trivial (swap pointers and bool). Verify no unnecessary destroy/reconstruct logic is invoked.

---

## Output Format

Structure your review as:

```
## [Specialization or Section Name]

### Finding N: [severity: defect|concern|nit|question]
**Location:** file:line
**Standard reference:** [clause] (or "no normative source — checking internal consistency")
**Issue:** [description]
**Evidence:** [code quote or reasoning]
**Suggested fix:** [if applicable]
```

Do not pad with praise. Every section must contain at least one finding or an explicit "verified correct, N clauses checked" with clause references.
