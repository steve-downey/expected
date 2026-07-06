# std::expected Parity

Before adding the reference specializations (`expected<T&, E>` etc., plan
steps 7–10), the behavioral test suite is run against **both**
`beman::expected` and `std::expected` to prove there are no behavioral
differences outside the reference extension.

## How it works

The portable *behavioral* test sources are parameterized over the
implementation under test via `tests/beman/expected/test_expected.hpp`, which
aliases the selected namespace as `test_ns`:

| Build macro                 | `test_ns`        | Header      |
|-----------------------------|------------------|-------------|
| *(none — default)*          | `beman::expected`| `<beman/expected/expected.hpp>` |
| `-DBEMAN_EXPECTED_TEST_STD` | `::std`          | `<expected>` (C++23) |

`tests/beman/expected/CMakeLists.txt` compiles the behavioral sources twice:

- `beman.expected.tests.expected` — the full beman suite (behavioral +
  beman-only tests).
- `beman.expected.tests.expected.std` — the behavioral subset only, against
  `std::expected`. Its ctest cases are prefixed `std.` and labelled `std`.
  Skipped on libc++ (see below) — it is not built at all there.

Behavioral sources (parameterized): `bad_expected_access.test.cpp`,
`unexpected.test.cpp`, `expected.test.cpp`, `expected_void.test.cpp`,
`expected_monadic.test.cpp`, `expected_void_monadic.test.cpp`.

Beman-only sources (not parameterized — encode behavior not guaranteed by the
standard): `expected_constraints.test.cpp`, `expected_monadic_constraints.test.cpp`
(SFINAE-friendliness), `expected_trivial.test.cpp` (triviality of SMFs is
implementation quality), `expected_hardened.test.cpp` (beman hardening),
`header_idempotence.test.cpp`, `todo.test.cpp`.

## Result

Running `make TOOLCHAIN=gcc-15 test` (g++ 15.2, libstdc++): **all tests pass**,
including the 215 behavioral cases against `std::expected`. Every constructor,
assignment, observer, monadic operation, equality operator, and `static_assert`
(including the strengthened `noexcept` specifications and every conformance-fix
constraint) holds identically for `std::expected`.

## Divergences found

1. **`bad_expected_access::what()` message text** — the only behavioral
   difference. `what()` returns an *implementation-defined* NTBS
   ([expected.bad.void]). beman returns `"bad expected access"`; libstdc++
   returns `"bad access to std::expected without expected value"`. The tests
   over-specified the exact text. Fixed: the parameterized builds assert only
   the portable guarantee (`what() != nullptr`); the exact-string check is now
   guarded `#ifndef BEMAN_EXPECTED_TEST_STD` and kept as a beman-specific check.

2. **Latent missing `<utility>` includes** (not a divergence, a test bug) —
   `expected_monadic.test.cpp` and `expected_void_monadic.test.cpp` used
   `std::move` / `std::as_const` while relying on beman's header to pull in
   `<utility>` transitively; `<expected>` does not. Fixed by adding the explicit
   include (also correct hygiene for the beman build).

## `.std` target is skipped on libc++

`tests/beman/expected/CMakeLists.txt` detects libc++ (`_LIBCPP_VERSION`, via
`check_cxx_symbol_exists`) — covering both an explicit `-stdlib=libc++` and
AppleClang's implicit default — and does not build
`beman.expected.tests.expected.std` at all in that case. This is a scope
decision, not a beman::expected defect: the `.std` target exists to catch
*beman* behavioral differences from the standard, not to chase the standard
library's own bugs, and libc++ has at least two independent bugs of its own
that surfaced running this exact suite against it:

1. **`std::unexpected<int> == std::unexpected<long>` — cross-specialization
   friend-access bug.** On some libc++ versions (observed: clang 19,
   appleclang c++26) this heterogeneous comparison fails to compile with
   `'__unex_' is a private member of 'std::unexpected<long>'`. (The
   `unexpected: equality different types` test in `unexpected.test.cpp` is
   also guarded `#ifndef BEMAN_EXPECTED_TEST_STD` independent of this
   skip, since beman's own `unexpected<E>` does not have this problem.)

2. **Catch2 decomposition × `std::expected`'s constrained heterogeneous
   `operator==` — self-referential constraint check.** On some libc++
   versions (observed: clang 21, clang 22, appleclang c++26) essentially any
   `CHECK`/`REQUIRE` that compares an `expected`/`unexpected` value can fail
   with `satisfaction of constraint '...' depends on itself`. Catch2's
   `CHECK(a == b)` first wraps `a` in an internal `Catch::ExprLhs` proxy, and
   `std::expected`'s generic constrained `operator==(expected, U)` is picked
   up via ADL with `U = ExprLhs<...>`; checking whether `*x == u` is valid
   then re-enters the same constrained templates and libc++ gives up. This
   is triggered pervasively enough across the parameterized suite
   (potentially dozens of sites across all six files) that per-call-site
   workarounds (the standard Catch2 fix is extra parens, `CHECK((a == b))`)
   weren't worth chasing given the target's purpose above.

`gcc`/libstdc++ and clang-with-libstdc++ configurations are unaffected by
either bug and continue to run the `.std` target normally.

## Not yet covered

- **`tl::expected`** — deferred. It is a pre-standard implementation (no
  `error_or`, different `bad_expected_access`, looser monadic constraints,
  `tl::unexpect` naming) so parity is partial; it is of interest because of
  existing use at Bloomberg. When added, wire a third selection
  (`-DBEMAN_EXPECTED_TEST_TL`) into `test_expected.hpp` and a matching CMake
  target, running only the subset tl can support.
- **Reference specializations** — the point of the whole exercise: differences
  that *do* involve reference `T`/`E` are expected once steps 7–10 land.
