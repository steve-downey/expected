// beman/expected/expected_coverage.test.cpp                        -*-C++-*-
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
// Tests targeting lines uncovered by gcov: rvalue/const-rvalue monadic
// overloads, value()/error() throw paths, rvalue value_or/error_or,
// constructor/assignment error-path branches, and cross-type equality.

#include <beman/expected/expected.hpp>
#include <beman/expected/expected.hpp>

#include <catch2/catch_test_macros.hpp>

#include "testing/types.hpp"

#include <string>
#include <type_traits>
#include <utility>
#include <vector>

namespace expt = beman::expected;
using expt::expected;
using expt::unexpect;
using expt::unexpected;
using namespace beman::expected::testing;

// =============================================================================
// expected<T, E> — primary template coverage gaps
// =============================================================================

// --- Monadic: and_then rvalue/const-rvalue on ERROR state (short-circuit) ---
TEST_CASE("coverage<T,E>: and_then rvalue on error short-circuits", "[coverage]") {
    expected<int, std::string> e(unexpect, "err");
    bool                       called = false;
    auto                       r      = std::move(e).and_then([&](int) -> expected<int, std::string> {
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
    auto                             r      = std::move(e).and_then([&](int) -> expected<int, std::string> {
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
    auto                       r      = std::move(e).or_else([&](int) -> expected<std::string, int> {
        called = true;
        return "x";
    });
    CHECK(!called);
    REQUIRE(r.has_value());
}

TEST_CASE("coverage<T,E>: or_else const rvalue on value short-circuits", "[coverage]") {
    const expected<int, int> e(42);
    bool                     called = false;
    auto                     r      = std::move(e).or_else([&](int) -> expected<int, int> {
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
    auto                        r      = std::move(e).and_then([&]() -> expected<void, std::string> {
        called = true;
        return {};
    });
    CHECK(!called);
    REQUIRE(!r.has_value());
}

TEST_CASE("coverage<void,E>: and_then const rvalue on error short-circuits", "[coverage]") {
    const expected<void, std::string> e(unexpect, "err");
    bool                              called = false;
    auto                              r      = std::move(e).and_then([&]() -> expected<void, std::string> {
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
    auto                r      = std::move(e).and_then([&]() -> expected<int, int> {
        called = true;
        return 42;
    });
    CHECK(called);
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

TEST_CASE("coverage<void,E>: and_then const rvalue on value calls F", "[coverage]") {
    const expected<void, int> e;
    auto                      r = std::move(e).and_then([]() -> expected<int, int> { return 99; });
    REQUIRE(r.has_value());
    CHECK(*r == 99);
}

// --- Monadic: or_else rvalue/const-rvalue on VALUE state ---
TEST_CASE("coverage<void,E>: or_else rvalue on value short-circuits", "[coverage]") {
    expected<void, int> e;
    bool                called = false;
    auto                r      = std::move(e).or_else([&](int) -> expected<void, int> {
        called = true;
        return {};
    });
    CHECK(!called);
    REQUIRE(r.has_value());
}

TEST_CASE("coverage<void,E>: or_else const rvalue on value short-circuits", "[coverage]") {
    const expected<void, int> e;
    auto                      r = std::move(e).or_else([](int) -> expected<void, int> { return {}; });
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
    auto                        r = std::move(e).and_then([](int& v) -> expected<int, std::string> { return v; });
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
    int                       x = 5;
    const expected<int&, int> e(x);
    auto                      r = std::move(e).and_then([](int& v) -> expected<int, int> { return v * 2; });
    REQUIRE(r.has_value());
    CHECK(*r == 10);
}

// --- Monadic: or_else rvalue/const-rvalue on VALUE state ---
TEST_CASE("coverage<T&,E>: or_else rvalue on value short-circuits", "[coverage]") {
    int                 x = 42;
    expected<int&, int> e(x);
    auto                r = std::move(e).or_else([](int) -> expected<int&, int> {
        static int dummy = 0;
        return expected<int&, int>(dummy);
    });
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

TEST_CASE("coverage<T&,E>: or_else const rvalue on value short-circuits", "[coverage]") {
    int                       x = 42;
    const expected<int&, int> e(x);
    auto                      r = std::move(e).or_else([](int) -> expected<int&, int> {
        static int dummy = 0;
        return expected<int&, int>(dummy);
    });
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

// --- Monadic: or_else rvalue/const-rvalue on ERROR state ---
TEST_CASE("coverage<T&,E>: or_else rvalue on error calls F", "[coverage]") {
    expected<int&, int> e(unexpect, 3);
    auto                r = std::move(e).or_else([](int v) -> expected<int&, int> {
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
    int                       x = 4;
    const expected<int&, int> e(x);
    auto                      r = std::move(e).transform([](int& v) { return v + 1; });
    REQUIRE(r.has_value());
    CHECK(*r == 5);
}

// --- Monadic: transform_error rvalue/const-rvalue ---
TEST_CASE("coverage<T&,E>: transform_error rvalue on value short-circuits", "[coverage]") {
    int                 x = 42;
    expected<int&, int> e(x);
    auto                r = std::move(e).transform_error([](int v) { return v * 2; });
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

TEST_CASE("coverage<T&,E>: transform_error const rvalue on value short-circuits", "[coverage]") {
    int                       x = 42;
    const expected<int&, int> e(x);
    auto                      r = std::move(e).transform_error([](int v) { return v * 2; });
    REQUIRE(r.has_value());
}

TEST_CASE("coverage<T&,E>: transform_error const rvalue on error calls F", "[coverage]") {
    const expected<int&, int> e(unexpect, 7);
    auto                      r = std::move(e).transform_error([](int v) { return v + 1; });
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
    int                 x = 1;
    expected<int&, int> a(x);
    expected<int&, int> b(unexpect, 0);
    CHECK_FALSE(a == b);
}

// =============================================================================
// expected<T, E&> — error-reference specialization coverage gaps
// =============================================================================

// --- Monadic: and_then rvalue/const-rvalue on ERROR state ---
TEST_CASE("coverage<T,E&>: and_then rvalue on error short-circuits", "[coverage]") {
    int                 err = 5;
    expected<int, int&> e(unexpect, err);
    auto                r = std::move(e).and_then([](int) -> expected<int, int&> {
        static int dummy = 0;
        return expected<int, int&>(unexpect, dummy);
    });
    REQUIRE(!r.has_value());
    CHECK(r.error() == 5);
}

TEST_CASE("coverage<T,E&>: and_then const rvalue on error short-circuits", "[coverage]") {
    int                       err = 5;
    const expected<int, int&> e(unexpect, err);
    auto                      r = std::move(e).and_then([](int) -> expected<int, int&> {
        static int dummy = 0;
        return expected<int, int&>(unexpect, dummy);
    });
    REQUIRE(!r.has_value());
}

// --- Monadic: or_else rvalue/const-rvalue on VALUE state ---
TEST_CASE("coverage<T,E&>: or_else rvalue on value short-circuits", "[coverage]") {
    expected<int, int&> e(42);
    auto                r = std::move(e).or_else([](int&) -> expected<int, int&> {
        static int dummy = 0;
        return expected<int, int&>(unexpect, dummy);
    });
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

TEST_CASE("coverage<T,E&>: or_else const rvalue on value short-circuits", "[coverage]") {
    const expected<int, int&> e(42);
    auto                      r = std::move(e).or_else([](int&) -> expected<int, int&> {
        static int dummy = 0;
        return expected<int, int&>(unexpect, dummy);
    });
    REQUIRE(r.has_value());
}

// --- Monadic: transform rvalue/const-rvalue on ERROR state ---
TEST_CASE("coverage<T,E&>: transform rvalue on error short-circuits", "[coverage]") {
    int                 err = 3;
    expected<int, int&> e(unexpect, err);
    auto                r = std::move(e).transform([](int v) { return v * 2; });
    REQUIRE(!r.has_value());
}

TEST_CASE("coverage<T,E&>: transform const rvalue on error short-circuits", "[coverage]") {
    int                       err = 3;
    const expected<int, int&> e(unexpect, err);
    auto                      r = std::move(e).transform([](int v) { return v * 2; });
    REQUIRE(!r.has_value());
}

// --- Monadic: transform_error rvalue/const-rvalue ---
TEST_CASE("coverage<T,E&>: transform_error rvalue on value short-circuits", "[coverage]") {
    expected<int, int&> e(42);
    auto                r = std::move(e).transform_error([](int& v) { return v * 2; });
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

TEST_CASE("coverage<T,E&>: transform_error const rvalue on value short-circuits", "[coverage]") {
    const expected<int, int&> e(42);
    auto                      r = std::move(e).transform_error([](int& v) { return v * 2; });
    REQUIRE(r.has_value());
}

TEST_CASE("coverage<T,E&>: transform_error rvalue on error calls F", "[coverage]") {
    int                 err = 5;
    expected<int, int&> e(unexpect, err);
    auto                r = std::move(e).transform_error([](int& v) { return v + 1; });
    REQUIRE(!r.has_value());
    CHECK(r.error() == 6);
}

TEST_CASE("coverage<T,E&>: transform_error const rvalue on error calls F", "[coverage]") {
    int                       err = 5;
    const expected<int, int&> e(unexpect, err);
    auto                      r = std::move(e).transform_error([](int& v) { return v + 1; });
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
    int                 err = 0;
    expected<int, int&> a(1);
    expected<int, int&> b(unexpect, err);
    CHECK_FALSE(a == b);
}

// =============================================================================
// expected<T&, E&> — both-reference specialization coverage gaps
// =============================================================================

// --- Monadic: and_then rvalue/const-rvalue on ERROR state ---
TEST_CASE("coverage<T&,E&>: and_then rvalue on error short-circuits", "[coverage]") {
    int                  err = 5;
    expected<int&, int&> e(unexpect, err);
    auto                 r = std::move(e).and_then([](int&) -> expected<int, int&> {
        static int dummy = 0;
        return expected<int, int&>(unexpect, dummy);
    });
    REQUIRE(!r.has_value());
}

TEST_CASE("coverage<T&,E&>: and_then const rvalue on error short-circuits", "[coverage]") {
    int                        err = 5;
    const expected<int&, int&> e(unexpect, err);
    auto                       r = std::move(e).and_then([](int&) -> expected<int, int&> {
        static int dummy = 0;
        return expected<int, int&>(unexpect, dummy);
    });
    REQUIRE(!r.has_value());
}

// --- Monadic: or_else rvalue/const-rvalue on VALUE state ---
TEST_CASE("coverage<T&,E&>: or_else rvalue on value short-circuits", "[coverage]") {
    int                  x = 42;
    expected<int&, int&> e(x);
    auto                 r = std::move(e).or_else([](int&) -> expected<int&, int&> {
        static int dummy = 0;
        return expected<int&, int&>(dummy);
    });
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

TEST_CASE("coverage<T&,E&>: or_else const rvalue on value short-circuits", "[coverage]") {
    int                        x = 42;
    const expected<int&, int&> e(x);
    auto                       r = std::move(e).or_else([](int&) -> expected<int&, int&> {
        static int dummy = 0;
        return expected<int&, int&>(dummy);
    });
    REQUIRE(r.has_value());
}

// --- Monadic: transform rvalue/const-rvalue on ERROR state ---
TEST_CASE("coverage<T&,E&>: transform rvalue on error short-circuits", "[coverage]") {
    int                  err = 3;
    expected<int&, int&> e(unexpect, err);
    auto                 r = std::move(e).transform([](int& v) { return v * 2; });
    REQUIRE(!r.has_value());
}

TEST_CASE("coverage<T&,E&>: transform const rvalue on error short-circuits", "[coverage]") {
    int                        err = 3;
    const expected<int&, int&> e(unexpect, err);
    auto                       r = std::move(e).transform([](int& v) { return v * 2; });
    REQUIRE(!r.has_value());
}

// --- Monadic: transform_error rvalue/const-rvalue ---
TEST_CASE("coverage<T&,E&>: transform_error rvalue on value short-circuits", "[coverage]") {
    int                  x = 42;
    expected<int&, int&> e(x);
    auto                 r = std::move(e).transform_error([](int& v) { return v * 2; });
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

TEST_CASE("coverage<T&,E&>: transform_error const rvalue on value short-circuits", "[coverage]") {
    int                        x = 42;
    const expected<int&, int&> e(x);
    auto                       r = std::move(e).transform_error([](int& v) { return v * 2; });
    REQUIRE(r.has_value());
}

TEST_CASE("coverage<T&,E&>: transform_error rvalue on error calls F", "[coverage]") {
    int                  err = 5;
    expected<int&, int&> e(unexpect, err);
    auto                 r = std::move(e).transform_error([](int& v) { return v + 1; });
    REQUIRE(!r.has_value());
    CHECK(r.error() == 6);
}

TEST_CASE("coverage<T&,E&>: transform_error const rvalue on error calls F", "[coverage]") {
    int                        err = 5;
    const expected<int&, int&> e(unexpect, err);
    auto                       r = std::move(e).transform_error([](int& v) { return v + 1; });
    REQUIRE(!r.has_value());
    CHECK(r.error() == 6);
}

// --- Cross-type equality ---
TEST_CASE("coverage<T&,E&>: equality error vs value", "[coverage]") {
    int                  x = 1, err = 0;
    expected<int&, int&> a(x);
    expected<int&, int&> b(unexpect, err);
    CHECK_FALSE(a == b);
}

// =============================================================================
// expected<void, E&> — void+error-reference specialization coverage gaps
// =============================================================================

// --- Monadic: and_then rvalue/const-rvalue on ERROR state ---
TEST_CASE("coverage<void,E&>: and_then rvalue on error short-circuits", "[coverage]") {
    int                  err = 5;
    expected<void, int&> e(unexpect, err);
    auto                 r = std::move(e).and_then([]() -> expected<void, int&> { return {}; });
    REQUIRE(!r.has_value());
}

TEST_CASE("coverage<void,E&>: and_then const rvalue on error short-circuits", "[coverage]") {
    int                        err = 5;
    const expected<void, int&> e(unexpect, err);
    auto                       r = std::move(e).and_then([]() -> expected<void, int&> { return {}; });
    REQUIRE(!r.has_value());
}

// --- Monadic: and_then rvalue/const-rvalue on VALUE state ---
TEST_CASE("coverage<void,E&>: and_then rvalue on value calls F", "[coverage]") {
    expected<void, int&> e;
    bool                 called = false;
    auto                 r      = std::move(e).and_then([&]() -> expected<int, int&> {
        called = true;
        return 42;
    });
    CHECK(called);
    REQUIRE(r.has_value());
}

TEST_CASE("coverage<void,E&>: and_then const rvalue on value calls F", "[coverage]") {
    const expected<void, int&> e;
    auto                       r = std::move(e).and_then([]() -> expected<int, int&> { return 99; });
    REQUIRE(r.has_value());
    CHECK(*r == 99);
}

// --- Monadic: or_else rvalue/const-rvalue on VALUE state ---
TEST_CASE("coverage<void,E&>: or_else rvalue on value short-circuits", "[coverage]") {
    expected<void, int&> e;
    auto                 r = std::move(e).or_else([](int&) -> expected<void, int&> { return {}; });
    REQUIRE(r.has_value());
}

TEST_CASE("coverage<void,E&>: or_else const rvalue on value short-circuits", "[coverage]") {
    const expected<void, int&> e;
    auto                       r = std::move(e).or_else([](int&) -> expected<void, int&> { return {}; });
    REQUIRE(r.has_value());
}

// --- Monadic: transform rvalue/const-rvalue ---
TEST_CASE("coverage<void,E&>: transform rvalue on error short-circuits", "[coverage]") {
    int                  err = 3;
    expected<void, int&> e(unexpect, err);
    auto                 r = std::move(e).transform([]() { return 1; });
    REQUIRE(!r.has_value());
}

TEST_CASE("coverage<void,E&>: transform const rvalue on error short-circuits", "[coverage]") {
    int                        err = 3;
    const expected<void, int&> e(unexpect, err);
    auto                       r = std::move(e).transform([]() { return 1; });
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
    int                  err = 5;
    expected<void, int&> e(unexpect, err);
    auto                 r = std::move(e).transform_error([](int& v) { return v + 1; });
    REQUIRE(!r.has_value());
    CHECK(r.error() == 6);
}

TEST_CASE("coverage<void,E&>: transform_error const rvalue on error calls F", "[coverage]") {
    int                        err = 5;
    const expected<void, int&> e(unexpect, err);
    auto                       r = std::move(e).transform_error([](int& v) { return v + 1; });
    REQUIRE(!r.has_value());
    CHECK(r.error() == 6);
}

// --- value() throw paths ---
TEST_CASE("coverage<void,E&>: value() throws on error state", "[coverage]") {
    int                  err = 42;
    expected<void, int&> e(unexpect, err);
    CHECK_THROWS_AS(e.value(), expt::bad_expected_access<int>);
}

TEST_CASE("coverage<void,E&>: value() rvalue throws on error state", "[coverage]") {
    int                  err = 42;
    expected<void, int&> e(unexpect, err);
    CHECK_THROWS_AS(std::move(e).value(), expt::bad_expected_access<int>);
}

// --- Cross-type equality ---
TEST_CASE("coverage<void,E&>: equality error vs value", "[coverage]") {
    int                  err = 0;
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

// =============================================================================
// Tests using beman::expected::testing types for non-trivial path coverage
// =============================================================================

// ---------------------------------------------------------------------------
// expected<traced, traced>: non-trivial destructor, copy/move ctor, assignment
// ---------------------------------------------------------------------------

TEST_CASE("traced<T,E>: default construct (value state)", "[coverage][traced]") {
    expected<traced, traced> e(std::in_place, 42);
    REQUIRE(e.has_value());
    CHECK(e->val == 42);
}

TEST_CASE("traced<T,E>: error construct", "[coverage][traced]") {
    expected<traced, traced> e(unexpect, 7);
    REQUIRE(!e.has_value());
    CHECK(e.error().val == 7);
}

TEST_CASE("traced<T,E>: copy construct value state", "[coverage][traced]") {
    expected<traced, traced> a(std::in_place, 10);
    expected<traced, traced> b(a);
    REQUIRE(b.has_value());
    CHECK(b->val == 10);
}

TEST_CASE("traced<T,E>: copy construct error state", "[coverage][traced]") {
    expected<traced, traced> a(unexpect, 20);
    expected<traced, traced> b(a);
    REQUIRE(!b.has_value());
    CHECK(b.error().val == 20);
}

TEST_CASE("traced<T,E>: move construct value state", "[coverage][traced]") {
    expected<traced, traced> a(std::in_place, 10);
    expected<traced, traced> b(std::move(a));
    REQUIRE(b.has_value());
    CHECK(b->val == 10);
}

TEST_CASE("traced<T,E>: move construct error state", "[coverage][traced]") {
    expected<traced, traced> a(unexpect, 20);
    expected<traced, traced> b(std::move(a));
    REQUIRE(!b.has_value());
    CHECK(b.error().val == 20);
}

TEST_CASE("traced<T,E>: copy assign value-to-value", "[coverage][traced]") {
    expected<traced, traced> a(std::in_place, 1);
    expected<traced, traced> b(std::in_place, 2);
    b = a;
    CHECK(b->val == 1);
}

TEST_CASE("traced<T,E>: copy assign error-to-error", "[coverage][traced]") {
    expected<traced, traced> a(unexpect, 3);
    expected<traced, traced> b(unexpect, 4);
    b = a;
    CHECK(b.error().val == 3);
}

TEST_CASE("traced<T,E>: copy assign error-to-value (state change)", "[coverage][traced]") {
    expected<traced, traced> a(unexpect, 5);
    expected<traced, traced> b(std::in_place, 6);
    b = a;
    REQUIRE(!b.has_value());
    CHECK(b.error().val == 5);
}

TEST_CASE("traced<T,E>: copy assign value-to-error (state change)", "[coverage][traced]") {
    expected<traced, traced> a(std::in_place, 7);
    expected<traced, traced> b(unexpect, 8);
    b = a;
    REQUIRE(b.has_value());
    CHECK(b->val == 7);
}

TEST_CASE("traced<T,E>: move assign error-to-error", "[coverage][traced]") {
    expected<traced, traced> a(unexpect, 9);
    expected<traced, traced> b(unexpect, 10);
    b = std::move(a);
    CHECK(b.error().val == 9);
}

TEST_CASE("traced<T,E>: move assign error-to-value (state change)", "[coverage][traced]") {
    expected<traced, traced> a(unexpect, 11);
    expected<traced, traced> b(std::in_place, 12);
    b = std::move(a);
    REQUIRE(!b.has_value());
    CHECK(b.error().val == 11);
}

TEST_CASE("traced<T,E>: move assign value-to-error (state change)", "[coverage][traced]") {
    expected<traced, traced> a(std::in_place, 13);
    expected<traced, traced> b(unexpect, 14);
    b = std::move(a);
    REQUIRE(b.has_value());
    CHECK(b->val == 13);
}

TEST_CASE("traced<T,E>: assign from unexpected const&", "[coverage][traced]") {
    expected<traced, traced> e(std::in_place, 1);
    unexpected<traced>       u(traced(99));
    e = u;
    REQUIRE(!e.has_value());
    CHECK(e.error().val == 99);
}

TEST_CASE("traced<T,E>: assign from unexpected&&", "[coverage][traced]") {
    expected<traced, traced> e(std::in_place, 1);
    e = unexpected<traced>(traced(77));
    REQUIRE(!e.has_value());
    CHECK(e.error().val == 77);
}

TEST_CASE("traced<T,E>: emplace on error state", "[coverage][traced]") {
    expected<traced, traced> e(unexpect, 1);
    e.emplace(42);
    REQUIRE(e.has_value());
    CHECK(e->val == 42);
}

TEST_CASE("traced<T,E>: destructor runs for value state", "[coverage][traced]") {
    {
        expected<traced, traced> e(std::in_place, 1);
    }
}

TEST_CASE("traced<T,E>: destructor runs for error state", "[coverage][traced]") {
    {
        expected<traced, traced> e(unexpect, 1);
    }
}

// --- traced monadic: all 4 overloads × value + error paths ---

TEST_CASE("traced<T,E>: and_then lvalue value path", "[coverage][traced]") {
    expected<traced, traced> e(std::in_place, 5);
    auto                     r = e.and_then(
        [](traced& v) -> expected<traced, traced> { return expected<traced, traced>(std::in_place, v.val * 2); });
    REQUIRE(r.has_value());
    CHECK(r->val == 10);
}

TEST_CASE("traced<T,E>: and_then lvalue error path", "[coverage][traced]") {
    expected<traced, traced> e(unexpect, 5);
    auto                     r =
        e.and_then([](traced&) -> expected<traced, traced> { return expected<traced, traced>(std::in_place, 0); });
    REQUIRE(!r.has_value());
    CHECK(r.error().val == 5);
}

TEST_CASE("traced<T,E>: and_then const lvalue error path", "[coverage][traced]") {
    const expected<traced, traced> e(unexpect, 5);
    auto                           r = e.and_then(
        [](const traced&) -> expected<traced, traced> { return expected<traced, traced>(std::in_place, 0); });
    REQUIRE(!r.has_value());
}

TEST_CASE("traced<T,E>: or_else lvalue value path", "[coverage][traced]") {
    expected<traced, traced> e(std::in_place, 5);
    auto r = e.or_else([](traced&) -> expected<traced, traced> { return expected<traced, traced>(unexpect, 0); });
    REQUIRE(r.has_value());
    CHECK(r->val == 5);
}

TEST_CASE("traced<T,E>: or_else lvalue error path", "[coverage][traced]") {
    expected<traced, traced> e(unexpect, 3);
    auto                     r = e.or_else(
        [](traced& v) -> expected<traced, traced> { return expected<traced, traced>(std::in_place, v.val * 10); });
    REQUIRE(r.has_value());
    CHECK(r->val == 30);
}

TEST_CASE("traced<T,E>: or_else const lvalue value path", "[coverage][traced]") {
    const expected<traced, traced> e(std::in_place, 5);
    auto                           r =
        e.or_else([](const traced&) -> expected<traced, traced> { return expected<traced, traced>(unexpect, 0); });
    REQUIRE(r.has_value());
}

TEST_CASE("traced<T,E>: or_else rvalue error path", "[coverage][traced]") {
    expected<traced, traced> e(unexpect, 3);
    auto                     r = std::move(e).or_else(
        [](traced&& v) -> expected<traced, traced> { return expected<traced, traced>(std::in_place, v.val); });
    REQUIRE(r.has_value());
}

TEST_CASE("traced<T,E>: or_else const rvalue value path", "[coverage][traced]") {
    const expected<traced, traced> e(std::in_place, 5);
    auto                           r = std::move(e).or_else(
        [](const traced&) -> expected<traced, traced> { return expected<traced, traced>(unexpect, 0); });
    REQUIRE(r.has_value());
}

TEST_CASE("traced<T,E>: transform lvalue value path", "[coverage][traced]") {
    expected<traced, traced> e(std::in_place, 3);
    auto                     r = e.transform([](traced& v) { return traced(v.val + 1); });
    REQUIRE(r.has_value());
    CHECK(r->val == 4);
}

TEST_CASE("traced<T,E>: transform lvalue error path", "[coverage][traced]") {
    expected<traced, traced> e(unexpect, 3);
    auto                     r = e.transform([](traced&) { return traced(0); });
    REQUIRE(!r.has_value());
}

TEST_CASE("traced<T,E>: transform rvalue value path", "[coverage][traced]") {
    expected<traced, traced> e(std::in_place, 3);
    auto                     r = std::move(e).transform([](traced&& v) { return traced(v.val + 1); });
    REQUIRE(r.has_value());
    CHECK(r->val == 4);
}

TEST_CASE("traced<T,E>: transform const lvalue error path", "[coverage][traced]") {
    const expected<traced, traced> e(unexpect, 3);
    auto                           r = e.transform([](const traced&) { return traced(0); });
    REQUIRE(!r.has_value());
}

TEST_CASE("traced<T,E>: transform const rvalue value path", "[coverage][traced]") {
    const expected<traced, traced> e(std::in_place, 3);
    auto                           r = std::move(e).transform([](const traced& v) { return traced(v.val + 1); });
    REQUIRE(r.has_value());
}

TEST_CASE("traced<T,E>: transform to void lvalue", "[coverage][traced]") {
    expected<traced, traced> e(std::in_place, 1);
    auto                     r = e.transform([](traced&) {});
    REQUIRE(r.has_value());
}

TEST_CASE("traced<T,E>: transform_error lvalue value path", "[coverage][traced]") {
    expected<traced, traced> e(std::in_place, 5);
    auto                     r = e.transform_error([](traced&) { return traced(0); });
    REQUIRE(r.has_value());
    CHECK(r->val == 5);
}

TEST_CASE("traced<T,E>: transform_error lvalue error path", "[coverage][traced]") {
    expected<traced, traced> e(unexpect, 5);
    auto                     r = e.transform_error([](traced& v) { return traced(v.val + 1); });
    REQUIRE(!r.has_value());
    CHECK(r.error().val == 6);
}

TEST_CASE("traced<T,E>: transform_error rvalue value path", "[coverage][traced]") {
    expected<traced, traced> e(std::in_place, 5);
    auto                     r = std::move(e).transform_error([](traced&&) { return traced(0); });
    REQUIRE(r.has_value());
}

TEST_CASE("traced<T,E>: transform_error rvalue error path", "[coverage][traced]") {
    expected<traced, traced> e(unexpect, 5);
    auto                     r = std::move(e).transform_error([](traced&& v) { return traced(v.val + 1); });
    REQUIRE(!r.has_value());
    CHECK(r.error().val == 6);
}

TEST_CASE("traced<T,E>: transform_error const lvalue value path", "[coverage][traced]") {
    const expected<traced, traced> e(std::in_place, 5);
    auto                           r = e.transform_error([](const traced&) { return traced(0); });
    REQUIRE(r.has_value());
}

TEST_CASE("traced<T,E>: transform_error const rvalue value path", "[coverage][traced]") {
    const expected<traced, traced> e(std::in_place, 5);
    auto                           r = std::move(e).transform_error([](const traced&) { return traced(0); });
    REQUIRE(r.has_value());
}

// --- value() throw with non-trivial E ---
TEST_CASE("traced<T,E>: value() lvalue throws", "[coverage][traced]") {
    expected<traced, traced> e(unexpect, 42);
    CHECK_THROWS_AS(e.value(), expt::bad_expected_access<traced>);
}

TEST_CASE("traced<T,E>: value() const rvalue throws", "[coverage][traced]") {
    const expected<traced, traced> e(unexpect, 42);
    CHECK_THROWS_AS(std::move(e).value(), expt::bad_expected_access<traced>);
}

// --- value_or / error_or rvalue with non-trivial types ---
TEST_CASE("traced<T,E>: value_or rvalue returns value", "[coverage][traced]") {
    expected<traced, int> e(std::in_place, 5);
    traced                t = std::move(e).value_or(traced(0));
    CHECK(t.val == 5);
}

TEST_CASE("traced<T,E>: error_or const lvalue returns error", "[coverage][traced]") {
    const expected<int, traced> e(unexpect, 7);
    traced                      t = e.error_or(traced(0));
    CHECK(t.val == 7);
}

TEST_CASE("traced<T,E>: error_or rvalue returns error", "[coverage][traced]") {
    expected<int, traced> e(unexpect, 7);
    traced                t = std::move(e).error_or(traced(0));
    CHECK(t.val == 7);
}

TEST_CASE("traced<T,E>: error_or rvalue returns default when value", "[coverage][traced]") {
    expected<int, traced> e(42);
    traced                t = std::move(e).error_or(traced(99));
    CHECK(t.val == 99);
}

// ---------------------------------------------------------------------------
// init_list_type: in_place_t / unexpect_t with initializer_list
// ---------------------------------------------------------------------------

TEST_CASE("init_list: in_place_t with initializer_list", "[coverage][init_list]") {
    expected<init_list_type, int> e(std::in_place, {1, 2, 3});
    REQUIRE(e.has_value());
    CHECK(e->sum == 6);
    CHECK(e->count == 3);
}

TEST_CASE("init_list: in_place_t with initializer_list and extra arg", "[coverage][init_list]") {
    expected<init_list_type, int> e(std::in_place, {1, 2, 3}, 100);
    REQUIRE(e.has_value());
    CHECK(e->sum == 106);
}

TEST_CASE("init_list: unexpect_t with initializer_list", "[coverage][init_list]") {
    expected<int, init_list_type> e(unexpect, {10, 20, 30});
    REQUIRE(!e.has_value());
    CHECK(e.error().sum == 60);
    CHECK(e.error().count == 3);
}

TEST_CASE("init_list: emplace with initializer_list on value state", "[coverage][init_list]") {
    expected<init_list_type, int> e(std::in_place, {1});
    e.emplace({4, 5, 6});
    REQUIRE(e.has_value());
    CHECK(e->sum == 15);
}

TEST_CASE("init_list: emplace with initializer_list on error state", "[coverage][init_list]") {
    expected<init_list_type, int> e(unexpect, 0);
    e.emplace({7, 8});
    REQUIRE(e.has_value());
    CHECK(e->sum == 15);
}

// ---------------------------------------------------------------------------
// expected<void, traced>: void specialization with non-trivial E
// ---------------------------------------------------------------------------

TEST_CASE("void<traced>: unexpect_t constructor", "[coverage][traced]") {
    expected<void, traced> e(unexpect, 42);
    REQUIRE(!e.has_value());
    CHECK(e.error().val == 42);
}

TEST_CASE("void<traced>: move construct error state", "[coverage][traced]") {
    expected<void, traced> a(unexpect, 10);
    expected<void, traced> b(std::move(a));
    REQUIRE(!b.has_value());
    CHECK(b.error().val == 10);
}

TEST_CASE("void<traced>: move assign error-to-error", "[coverage][traced]") {
    expected<void, traced> a(unexpect, 1);
    expected<void, traced> b(unexpect, 2);
    b = std::move(a);
    CHECK(b.error().val == 1);
}

TEST_CASE("void<traced>: value() rvalue throws", "[coverage][traced]") {
    expected<void, traced> e(unexpect, 42);
    CHECK_THROWS_AS(std::move(e).value(), expt::bad_expected_access<traced>);
}

TEST_CASE("void<traced>: and_then lvalue error path", "[coverage][traced]") {
    expected<void, traced> e(unexpect, 5);
    auto                   r = e.and_then([]() -> expected<void, traced> { return {}; });
    REQUIRE(!r.has_value());
}

TEST_CASE("void<traced>: and_then const lvalue error path", "[coverage][traced]") {
    const expected<void, traced> e(unexpect, 5);
    auto                         r = e.and_then([]() -> expected<void, traced> { return {}; });
    REQUIRE(!r.has_value());
}

TEST_CASE("void<traced>: or_else lvalue value path", "[coverage][traced]") {
    expected<void, traced> e;
    auto                   r = e.or_else([](traced&) -> expected<void, traced> { return {}; });
    REQUIRE(r.has_value());
}

TEST_CASE("void<traced>: or_else rvalue value path", "[coverage][traced]") {
    expected<void, traced> e;
    auto                   r = std::move(e).or_else([](traced&&) -> expected<void, traced> { return {}; });
    REQUIRE(r.has_value());
}

TEST_CASE("void<traced>: or_else const rvalue value path", "[coverage][traced]") {
    const expected<void, traced> e;
    auto                         r = std::move(e).or_else([](const traced&) -> expected<void, traced> { return {}; });
    REQUIRE(r.has_value());
}

TEST_CASE("void<traced>: transform lvalue value path", "[coverage][traced]") {
    expected<void, traced> e;
    auto                   r = e.transform([]() { return traced(1); });
    REQUIRE(r.has_value());
    CHECK(r->val == 1);
}

TEST_CASE("void<traced>: transform lvalue error path", "[coverage][traced]") {
    expected<void, traced> e(unexpect, 5);
    auto                   r = e.transform([]() { return traced(0); });
    REQUIRE(!r.has_value());
}

TEST_CASE("void<traced>: transform rvalue value path", "[coverage][traced]") {
    expected<void, traced> e;
    auto                   r = std::move(e).transform([]() { return traced(2); });
    REQUIRE(r.has_value());
}

TEST_CASE("void<traced>: transform rvalue error path", "[coverage][traced]") {
    expected<void, traced> e(unexpect, 5);
    auto                   r = std::move(e).transform([]() { return traced(0); });
    REQUIRE(!r.has_value());
}

TEST_CASE("void<traced>: transform const rvalue value path", "[coverage][traced]") {
    const expected<void, traced> e;
    auto                         r = std::move(e).transform([]() { return traced(3); });
    REQUIRE(r.has_value());
}

TEST_CASE("void<traced>: transform const rvalue error path", "[coverage][traced]") {
    const expected<void, traced> e(unexpect, 5);
    auto                         r = std::move(e).transform([]() { return traced(0); });
    REQUIRE(!r.has_value());
}

TEST_CASE("void<traced>: transform to void lvalue", "[coverage][traced]") {
    expected<void, traced> e;
    auto                   r = e.transform([]() {});
    REQUIRE(r.has_value());
}

TEST_CASE("void<traced>: transform_error lvalue value path", "[coverage][traced]") {
    expected<void, traced> e;
    auto                   r = e.transform_error([](traced&) { return traced(0); });
    REQUIRE(r.has_value());
}

TEST_CASE("void<traced>: transform_error lvalue error path", "[coverage][traced]") {
    expected<void, traced> e(unexpect, 5);
    auto                   r = e.transform_error([](traced& v) { return traced(v.val + 1); });
    REQUIRE(!r.has_value());
    CHECK(r.error().val == 6);
}

TEST_CASE("void<traced>: transform_error rvalue value path", "[coverage][traced]") {
    expected<void, traced> e;
    auto                   r = std::move(e).transform_error([](traced&&) { return traced(0); });
    REQUIRE(r.has_value());
}

TEST_CASE("void<traced>: transform_error const rvalue value path", "[coverage][traced]") {
    const expected<void, traced> e;
    auto                         r = std::move(e).transform_error([](const traced&) { return traced(0); });
    REQUIRE(r.has_value());
}

// --- void unexpect_t with init-list ---
TEST_CASE("void<init_list>: unexpect_t with initializer_list", "[coverage][init_list]") {
    expected<void, init_list_type> e(unexpect, {1, 2, 3});
    REQUIRE(!e.has_value());
    CHECK(e.error().sum == 6);
}

// ---------------------------------------------------------------------------
// Converting constructors: expected<widened, widened> from expected<narrowed, narrowed>
// ---------------------------------------------------------------------------

TEST_CASE("converting: copy construct value state", "[coverage][converting]") {
    expected<narrowed, narrowed> a(std::in_place, narrowed(5));
    expected<widened, widened>   b(a);
    REQUIRE(b.has_value());
    CHECK(b->val == 5);
}

TEST_CASE("converting: copy construct error state", "[coverage][converting]") {
    expected<narrowed, narrowed> a(unexpect, narrowed(7));
    expected<widened, widened>   b(a);
    REQUIRE(!b.has_value());
    CHECK(b.error().val == 7);
}

TEST_CASE("converting: move construct value state", "[coverage][converting]") {
    expected<narrowed, narrowed> a(std::in_place, narrowed(5));
    expected<widened, widened>   b(std::move(a));
    REQUIRE(b.has_value());
    CHECK(b->val == 5);
}

TEST_CASE("converting: move construct error state", "[coverage][converting]") {
    expected<narrowed, narrowed> a(unexpect, narrowed(7));
    expected<widened, widened>   b(std::move(a));
    REQUIRE(!b.has_value());
    CHECK(b.error().val == 7);
}

// ---------------------------------------------------------------------------
// expected<T&, E> with non-trivial E: lvalue monadic overloads
// ---------------------------------------------------------------------------

TEST_CASE("ref<T&,traced>: and_then lvalue value path", "[coverage][traced]") {
    int                    x = 5;
    expected<int&, traced> e(x);
    auto                   r = e.and_then([](int& v) -> expected<int, traced> { return v * 2; });
    REQUIRE(r.has_value());
    CHECK(*r == 10);
}

TEST_CASE("ref<T&,traced>: and_then lvalue error path", "[coverage][traced]") {
    expected<int&, traced> e(unexpect, 5);
    auto                   r = e.and_then([](int&) -> expected<int, traced> { return 0; });
    REQUIRE(!r.has_value());
}

TEST_CASE("ref<T&,traced>: and_then rvalue error path", "[coverage][traced]") {
    expected<int&, traced> e(unexpect, 5);
    auto                   r = std::move(e).and_then([](int&) -> expected<int, traced> { return 0; });
    REQUIRE(!r.has_value());
}

TEST_CASE("ref<T&,traced>: and_then const lvalue error path", "[coverage][traced]") {
    const expected<int&, traced> e(unexpect, 5);
    auto                         r = e.and_then([](int&) -> expected<int, traced> { return 0; });
    REQUIRE(!r.has_value());
}

TEST_CASE("ref<T&,traced>: and_then const rvalue error path", "[coverage][traced]") {
    const expected<int&, traced> e(unexpect, 5);
    auto                         r = std::move(e).and_then([](int&) -> expected<int, traced> { return 0; });
    REQUIRE(!r.has_value());
}

TEST_CASE("ref<T&,traced>: or_else lvalue value path", "[coverage][traced]") {
    int                    x = 5;
    expected<int&, traced> e(x);
    auto                   r = e.or_else([](traced&) -> expected<int&, traced> {
        static int dummy = 0;
        return expected<int&, traced>(dummy);
    });
    REQUIRE(r.has_value());
    CHECK(*r == 5);
}

TEST_CASE("ref<T&,traced>: or_else rvalue value path", "[coverage][traced]") {
    int                    x = 5;
    expected<int&, traced> e(x);
    auto                   r = std::move(e).or_else([](traced&&) -> expected<int&, traced> {
        static int dummy = 0;
        return expected<int&, traced>(dummy);
    });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<T&,traced>: or_else const rvalue value path", "[coverage][traced]") {
    int                          x = 5;
    const expected<int&, traced> e(x);
    auto                         r = std::move(e).or_else([](const traced&) -> expected<int&, traced> {
        static int dummy = 0;
        return expected<int&, traced>(dummy);
    });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<T&,traced>: transform lvalue value and error paths", "[coverage][traced]") {
    int                    x = 4;
    expected<int&, traced> e(x);
    auto                   rv = e.transform([](int& v) { return v + 1; });
    REQUIRE(rv.has_value());
    CHECK(*rv == 5);

    expected<int&, traced> e2(unexpect, 1);
    auto                   re = e2.transform([](int&) { return 0; });
    REQUIRE(!re.has_value());
}

TEST_CASE("ref<T&,traced>: transform rvalue value path", "[coverage][traced]") {
    int                    x = 4;
    expected<int&, traced> e(x);
    auto                   r = std::move(e).transform([](int& v) { return v + 1; });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<T&,traced>: transform const rvalue value path", "[coverage][traced]") {
    int                          x = 4;
    const expected<int&, traced> e(x);
    auto                         r = std::move(e).transform([](int& v) { return v + 1; });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<T&,traced>: transform to void lvalue", "[coverage][traced]") {
    int                    x = 1;
    expected<int&, traced> e(x);
    auto                   r = e.transform([](int&) {});
    REQUIRE(r.has_value());
}

TEST_CASE("ref<T&,traced>: transform_error lvalue value path", "[coverage][traced]") {
    int                    x = 5;
    expected<int&, traced> e(x);
    auto                   r = e.transform_error([](traced&) { return traced(0); });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<T&,traced>: transform_error rvalue value path", "[coverage][traced]") {
    int                    x = 5;
    expected<int&, traced> e(x);
    auto                   r = std::move(e).transform_error([](traced&&) { return traced(0); });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<T&,traced>: transform_error const lvalue value path", "[coverage][traced]") {
    int                          x = 5;
    const expected<int&, traced> e(x);
    auto                         r = e.transform_error([](const traced&) { return traced(0); });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<T&,traced>: transform_error const rvalue value path", "[coverage][traced]") {
    int                          x = 5;
    const expected<int&, traced> e(x);
    auto                         r = std::move(e).transform_error([](const traced&) { return traced(0); });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<T&,traced>: transform_error lvalue error path", "[coverage][traced]") {
    expected<int&, traced> e(unexpect, 5);
    auto                   r = e.transform_error([](traced& v) { return traced(v.val + 1); });
    REQUIRE(!r.has_value());
    CHECK(r.error().val == 6);
}

TEST_CASE("ref<T&,traced>: copy ctor error state", "[coverage][traced]") {
    expected<int&, traced> a(unexpect, 10);
    expected<int&, traced> b(a);
    REQUIRE(!b.has_value());
    CHECK(b.error().val == 10);
}

TEST_CASE("ref<T&,traced>: converting copy ctor error state", "[coverage][traced]") {
    expected<int&, narrowed> a(unexpect, narrowed(7));
    expected<int&, widened>  b(a);
    REQUIRE(!b.has_value());
    CHECK(b.error().val == 7);
}

TEST_CASE("ref<T&,traced>: assign unexpected to value state", "[coverage][traced]") {
    int                    x = 5;
    expected<int&, traced> e(x);
    e = unexpected<traced>(traced(42));
    REQUIRE(!e.has_value());
    CHECK(e.error().val == 42);
}

TEST_CASE("ref<T&,traced>: move assign error-to-error", "[coverage][traced]") {
    expected<int&, traced> a(unexpect, 1);
    expected<int&, traced> b(unexpect, 2);
    b = std::move(a);
    CHECK(b.error().val == 1);
}

TEST_CASE("ref<T&,traced>: swap value and error state", "[coverage][traced]") {
    int                    x = 5;
    expected<int&, traced> a(x);
    expected<int&, traced> b(unexpect, 7);
    a.swap(b);
    REQUIRE(!a.has_value());
    CHECK(a.error().val == 7);
    REQUIRE(b.has_value());
    CHECK(*b == 5);
}

TEST_CASE("ref<T&,traced>: equality both errors", "[coverage][traced]") {
    expected<int&, traced> a(unexpect, 1);
    expected<int&, traced> b(unexpect, 1);
    CHECK(a == b);
}

TEST_CASE("ref<T&,traced>: equality error vs value", "[coverage][traced]") {
    int                    x = 1;
    expected<int&, traced> a(x);
    expected<int&, traced> b(unexpect, 0);
    CHECK_FALSE(a == b);
}

// ---------------------------------------------------------------------------
// expected<T, E&>: lvalue monadic paths with non-trivial T
// ---------------------------------------------------------------------------

TEST_CASE("ref<traced,E&>: and_then lvalue error path", "[coverage][traced]") {
    int                    err = 5;
    expected<traced, int&> e(unexpect, err);
    auto                   r = e.and_then([](traced&) -> expected<traced, int&> {
        static int dummy = 0;
        return expected<traced, int&>(unexpect, dummy);
    });
    REQUIRE(!r.has_value());
}

TEST_CASE("ref<traced,E&>: or_else lvalue value path", "[coverage][traced]") {
    expected<traced, int&> e(std::in_place, 5);
    auto                   r = e.or_else([](int&) -> expected<traced, int&> {
        static int dummy = 0;
        return expected<traced, int&>(unexpect, dummy);
    });
    REQUIRE(r.has_value());
    CHECK(r->val == 5);
}

TEST_CASE("ref<traced,E&>: or_else rvalue value path", "[coverage][traced]") {
    expected<traced, int&> e(std::in_place, 5);
    auto                   r = std::move(e).or_else([](int&) -> expected<traced, int&> {
        static int dummy = 0;
        return expected<traced, int&>(unexpect, dummy);
    });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<traced,E&>: or_else const rvalue value path", "[coverage][traced]") {
    const expected<traced, int&> e(std::in_place, 5);
    auto                         r = std::move(e).or_else([](int&) -> expected<traced, int&> {
        static int dummy = 0;
        return expected<traced, int&>(unexpect, dummy);
    });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<traced,E&>: transform lvalue value path", "[coverage][traced]") {
    expected<traced, int&> e(std::in_place, 3);
    auto                   r = e.transform([](traced& v) { return traced(v.val + 1); });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<traced,E&>: transform rvalue value path", "[coverage][traced]") {
    expected<traced, int&> e(std::in_place, 3);
    auto                   r = std::move(e).transform([](traced&& v) { return traced(v.val + 1); });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<traced,E&>: transform const rvalue value path", "[coverage][traced]") {
    const expected<traced, int&> e(std::in_place, 3);
    auto                         r = std::move(e).transform([](const traced& v) { return traced(v.val + 1); });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<traced,E&>: transform_error lvalue value path", "[coverage][traced]") {
    expected<traced, int&> e(std::in_place, 5);
    auto                   r = e.transform_error([](int& v) { return v * 2; });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<traced,E&>: transform_error rvalue value path", "[coverage][traced]") {
    expected<traced, int&> e(std::in_place, 5);
    auto                   r = std::move(e).transform_error([](int& v) { return v * 2; });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<traced,E&>: transform_error const rvalue value path", "[coverage][traced]") {
    const expected<traced, int&> e(std::in_place, 5);
    auto                         r = std::move(e).transform_error([](int& v) { return v * 2; });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<traced,E&>: equality error vs value", "[coverage][traced]") {
    int                    err = 0;
    expected<traced, int&> a(std::in_place, 1);
    expected<traced, int&> b(unexpect, err);
    CHECK_FALSE(a == b);
}

// ---------------------------------------------------------------------------
// expected<T&, E&>: lvalue monadic paths
// ---------------------------------------------------------------------------

TEST_CASE("ref<T&,E&>: and_then lvalue value and error paths", "[coverage][traced]") {
    int                  x = 5, err = 3;
    expected<int&, int&> ev(x);
    auto                 rv = ev.and_then([](int& v) -> expected<int, int&> {
        static int dummy = 0;
        dummy            = v * 2;
        return dummy;
    });
    REQUIRE(rv.has_value());

    expected<int&, int&> ee(unexpect, err);
    auto                 re = ee.and_then([](int&) -> expected<int, int&> {
        static int dummy = 0;
        return expected<int, int&>(unexpect, dummy);
    });
    REQUIRE(!re.has_value());
}

TEST_CASE("ref<T&,E&>: or_else lvalue value and error paths", "[coverage][traced]") {
    int                  x = 5, err = 3;
    expected<int&, int&> ev(x);
    auto                 rv = ev.or_else([](int&) -> expected<int&, int&> {
        static int dummy = 0;
        return expected<int&, int&>(dummy);
    });
    REQUIRE(rv.has_value());

    expected<int&, int&> ee(unexpect, err);
    auto                 re = ee.or_else([](int& v) -> expected<int&, int&> {
        static int result = 0;
        result            = v * 10;
        return expected<int&, int&>(result);
    });
    REQUIRE(re.has_value());
}

TEST_CASE("ref<T&,E&>: transform lvalue value and error paths", "[coverage][traced]") {
    int                  x = 4, err = 3;
    expected<int&, int&> ev(x);
    auto                 rv = ev.transform([](int& v) { return v + 1; });
    REQUIRE(rv.has_value());
    CHECK(*rv == 5);

    expected<int&, int&> ee(unexpect, err);
    auto                 re = ee.transform([](int&) { return 0; });
    REQUIRE(!re.has_value());
}

TEST_CASE("ref<T&,E&>: transform rvalue value path", "[coverage][traced]") {
    int                  x = 4;
    expected<int&, int&> e(x);
    auto                 r = std::move(e).transform([](int& v) { return v + 1; });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<T&,E&>: transform const rvalue value path", "[coverage][traced]") {
    int                        x = 4;
    const expected<int&, int&> e(x);
    auto                       r = std::move(e).transform([](int& v) { return v + 1; });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<T&,E&>: transform_error lvalue value and error paths", "[coverage][traced]") {
    int                  x = 5, err = 7;
    expected<int&, int&> ev(x);
    auto                 rv = ev.transform_error([](int&) { return 0; });
    REQUIRE(rv.has_value());

    expected<int&, int&> ee(unexpect, err);
    auto                 re = ee.transform_error([](int& v) { return v + 1; });
    REQUIRE(!re.has_value());
    CHECK(re.error() == 8);
}

TEST_CASE("ref<T&,E&>: transform_error rvalue value path", "[coverage][traced]") {
    int                  x = 5;
    expected<int&, int&> e(x);
    auto                 r = std::move(e).transform_error([](int&) { return 0; });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<T&,E&>: transform_error const rvalue value path", "[coverage][traced]") {
    int                        x = 5;
    const expected<int&, int&> e(x);
    auto                       r = std::move(e).transform_error([](int&) { return 0; });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<T&,E&>: equality both errors same value", "[coverage][traced]") {
    int                  e1 = 1, e2 = 1;
    expected<int&, int&> a(unexpect, e1);
    expected<int&, int&> b(unexpect, e2);
    CHECK(a == b);
}

// ---------------------------------------------------------------------------
// expected<void, E&>: lvalue monadic paths
// ---------------------------------------------------------------------------

TEST_CASE("ref<void,E&>: and_then lvalue error path", "[coverage][traced]") {
    int                  err = 5;
    expected<void, int&> e(unexpect, err);
    auto                 r = e.and_then([]() -> expected<void, int&> { return {}; });
    REQUIRE(!r.has_value());
}

TEST_CASE("ref<void,E&>: and_then const lvalue error path", "[coverage][traced]") {
    int                        err = 5;
    const expected<void, int&> e(unexpect, err);
    auto                       r = e.and_then([]() -> expected<void, int&> { return {}; });
    REQUIRE(!r.has_value());
}

TEST_CASE("ref<void,E&>: or_else lvalue value path", "[coverage][traced]") {
    expected<void, int&> e;
    auto                 r = e.or_else([](int&) -> expected<void, int&> { return {}; });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<void,E&>: or_else rvalue value path", "[coverage][traced]") {
    expected<void, int&> e;
    auto                 r = std::move(e).or_else([](int&) -> expected<void, int&> { return {}; });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<void,E&>: or_else const rvalue value path", "[coverage][traced]") {
    const expected<void, int&> e;
    auto                       r = std::move(e).or_else([](int&) -> expected<void, int&> { return {}; });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<void,E&>: transform lvalue value path", "[coverage][traced]") {
    expected<void, int&> e;
    auto                 r = e.transform([]() { return 42; });
    REQUIRE(r.has_value());
    CHECK(*r == 42);
}

TEST_CASE("ref<void,E&>: transform lvalue error path", "[coverage][traced]") {
    int                  err = 3;
    expected<void, int&> e(unexpect, err);
    auto                 r = e.transform([]() { return 0; });
    REQUIRE(!r.has_value());
}

TEST_CASE("ref<void,E&>: transform rvalue value path", "[coverage][traced]") {
    expected<void, int&> e;
    auto                 r = std::move(e).transform([]() { return 42; });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<void,E&>: transform const rvalue value path", "[coverage][traced]") {
    const expected<void, int&> e;
    auto                       r = std::move(e).transform([]() { return 42; });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<void,E&>: transform to void lvalue", "[coverage][traced]") {
    expected<void, int&> e;
    auto                 r = e.transform([]() {});
    REQUIRE(r.has_value());
}

TEST_CASE("ref<void,E&>: transform_error lvalue value path", "[coverage][traced]") {
    expected<void, int&> e;
    auto                 r = e.transform_error([](int&) { return 0; });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<void,E&>: transform_error rvalue value path", "[coverage][traced]") {
    expected<void, int&> e;
    auto                 r = std::move(e).transform_error([](int&) { return 0; });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<void,E&>: transform_error const rvalue value path", "[coverage][traced]") {
    const expected<void, int&> e;
    auto                       r = std::move(e).transform_error([](int&) { return 0; });
    REQUIRE(r.has_value());
}

TEST_CASE("ref<void,E&>: value() lvalue throws", "[coverage][traced]") {
    int                  err = 42;
    expected<void, int&> e(unexpect, err);
    CHECK_THROWS_AS(e.value(), expt::bad_expected_access<int>);
}

// ---------------------------------------------------------------------------
// Cross-type equality with eq_a / eq_b
// ---------------------------------------------------------------------------

TEST_CASE("cross-eq: expected<int,eq_a> == expected<int,eq_b>", "[coverage][cross_eq]") {
    expected<int, eq_a> a(unexpect, eq_a(1));
    expected<int, eq_b> b(unexpect, eq_b(1));
    CHECK(a == b);

    expected<int, eq_a> c(42);
    CHECK_FALSE(a == c);
}

// ---------------------------------------------------------------------------
// Constraint verification with derived types
// ---------------------------------------------------------------------------

TEST_CASE("constraint: from_expected is derived from expected", "[coverage][constraint]") {
    static_assert(std::is_base_of_v<expected<int, int>, from_expected>);
    from_expected fe(42);
    CHECK(fe.has_value());
    CHECK(*fe == 42);
}

TEST_CASE("constraint: from_unexpected is derived from unexpected", "[coverage][constraint]") {
    static_assert(std::is_base_of_v<unexpected<int>, from_unexpected>);
    from_unexpected fu(7);
    CHECK(fu.error() == 7);
}

// ---------------------------------------------------------------------------
// expected<expected<K,E>, E>: nested expected as value type
// ---------------------------------------------------------------------------

TEST_CASE("nested: expected<expected<int,int>, std::string> value construct", "[coverage][nested]") {
    expected<int, int>                        inner(42);
    expected<expected<int, int>, std::string> outer(inner);
    REQUIRE(outer.has_value());
    REQUIRE(outer->has_value());
    CHECK(**outer == 42);
}

TEST_CASE("nested: expected<expected<int,int>, std::string> error construct", "[coverage][nested]") {
    expected<expected<int, int>, std::string> outer(unexpect, "err");
    REQUIRE(!outer.has_value());
    CHECK(outer.error() == "err");
}

TEST_CASE("nested: expected<expected<int,int>, std::string> in_place value construct", "[coverage][nested]") {
    expected<expected<int, int>, std::string> outer(std::in_place, 99);
    REQUIRE(outer.has_value());
    REQUIRE(outer->has_value());
    CHECK(**outer == 99);
}

TEST_CASE("nested: expected<expected<int,int>, std::string> in_place error-inner", "[coverage][nested]") {
    expected<expected<int, int>, std::string> outer(std::in_place, unexpect, 7);
    REQUIRE(outer.has_value());
    REQUIRE(!outer->has_value());
    CHECK(outer->error() == 7);
}

TEST_CASE("nested: expected<expected<int,int>, int> copy construct value", "[coverage][nested]") {
    expected<expected<int, int>, int> a(expected<int, int>(5));
    expected<expected<int, int>, int> b(a);
    REQUIRE(b.has_value());
    CHECK(**b == 5);
}

TEST_CASE("nested: expected<expected<int,int>, int> move construct value", "[coverage][nested]") {
    expected<expected<int, int>, int> a(expected<int, int>(5));
    expected<expected<int, int>, int> b(std::move(a));
    REQUIRE(b.has_value());
    CHECK(**b == 5);
}

TEST_CASE("nested: expected<expected<int,int>, int> monadic and_then", "[coverage][nested]") {
    expected<expected<int, int>, int> e(expected<int, int>(5));
    auto r = e.and_then([](expected<int, int>& inner) -> expected<int, int> { return *inner * 2; });
    REQUIRE(r.has_value());
    CHECK(*r == 10);
}

// ---------------------------------------------------------------------------
// expected<T, unexpected<V>>: unexpected as error type
// ---------------------------------------------------------------------------

// Note: both expected<T, unexpected<V>> and expected<unexpected<V>, E> are
// ill-formed by Mandates. These are tested by the _fail.cpp negative tests.
// Instead, test with from_expected (derived from expected) as value type
// and from_unexpected (derived from unexpected) as error type — these are
// NOT specializations of expected/unexpected, so they bypass the Mandates
// while still exercising constructor disambiguation.

TEST_CASE("nested: expected<from_expected, std::string> holds expected-derived value", "[coverage][nested]") {
    expected<from_expected, std::string> e(std::in_place, 42);
    REQUIRE(e.has_value());
    CHECK(e->has_value());
    CHECK(**e == 42);
}

TEST_CASE("nested: expected<from_expected, std::string> error state", "[coverage][nested]") {
    expected<from_expected, std::string> e(unexpect, "err");
    REQUIRE(!e.has_value());
    CHECK(e.error() == "err");
}

TEST_CASE("nested: expected<from_expected, int> copy and move", "[coverage][nested]") {
    expected<from_expected, int> a(std::in_place, 5);
    expected<from_expected, int> b(a);
    REQUIRE(b.has_value());
    CHECK(**b == 5);

    expected<from_expected, int> c(std::move(a));
    REQUIRE(c.has_value());
    CHECK(**c == 5);
}
