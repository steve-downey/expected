// beman/expected/expected_coverage.test.cpp                        -*-C++-*-
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
// Tests targeting lines uncovered by gcov: rvalue/const-rvalue monadic
// overloads, value()/error() throw paths, rvalue value_or/error_or,
// constructor/assignment error-path branches, and cross-type equality.

#include <beman/expected/expected.hpp>
#include <beman/expected/expected.hpp>

#include <catch2/catch_test_macros.hpp>

#include <string>
#include <type_traits>
#include <utility>
#include <vector>

namespace expt = beman::expected;
using expt::expected;
using expt::unexpect;
using expt::unexpected;

// =============================================================================
// expected<T, E> — primary template coverage gaps
// =============================================================================

// --- Monadic: and_then rvalue/const-rvalue on ERROR state (short-circuit) ---
TEST_CASE("coverage<T,E>: and_then rvalue on error short-circuits", "[coverage]") {
    expected<int, std::string> e(unexpect, "err");
    bool                       called = false;
    auto r = std::move(e).and_then([&](int) -> expected<int, std::string> {
        called = true;
        return 0;
    });
    CHECK(!called);
    REQUIRE(!r.has_value());
    CHECK(r.error() == "err");
}

TEST_CASE("coverage<T,E>: and_then const rvalue on error short-circuits", "[coverage]") {
    const expected<int, std::string> e(unexpect, "err");
    bool                             called = false;
    auto r = std::move(e).and_then([&](int) -> expected<int, std::string> {
        called = true;
        return 0;
    });
    CHECK(!called);
    REQUIRE(!r.has_value());
    CHECK(r.error() == "err");
}

// --- Monadic: or_else rvalue/const-rvalue on VALUE state (short-circuit) ---
TEST_CASE("coverage<T,E>: or_else rvalue on value short-circuits", "[coverage]") {
    expected<std::string, int> e("val");
    bool                       called = false;
    auto r = std::move(e).or_else([&](int) -> expected<std::string, int> {
        called = true;
        return "x";
    });
    CHECK(!called);
    REQUIRE(r.has_value());
}

TEST_CASE("coverage<T,E>: or_else const rvalue on value short-circuits", "[coverage]") {
    const expected<int, int> e(42);
    bool                     called = false;
    auto r = std::move(e).or_else([&](int) -> expected<int, int> {
        called = true;
        return 0;
    });
    CHECK(!called);
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

// --- Monadic: transform rvalue/const-rvalue on ERROR state (short-circuit) ---
TEST_CASE("coverage<T,E>: transform rvalue on error short-circuits", "[coverage]") {
    expected<int, std::string> e(unexpect, "err");
    auto                       r = std::move(e).transform([](int v) { return v * 2; });
    REQUIRE(!r.has_value());
    CHECK(r.error() == "err");
}

TEST_CASE("coverage<T,E>: transform const rvalue on error short-circuits", "[coverage]") {
    const expected<int, std::string> e(unexpect, "err");
    auto                             r = std::move(e).transform([](int v) { return v * 2; });
    REQUIRE(!r.has_value());
    CHECK(r.error() == "err");
}

// --- Monadic: transform_error rvalue/const-rvalue on VALUE state (short-circuit) ---
TEST_CASE("coverage<T,E>: transform_error rvalue on value short-circuits", "[coverage]") {
    expected<std::string, int> e("val");
    auto                       r = std::move(e).transform_error([](int v) { return v * 2; });
    REQUIRE(r.has_value());
}

TEST_CASE("coverage<T,E>: transform_error const rvalue on value short-circuits", "[coverage]") {
    const expected<int, int> e(42);
    auto                     r = std::move(e).transform_error([](int v) { return v * 2; });
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

// --- Monadic: transform const-rvalue on VALUE state (the actual call path) ---
TEST_CASE("coverage<T,E>: transform const rvalue on value calls F", "[coverage]") {
    const expected<int, int> e(5);
    auto                     r = std::move(e).transform([](int v) { return v * 3; });
    REQUIRE(r.has_value());
    CHECK(*r == 15);
}

// --- Monadic: transform_error const-rvalue on ERROR state (the actual call path) ---
TEST_CASE("coverage<T,E>: transform_error const rvalue on error calls F", "[coverage]") {
    const expected<int, int> e(unexpect, 7);
    auto                     r = std::move(e).transform_error([](int v) { return v + 1; });
    REQUIRE(!r.has_value());
    CHECK(r.error() == 8);
}

// --- value() throw from rvalue and const rvalue ---
TEST_CASE("coverage<T,E>: value() rvalue throws with moved error", "[coverage]") {
    expected<int, std::string> e(unexpect, "rval-err");
    CHECK_THROWS_AS(std::move(e).value(), expt::bad_expected_access<std::string>);
}

TEST_CASE("coverage<T,E>: value() const rvalue throws", "[coverage]") {
    const expected<int, std::string> e(unexpect, "crval-err");
    CHECK_THROWS_AS(std::move(e).value(), expt::bad_expected_access<std::string>);
}

// --- error_or rvalue overloads ---
TEST_CASE("coverage<T,E>: error_or rvalue uses default when has value", "[coverage]") {
    expected<int, std::string> e(42);
    std::string                s = std::move(e).error_or("fallback");
    CHECK(s == "fallback");
}

// --- unexpect_t constructor with initializer_list ---
TEST_CASE("coverage<T,E>: unexpect_t constructor with initializer_list", "[coverage]") {
    expected<int, std::vector<int>> e(unexpect, {1, 2, 3});
    REQUIRE(!e.has_value());
    CHECK(e.error() == std::vector{1, 2, 3});
}

// --- in_place_t constructor with initializer_list ---
TEST_CASE("coverage<T,E>: in_place_t constructor with initializer_list", "[coverage]") {
    expected<std::vector<int>, int> e(std::in_place, {4, 5, 6});
    REQUIRE(e.has_value());
    CHECK(*e == std::vector{4, 5, 6});
}

// --- emplace on error-state (destroy error, construct value) ---
TEST_CASE("coverage<T,E>: emplace on error state transitions to value", "[coverage]") {
    expected<int, std::string> e(unexpect, "err");
    e.emplace(42);
    REQUIRE(e.has_value());
    CHECK(*e == 42);
}

// --- Cross-type equality (expected<T,E> vs expected<T2,E2>) ---
TEST_CASE("coverage<T,E>: cross-type equality different error types", "[coverage]") {
    expected<int, int>  a(unexpect, 1);
    expected<int, long> b(unexpect, 1L);
    CHECK(a == b);
}

TEST_CASE("coverage<T,E>: cross-type equality error vs value", "[coverage]") {
    expected<int, int>  a(42);
    expected<int, long> b(unexpect, 0L);
    CHECK_FALSE(a == b);
}

// =============================================================================
// expected<void, E> — void specialization coverage gaps
// =============================================================================

// --- Monadic: and_then rvalue/const-rvalue on ERROR state ---
TEST_CASE("coverage<void,E>: and_then rvalue on error short-circuits", "[coverage]") {
    expected<void, std::string> e(unexpect, "err");
    bool                        called = false;
    auto r = std::move(e).and_then([&]() -> expected<void, std::string> {
        called = true;
        return {};
    });
    CHECK(!called);
    REQUIRE(!r.has_value());
}

TEST_CASE("coverage<void,E>: and_then const rvalue on error short-circuits", "[coverage]") {
    const expected<void, std::string> e(unexpect, "err");
    bool                              called = false;
    auto r = std::move(e).and_then([&]() -> expected<void, std::string> {
        called = true;
        return {};
    });
    CHECK(!called);
    REQUIRE(!r.has_value());
}

// --- Monadic: and_then rvalue/const-rvalue on VALUE state (actual call) ---
TEST_CASE("coverage<void,E>: and_then rvalue on value calls F", "[coverage]") {
    expected<void, int> e;
    bool                called = false;
    auto r = std::move(e).and_then([&]() -> expected<int, int> {
        called = true;
        return 42;
    });
    CHECK(called);
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

TEST_CASE("coverage<void,E>: and_then const rvalue on value calls F", "[coverage]") {
    const expected<void, int> e;
    auto r = std::move(e).and_then([]() -> expected<int, int> { return 99; });
    REQUIRE(r.has_value());
    CHECK(*r == 99);
}

// --- Monadic: or_else rvalue/const-rvalue on VALUE state ---
TEST_CASE("coverage<void,E>: or_else rvalue on value short-circuits", "[coverage]") {
    expected<void, int> e;
    bool                called = false;
    auto r = std::move(e).or_else([&](int) -> expected<void, int> {
        called = true;
        return {};
    });
    CHECK(!called);
    REQUIRE(r.has_value());
}

TEST_CASE("coverage<void,E>: or_else const rvalue on value short-circuits", "[coverage]") {
    const expected<void, int> e;
    auto r = std::move(e).or_else([](int) -> expected<void, int> { return {}; });
    REQUIRE(r.has_value());
}

// --- Monadic: transform rvalue/const-rvalue on ERROR state ---
TEST_CASE("coverage<void,E>: transform rvalue on error short-circuits", "[coverage]") {
    expected<void, std::string> e(unexpect, "err");
    auto                        r = std::move(e).transform([]() { return 1; });
    REQUIRE(!r.has_value());
    CHECK(r.error() == "err");
}

TEST_CASE("coverage<void,E>: transform const rvalue on error short-circuits", "[coverage]") {
    const expected<void, std::string> e(unexpect, "err");
    auto                              r = std::move(e).transform([]() { return 1; });
    REQUIRE(!r.has_value());
}

// --- Monadic: transform rvalue/const-rvalue on VALUE state ---
TEST_CASE("coverage<void,E>: transform rvalue on value calls F", "[coverage]") {
    expected<void, int> e;
    auto                r = std::move(e).transform([]() { return 42; });
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

TEST_CASE("coverage<void,E>: transform const rvalue on value calls F", "[coverage]") {
    const expected<void, int> e;
    auto                      r = std::move(e).transform([]() { return 7; });
    REQUIRE(r.has_value());
    CHECK(*r == 7);
}

// --- Monadic: transform_error rvalue/const-rvalue ---
TEST_CASE("coverage<void,E>: transform_error rvalue on value short-circuits", "[coverage]") {
    expected<void, int> e;
    auto                r = std::move(e).transform_error([](int v) { return v * 2; });
    REQUIRE(r.has_value());
}

TEST_CASE("coverage<void,E>: transform_error rvalue on error calls F", "[coverage]") {
    expected<void, int> e(unexpect, 5);
    auto                r = std::move(e).transform_error([](int v) { return v * 2; });
    REQUIRE(!r.has_value());
    CHECK(r.error() == 10);
}

TEST_CASE("coverage<void,E>: transform_error const rvalue on error calls F", "[coverage]") {
    const expected<void, int> e(unexpect, 3);
    auto                      r = std::move(e).transform_error([](int v) { return v + 1; });
    REQUIRE(!r.has_value());
    CHECK(r.error() == 4);
}

// --- value() throw paths for void ---
TEST_CASE("coverage<void,E>: value() rvalue throws", "[coverage]") {
    expected<void, int> e(unexpect, 42);
    CHECK_THROWS_AS(std::move(e).value(), expt::bad_expected_access<int>);
}

TEST_CASE("coverage<void,E>: value() const rvalue throws", "[coverage]") {
    const expected<void, int> e(unexpect, 42);
    CHECK_THROWS_AS(std::move(e).value(), expt::bad_expected_access<int>);
}

// --- void unexpect_t with init-list ---
TEST_CASE("coverage<void,E>: unexpect_t constructor with initializer_list", "[coverage]") {
    expected<void, std::vector<int>> e(unexpect, {1, 2, 3});
    REQUIRE(!e.has_value());
    CHECK(e.error() == std::vector{1, 2, 3});
}

// --- void move-assignment error-to-value and value-to-error ---
TEST_CASE("coverage<void,E>: move-assign error to value state", "[coverage]") {
    expected<void, std::string> a;
    expected<void, std::string> b(unexpect, "e");
    a = std::move(b);
    REQUIRE(!a.has_value());
    CHECK(a.error() == "e");
}

TEST_CASE("coverage<void,E>: move-assign value to error state", "[coverage]") {
    expected<void, std::string> a(unexpect, "e");
    expected<void, std::string> b;
    a = std::move(b);
    REQUIRE(a.has_value());
}

// --- void cross-type equality ---
TEST_CASE("coverage<void,E>: cross-type equality with expected<void,E2>", "[coverage]") {
    expected<void, int>  a(unexpect, 1);
    expected<void, long> b(unexpect, 1L);
    CHECK(a == b);
    expected<void, int> c;
    CHECK_FALSE(a == c);
}

// =============================================================================
// expected<T&, E> — reference specialization coverage gaps
// =============================================================================

// --- Monadic: and_then rvalue/const-rvalue on ERROR state ---
TEST_CASE("coverage<T&,E>: and_then rvalue on error short-circuits", "[coverage]") {
    expected<int&, std::string> e(unexpect, "err");
    auto r = std::move(e).and_then([](int& v) -> expected<int, std::string> { return v; });
    REQUIRE(!r.has_value());
    CHECK(r.error() == "err");
}

TEST_CASE("coverage<T&,E>: and_then const rvalue on error short-circuits", "[coverage]") {
    const expected<int&, std::string> e(unexpect, "err");
    auto r = std::move(e).and_then([](int& v) -> expected<int, std::string> { return v; });
    REQUIRE(!r.has_value());
}

// --- Monadic: and_then const-rvalue on VALUE state ---
TEST_CASE("coverage<T&,E>: and_then const rvalue on value calls F", "[coverage]") {
    int                             x = 5;
    const expected<int&, int> e(x);
    auto r = std::move(e).and_then([](int& v) -> expected<int, int> { return v * 2; });
    REQUIRE(r.has_value());
    CHECK(*r == 10);
}

// --- Monadic: or_else rvalue/const-rvalue on VALUE state ---
TEST_CASE("coverage<T&,E>: or_else rvalue on value short-circuits", "[coverage]") {
    int                       x = 42;
    expected<int&, int> e(x);
    auto r = std::move(e).or_else([](int) -> expected<int&, int> {
        static int dummy = 0;
        return expected<int&, int>(dummy);
    });
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

TEST_CASE("coverage<T&,E>: or_else const rvalue on value short-circuits", "[coverage]") {
    int                             x = 42;
    const expected<int&, int> e(x);
    auto r = std::move(e).or_else([](int) -> expected<int&, int> {
        static int dummy = 0;
        return expected<int&, int>(dummy);
    });
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

// --- Monadic: or_else rvalue/const-rvalue on ERROR state ---
TEST_CASE("coverage<T&,E>: or_else rvalue on error calls F", "[coverage]") {
    expected<int&, int> e(unexpect, 3);
    auto r = std::move(e).or_else([](int v) -> expected<int&, int> {
        static int result = 0;
        result            = v * 10;
        return expected<int&, int>(result);
    });
    REQUIRE(r.has_value());
    CHECK(*r == 30);
}

// --- Monadic: transform rvalue/const-rvalue on ERROR state ---
TEST_CASE("coverage<T&,E>: transform rvalue on error short-circuits", "[coverage]") {
    expected<int&, std::string> e(unexpect, "err");
    auto                        r = std::move(e).transform([](int& v) { return v * 2; });
    REQUIRE(!r.has_value());
    CHECK(r.error() == "err");
}

TEST_CASE("coverage<T&,E>: transform const rvalue on error short-circuits", "[coverage]") {
    const expected<int&, std::string> e(unexpect, "err");
    auto                              r = std::move(e).transform([](int& v) { return v * 2; });
    REQUIRE(!r.has_value());
}

// --- Monadic: transform const-rvalue on VALUE state ---
TEST_CASE("coverage<T&,E>: transform const rvalue on value calls F", "[coverage]") {
    int                             x = 4;
    const expected<int&, int> e(x);
    auto r = std::move(e).transform([](int& v) { return v + 1; });
    REQUIRE(r.has_value());
    CHECK(*r == 5);
}

// --- Monadic: transform_error rvalue/const-rvalue ---
TEST_CASE("coverage<T&,E>: transform_error rvalue on value short-circuits", "[coverage]") {
    int                       x = 42;
    expected<int&, int> e(x);
    auto r = std::move(e).transform_error([](int v) { return v * 2; });
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

TEST_CASE("coverage<T&,E>: transform_error const rvalue on value short-circuits", "[coverage]") {
    int                             x = 42;
    const expected<int&, int> e(x);
    auto r = std::move(e).transform_error([](int v) { return v * 2; });
    REQUIRE(r.has_value());
}

TEST_CASE("coverage<T&,E>: transform_error const rvalue on error calls F", "[coverage]") {
    const expected<int&, int> e(unexpect, 7);
    auto r = std::move(e).transform_error([](int v) { return v + 1; });
    REQUIRE(!r.has_value());
    CHECK(r.error() == 8);
}

// --- value() throw paths ---
TEST_CASE("coverage<T&,E>: value() throws on error state", "[coverage]") {
    expected<int&, int> e(unexpect, 42);
    CHECK_THROWS_AS(e.value(), expt::bad_expected_access<int>);
}

// --- Cross-type equality ---
TEST_CASE("coverage<T&,E>: equality error vs value", "[coverage]") {
    int                       x = 1;
    expected<int&, int> a(x);
    expected<int&, int> b(unexpect, 0);
    CHECK_FALSE(a == b);
}

// =============================================================================
// expected<T, E&> — error-reference specialization coverage gaps
// =============================================================================

// --- Monadic: and_then rvalue/const-rvalue on ERROR state ---
TEST_CASE("coverage<T,E&>: and_then rvalue on error short-circuits", "[coverage]") {
    int                       err = 5;
    expected<int, int&> e(unexpect, err);
    auto r = std::move(e).and_then([](int) -> expected<int, int&> {
        static int dummy = 0;
        return expected<int, int&>(unexpect, dummy);
    });
    REQUIRE(!r.has_value());
    CHECK(r.error() == 5);
}

TEST_CASE("coverage<T,E&>: and_then const rvalue on error short-circuits", "[coverage]") {
    int                             err = 5;
    const expected<int, int&> e(unexpect, err);
    auto r = std::move(e).and_then([](int) -> expected<int, int&> {
        static int dummy = 0;
        return expected<int, int&>(unexpect, dummy);
    });
    REQUIRE(!r.has_value());
}

// --- Monadic: or_else rvalue/const-rvalue on VALUE state ---
TEST_CASE("coverage<T,E&>: or_else rvalue on value short-circuits", "[coverage]") {
    expected<int, int&> e(42);
    auto r = std::move(e).or_else([](int&) -> expected<int, int&> {
        static int dummy = 0;
        return expected<int, int&>(unexpect, dummy);
    });
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

TEST_CASE("coverage<T,E&>: or_else const rvalue on value short-circuits", "[coverage]") {
    const expected<int, int&> e(42);
    auto r = std::move(e).or_else([](int&) -> expected<int, int&> {
        static int dummy = 0;
        return expected<int, int&>(unexpect, dummy);
    });
    REQUIRE(r.has_value());
}

// --- Monadic: transform rvalue/const-rvalue on ERROR state ---
TEST_CASE("coverage<T,E&>: transform rvalue on error short-circuits", "[coverage]") {
    int                       err = 3;
    expected<int, int&> e(unexpect, err);
    auto r = std::move(e).transform([](int v) { return v * 2; });
    REQUIRE(!r.has_value());
}

TEST_CASE("coverage<T,E&>: transform const rvalue on error short-circuits", "[coverage]") {
    int                             err = 3;
    const expected<int, int&> e(unexpect, err);
    auto r = std::move(e).transform([](int v) { return v * 2; });
    REQUIRE(!r.has_value());
}

// --- Monadic: transform_error rvalue/const-rvalue ---
TEST_CASE("coverage<T,E&>: transform_error rvalue on value short-circuits", "[coverage]") {
    expected<int, int&> e(42);
    auto r = std::move(e).transform_error([](int& v) { return v * 2; });
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

TEST_CASE("coverage<T,E&>: transform_error const rvalue on value short-circuits", "[coverage]") {
    const expected<int, int&> e(42);
    auto r = std::move(e).transform_error([](int& v) { return v * 2; });
    REQUIRE(r.has_value());
}

TEST_CASE("coverage<T,E&>: transform_error rvalue on error calls F", "[coverage]") {
    int                       err = 5;
    expected<int, int&> e(unexpect, err);
    auto r = std::move(e).transform_error([](int& v) { return v + 1; });
    REQUIRE(!r.has_value());
    CHECK(r.error() == 6);
}

TEST_CASE("coverage<T,E&>: transform_error const rvalue on error calls F", "[coverage]") {
    int                             err = 5;
    const expected<int, int&> e(unexpect, err);
    auto r = std::move(e).transform_error([](int& v) { return v + 1; });
    REQUIRE(!r.has_value());
    CHECK(r.error() == 6);
}

// --- value assignment on value-state ---
TEST_CASE("coverage<T,E&>: value assignment on value state", "[coverage]") {
    expected<int, int&> e(10);
    e = 20;
    REQUIRE(e.has_value());
    CHECK(*e == 20);
}

// --- Cross-type equality ---
TEST_CASE("coverage<T,E&>: equality error vs value", "[coverage]") {
    int                       err = 0;
    expected<int, int&> a(1);
    expected<int, int&> b(unexpect, err);
    CHECK_FALSE(a == b);
}

// =============================================================================
// expected<T&, E&> — both-reference specialization coverage gaps
// =============================================================================

// --- Monadic: and_then rvalue/const-rvalue on ERROR state ---
TEST_CASE("coverage<T&,E&>: and_then rvalue on error short-circuits", "[coverage]") {
    int                         err = 5;
    expected<int&, int&> e(unexpect, err);
    auto r = std::move(e).and_then([](int&) -> expected<int, int&> {
        static int dummy = 0;
        return expected<int, int&>(unexpect, dummy);
    });
    REQUIRE(!r.has_value());
}

TEST_CASE("coverage<T&,E&>: and_then const rvalue on error short-circuits", "[coverage]") {
    int                               err = 5;
    const expected<int&, int&> e(unexpect, err);
    auto r = std::move(e).and_then([](int&) -> expected<int, int&> {
        static int dummy = 0;
        return expected<int, int&>(unexpect, dummy);
    });
    REQUIRE(!r.has_value());
}

// --- Monadic: or_else rvalue/const-rvalue on VALUE state ---
TEST_CASE("coverage<T&,E&>: or_else rvalue on value short-circuits", "[coverage]") {
    int                         x = 42;
    expected<int&, int&> e(x);
    auto r = std::move(e).or_else([](int&) -> expected<int&, int&> {
        static int dummy = 0;
        return expected<int&, int&>(dummy);
    });
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

TEST_CASE("coverage<T&,E&>: or_else const rvalue on value short-circuits", "[coverage]") {
    int                               x = 42;
    const expected<int&, int&> e(x);
    auto r = std::move(e).or_else([](int&) -> expected<int&, int&> {
        static int dummy = 0;
        return expected<int&, int&>(dummy);
    });
    REQUIRE(r.has_value());
}

// --- Monadic: transform rvalue/const-rvalue on ERROR state ---
TEST_CASE("coverage<T&,E&>: transform rvalue on error short-circuits", "[coverage]") {
    int                         err = 3;
    expected<int&, int&> e(unexpect, err);
    auto r = std::move(e).transform([](int& v) { return v * 2; });
    REQUIRE(!r.has_value());
}

TEST_CASE("coverage<T&,E&>: transform const rvalue on error short-circuits", "[coverage]") {
    int                               err = 3;
    const expected<int&, int&> e(unexpect, err);
    auto r = std::move(e).transform([](int& v) { return v * 2; });
    REQUIRE(!r.has_value());
}

// --- Monadic: transform_error rvalue/const-rvalue ---
TEST_CASE("coverage<T&,E&>: transform_error rvalue on value short-circuits", "[coverage]") {
    int                         x = 42;
    expected<int&, int&> e(x);
    auto r = std::move(e).transform_error([](int& v) { return v * 2; });
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

TEST_CASE("coverage<T&,E&>: transform_error const rvalue on value short-circuits", "[coverage]") {
    int                               x = 42;
    const expected<int&, int&> e(x);
    auto r = std::move(e).transform_error([](int& v) { return v * 2; });
    REQUIRE(r.has_value());
}

TEST_CASE("coverage<T&,E&>: transform_error rvalue on error calls F", "[coverage]") {
    int                         err = 5;
    expected<int&, int&> e(unexpect, err);
    auto r = std::move(e).transform_error([](int& v) { return v + 1; });
    REQUIRE(!r.has_value());
    CHECK(r.error() == 6);
}

TEST_CASE("coverage<T&,E&>: transform_error const rvalue on error calls F", "[coverage]") {
    int                               err = 5;
    const expected<int&, int&> e(unexpect, err);
    auto r = std::move(e).transform_error([](int& v) { return v + 1; });
    REQUIRE(!r.has_value());
    CHECK(r.error() == 6);
}

// --- Cross-type equality ---
TEST_CASE("coverage<T&,E&>: equality error vs value", "[coverage]") {
    int                         x = 1, err = 0;
    expected<int&, int&> a(x);
    expected<int&, int&> b(unexpect, err);
    CHECK_FALSE(a == b);
}

// =============================================================================
// expected<void, E&> — void+error-reference specialization coverage gaps
// =============================================================================

// --- Monadic: and_then rvalue/const-rvalue on ERROR state ---
TEST_CASE("coverage<void,E&>: and_then rvalue on error short-circuits", "[coverage]") {
    int                           err = 5;
    expected<void, int&> e(unexpect, err);
    auto r = std::move(e).and_then([]() -> expected<void, int&> { return {}; });
    REQUIRE(!r.has_value());
}

TEST_CASE("coverage<void,E&>: and_then const rvalue on error short-circuits", "[coverage]") {
    int                                 err = 5;
    const expected<void, int&> e(unexpect, err);
    auto r = std::move(e).and_then([]() -> expected<void, int&> { return {}; });
    REQUIRE(!r.has_value());
}

// --- Monadic: and_then rvalue/const-rvalue on VALUE state ---
TEST_CASE("coverage<void,E&>: and_then rvalue on value calls F", "[coverage]") {
    expected<void, int&> e;
    bool                 called = false;
    auto r = std::move(e).and_then([&]() -> expected<int, int&> {
        called = true;
        return 42;
    });
    CHECK(called);
    REQUIRE(r.has_value());
}

TEST_CASE("coverage<void,E&>: and_then const rvalue on value calls F", "[coverage]") {
    const expected<void, int&> e;
    auto r = std::move(e).and_then([]() -> expected<int, int&> { return 99; });
    REQUIRE(r.has_value());
    CHECK(*r == 99);
}

// --- Monadic: or_else rvalue/const-rvalue on VALUE state ---
TEST_CASE("coverage<void,E&>: or_else rvalue on value short-circuits", "[coverage]") {
    expected<void, int&> e;
    auto r = std::move(e).or_else([](int&) -> expected<void, int&> { return {}; });
    REQUIRE(r.has_value());
}

TEST_CASE("coverage<void,E&>: or_else const rvalue on value short-circuits", "[coverage]") {
    const expected<void, int&> e;
    auto r = std::move(e).or_else([](int&) -> expected<void, int&> { return {}; });
    REQUIRE(r.has_value());
}

// --- Monadic: transform rvalue/const-rvalue ---
TEST_CASE("coverage<void,E&>: transform rvalue on error short-circuits", "[coverage]") {
    int                           err = 3;
    expected<void, int&> e(unexpect, err);
    auto r = std::move(e).transform([]() { return 1; });
    REQUIRE(!r.has_value());
}

TEST_CASE("coverage<void,E&>: transform const rvalue on error short-circuits", "[coverage]") {
    int                                 err = 3;
    const expected<void, int&> e(unexpect, err);
    auto r = std::move(e).transform([]() { return 1; });
    REQUIRE(!r.has_value());
}

TEST_CASE("coverage<void,E&>: transform rvalue on value calls F", "[coverage]") {
    expected<void, int&> e;
    auto                 r = std::move(e).transform([]() { return 42; });
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

TEST_CASE("coverage<void,E&>: transform const rvalue on value calls F", "[coverage]") {
    const expected<void, int&> e;
    auto                       r = std::move(e).transform([]() { return 7; });
    REQUIRE(r.has_value());
    CHECK(*r == 7);
}

// --- Monadic: transform_error rvalue/const-rvalue ---
TEST_CASE("coverage<void,E&>: transform_error rvalue on value short-circuits", "[coverage]") {
    expected<void, int&> e;
    auto                 r = std::move(e).transform_error([](int& v) { return v * 2; });
    REQUIRE(r.has_value());
}

TEST_CASE("coverage<void,E&>: transform_error const rvalue on value short-circuits", "[coverage]") {
    const expected<void, int&> e;
    auto                       r = std::move(e).transform_error([](int& v) { return v * 2; });
    REQUIRE(r.has_value());
}

TEST_CASE("coverage<void,E&>: transform_error rvalue on error calls F", "[coverage]") {
    int                           err = 5;
    expected<void, int&> e(unexpect, err);
    auto r = std::move(e).transform_error([](int& v) { return v + 1; });
    REQUIRE(!r.has_value());
    CHECK(r.error() == 6);
}

TEST_CASE("coverage<void,E&>: transform_error const rvalue on error calls F", "[coverage]") {
    int                                 err = 5;
    const expected<void, int&> e(unexpect, err);
    auto r = std::move(e).transform_error([](int& v) { return v + 1; });
    REQUIRE(!r.has_value());
    CHECK(r.error() == 6);
}

// --- value() throw paths ---
TEST_CASE("coverage<void,E&>: value() throws on error state", "[coverage]") {
    int                           err = 42;
    expected<void, int&> e(unexpect, err);
    CHECK_THROWS_AS(e.value(), expt::bad_expected_access<int>);
}

TEST_CASE("coverage<void,E&>: value() rvalue throws on error state", "[coverage]") {
    int                           err = 42;
    expected<void, int&> e(unexpect, err);
    CHECK_THROWS_AS(std::move(e).value(), expt::bad_expected_access<int>);
}

// --- Cross-type equality ---
TEST_CASE("coverage<void,E&>: equality error vs value", "[coverage]") {
    int                           err = 0;
    expected<void, int&> a;
    expected<void, int&> b(unexpect, err);
    CHECK_FALSE(a == b);
}

// =============================================================================
// bad_expected_access coverage
// =============================================================================

TEST_CASE("coverage: bad_expected_access move constructor", "[coverage]") {
    expt::bad_expected_access<std::string> orig("test error");
    expt::bad_expected_access<std::string> moved(std::move(orig));
    CHECK(moved.error() == "test error");
}

TEST_CASE("coverage: bad_expected_access rvalue error accessor", "[coverage]") {
    expt::bad_expected_access<std::string> e("val");
    std::string                            s = std::move(e).error();
    CHECK(s == "val");
}

TEST_CASE("coverage: bad_expected_access const rvalue error accessor", "[coverage]") {
    const expt::bad_expected_access<std::string> e("val");
    std::string                                  s = std::move(e).error();
    CHECK(s == "val");
}
