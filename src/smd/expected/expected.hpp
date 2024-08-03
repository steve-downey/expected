// smd/expected/expected.hpp                                          -*-C++-*-
#ifndef SMD_EXPECTED_EXPECTED_HPP
#define SMD_EXPECTED_EXPECTED_HPP
#include <initializer_list>
#include <type_traits>
#include <utility>

// mostly freestanding
namespace smd::expected {
using std::is_void_v;
} // namespace smd::expected

namespace smd::expected {

// [expected.unexpected], class template unexpected
template <class E>
class unexpected;

// [expected.bad], class template bad_expected_access
template <class E>
class bad_expected_access;

// [expected.bad.void], specialization for void
template <>
class bad_expected_access<void>;

// in-place construction of unexpected values
struct unexpect_t {
    explicit unexpect_t() = default;
};
inline constexpr unexpect_t unexpect{};

// [expected.expected], class template expected
template <class T, class E>
class expected; // partially freestanding

// [expected.void], partial specialization of expected for void types
template <class T, class E>
    requires is_void_v<T>
class expected<T, E>; // partially freestanding
} // namespace smd::expected

namespace smd::expected {
using std::in_place_t;
using std::initializer_list;
using std::is_constructible_v;
using std::is_convertible_v;
using std::is_nothrow_swappable_v;
using std::is_same_v;
using std::is_swappable_v;
using std::remove_cvref_t;
} // namespace smd::expected

namespace smd::expected {
template <class E>
class unexpected {
  public:
    // [expected.un.cons], constructors
    constexpr unexpected(const unexpected&) = default;
    constexpr unexpected(unexpected&&)      = default;
    template <class Err = E>
    constexpr explicit unexpected(Err&&)
        requires(is_same_v<remove_cvref_t<Err>, unexpected>);
    template <class... Args>
    constexpr explicit unexpected(in_place_t, Args&&...)
        requires(is_constructible_v<E, Args...>);
    template <class U, class... Args>
    constexpr explicit unexpected(in_place_t, initializer_list<U>, Args&&...)
        requires(is_constructible_v<E, initializer_list<U>&, Args...>);

    constexpr unexpected& operator=(const unexpected&) = default;
    constexpr unexpected& operator=(unexpected&&)      = default;

    constexpr const E&  error() const& noexcept;
    constexpr E&        error() & noexcept;
    constexpr const E&& error() const&& noexcept;
    constexpr E&&       error() && noexcept;

    constexpr void swap(unexpected& other) noexcept(is_nothrow_swappable_v<E>);

    template <class E2>
    friend constexpr bool operator==(const unexpected&     x,
                                     const unexpected<E2>& y) {
        static_assert(
            is_convertible_v<decltype(x.error() == y.error()), bool>);
        return x.error() == y.error();
    }

    friend constexpr void swap(unexpected& x,
                               unexpected& y) noexcept(noexcept(x.swap(y)))
        requires(is_swappable_v<E>)
    {
        x.swap(y);
    }

  private:
    E unex; // exposition only
};

template <class E>
unexpected(E) -> unexpected<E>;
} // namespace smd::expected

template <class E>
template <class Err>
constexpr smd::expected::unexpected<E>::unexpected(Err&& e)
    requires(is_same_v<remove_cvref_t<Err>, unexpected>)
    : unex(e) {}

template <class E>
template <class... Args>
constexpr smd::expected::unexpected<E>::unexpected(in_place_t, Args&&... args)
    requires(is_constructible_v<E, Args...>)
    : unex(args...) {}

template <class E>
template <class U, class... Args>
constexpr smd::expected::unexpected<E>::unexpected(in_place_t,
                                                   initializer_list<U> u,
                                                   Args&&... args)
    requires(is_constructible_v<E, initializer_list<U>&, Args...>)
    : unex(u, args...) {}

template <class E>
constexpr const E& smd::expected::unexpected<E>::error() const& noexcept {
    return unex;
}
template <class E>
constexpr E& smd::expected::unexpected<E>::error() & noexcept {
    return unex;
}
template <class E>
constexpr const E&& smd::expected::unexpected<E>::error() const&& noexcept {
    return unex;
}
template <class E>
constexpr E&& smd::expected::unexpected<E>::error() && noexcept {
    return unex;
}

template <class E>
constexpr void smd::expected::unexpected<E>::swap(unexpected& other) noexcept(
    is_nothrow_swappable_v<E>) {
    static_assert(is_swappable_v<E>);
    using std::swap;
    swap(unex, other.unex);
}

#endif
