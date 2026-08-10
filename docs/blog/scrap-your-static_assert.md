The obvious way to test a compile-time fact is `static_assert`. It's right there, it needs no framework, and for a fact that has to hold it's the right tool. As a *test*, though, it has one bad property: a wrong answer is a translation failure. The build stops at the first one, you get a compiler diagnostic instead of a test result, and every other test in the file goes unrun. The xUnit report is empty. You learn that something is wrong, once, and nothing about the rest.

There's a second, smaller problem. Even when you write the check as a runtime `CHECK` so that it gets reported, a bare trait doesn't report anything you can use:

```C++
CHECK(std::is_same_v<decltype(*e), int&>);  // FAILED: CHECK( false )
```

The expansion is the word `false`. You already knew the two types differed; the framework won't tell you what either of them was.

Converting the `expected` tests off `static_assert` came down to two header-only components that fix these two problems. Neither is clever. (The title owes Lämmel and Peyton Jones; the debt stops at the title.)


# Type identity as a value

The fix for the second problem is to compare type *identities* that carry their spelling for diagnostics, instead of comparing a bool. See [`type\_name.hpp`](https://github.com/steve-downey/expected/blob/main/tests/beman/expected/testing/type_name.hpp). The comparison is still `std::is_same_v`, so the verdict is exact and a false pass isn't possible:

```cpp
template <class T, class U>
constexpr bool beman::expected::testing::operator==(type_name_t<T>, type_name_t<U>) {
    return std::is_same_v<T, U>;
}
```

The spelling is consulted only after a comparison has already failed and the framework needs to explain it. So a failing check explains itself:

```text
FAILED: CHECK( type_name<decltype(*e)>() == type_name<int&>() )
with expansion: const int& == int&
```

And the tests read like the trait they replaced:

```cpp
TEST_CASE("expected: operator* ref-qualification return types", "[ExpectedTest]") {
    using expected_t = expt::expected<int, int>;
    CHECK(type_name<decltype(*std::declval<expected_t&>())>() == type_name<int&>());
    CHECK(type_name<decltype(*std::declval<const expected_t&>())>() == type_name<const int&>());
    CHECK(type_name<decltype(*std::declval<expected_t&&>())>() == type_name<int&&>());
    CHECK(type_name<decltype(*std::declval<const expected_t&&>())>() == type_name<const int&&>());
}
```


# Reporting a compile-time value at runtime

The fix for the first problem is to split the two questions a constexpr test actually asks. "Can this be constant-evaluated at all?" is a property of the code; it stays a hard translation failure, which is correct, because that's a fact that has to hold. "Does it produce the right answer?" is a property of a value, and there's no reason a wrong value should stop the build.

[`constant\_eval.hpp`](https://github.com/steve-downey/expected/blob/main/tests/beman/expected/testing/constant_eval.hpp) is `consteval`, so a call to it is evaluated during translation. If the probe body isn't usable in a constant expression the program is ill-formed, and the first question is answered by the call itself, with no `static_assert` needed. The result then behaves as an ordinary prvalue, free to be handed to `CHECK`. The whole thing is a one-line wrapper:

```cpp
template <class Probe>
consteval auto beman::expected::testing::constant_eval(Probe probe) {
    return probe();
}
```

A probe is a plain lambda that reduces what it observes to a literal aggregate:

```cpp
TEST_CASE("expected: constexpr default construction", "[ExpectedTest]") {
    constexpr auto probe = [] {
        constexpr expt::expected<int, int> e;
        return int_state{e.has_value(), *e};
    };
    CHECK(constant_eval(probe) == int_state{true, 0});
    CHECK(probe() == int_state{true, 0});
}
```

Because the probe is a plain lambda and not a `consteval` one, the same body runs in both evaluation modes. Constant evaluation and ordinary evaluation can take different paths through a union-based type like `expected`, so running both earns its second line:

```C++
CHECK(constant_eval(probe) == expect);  // constant evaluation
CHECK(probe() == expect);               // ordinary evaluation
```

Give the returned aggregate an `operator<<`. Without one, Catch2 prints `{?} == {?}` and you're back where `static_assert` left you.


# What it buys

Two things. The reporting is better: a mismatch names both types, or prints both states, instead of expanding to `false` or stopping at a diagnostic before it can say anything. And a wrong answer is no longer a compile failure that blocks everything behind it. The suite builds, runs, and reports every case; a broken trait shows up as one red line among the green, with the rest of the run intact.

None of this abolishes `static_assert`. The genuinely ill-formed cases stay ill-formed, checked in their own negative-compilation files. What moved to runtime is only the part that was a test wearing an assertion's clothes.
