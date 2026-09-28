# cmake/gcc-flags.cmake                                       -*-cmake-*-
# SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception

include_guard(GLOBAL)

set(CMAKE_CXX_STANDARD 26)

set(CMAKE_CXX_FLAGS "-Wall -Wextra -std=gnu++26" CACHE STRING "CXX_FLAGS" FORCE)

set(CMAKE_CXX_FLAGS_DEBUG
    "-O0 -fno-inline -g3"
    CACHE STRING
    "C++ DEBUG Flags"
    FORCE
)
set(CMAKE_CXX_FLAGS_RELEASE
    "-Ofast -g0 -DNDEBUG"
    CACHE STRING
    "C++ Release Flags"
    FORCE
)
set(CMAKE_CXX_FLAGS_RELWITHDEBINFO
    "-O3 -g -DNDEBUG"
    CACHE STRING
    "C++ RelWithDebInfo Flags"
    FORCE
)
set(CMAKE_CXX_FLAGS_TSAN
    "-O3 -g -fsanitize=thread"
    CACHE STRING
    "C++ TSAN Flags"
    FORCE
)
# -Wno-maybe-uninitialized: under -fsanitize=address the use-after-scope
# markers keep gcc from forwarding a just-stored `has_val_` to the load that
# guards the read of the other union member, and gcc then reports that read
# as maybe-uninitialized (seen on gcc 14 through 16). Every instance is a
# false positive: the guard is exact. expected<void, E> avoids it at the
# source; expected<T&, E> cannot, because its value constructor stores a
# runtime address, so the flag stays. It lives here rather than in the
# per-version toolchains because it is not version-gated, and in the Asan
# flags only because the warning is worth having everywhere else.
set(CMAKE_CXX_FLAGS_ASAN
    "-O3 -g -fsanitize=address,undefined,leak -Wno-maybe-uninitialized"
    CACHE STRING
    "C++ ASAN Flags"
    FORCE
)

set(CMAKE_CXX_FLAGS_GCOV
    "-O0 -fno-default-inline -fno-inline -g --coverage -fprofile-abs-path"
    CACHE STRING
    "C++ GCOV Flags"
    FORCE
)

set(CMAKE_LINKER_FLAGS_GCOV "--coverage" CACHE STRING "Linker GCOV Flags" FORCE)
