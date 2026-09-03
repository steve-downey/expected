# cmake/gcc-16-toolchain.cmake                                -*-cmake-*-
# SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception

include_guard(GLOBAL)

include("${CMAKE_CURRENT_LIST_DIR}/gcc-flags.cmake")

set(CMAKE_C_COMPILER gcc-16)
set(CMAKE_CXX_COMPILER g++-16)
set(GCOV_EXECUTABLE "gcov-16" CACHE STRING "GCOV executable" FORCE)

set(CMAKE_CXX_FLAGS_ASAN
    "${CMAKE_CXX_FLAGS_ASAN} -Wno-maybe-uninitialized"
    CACHE STRING
    "C++ ASAN Flags"
    FORCE
)

# Reflection (P2996). This belongs here rather than in gcc-flags.cmake, which
# is shared with gcc-12 through gcc-15: -freflection is a gcc-16 feature, and
# gcc rejects it outright below -std=c++26 rather than warning. gcc-flags.cmake
# already pins -std=gnu++26, so the requirement is met.
#
# Enabling it selects the reflection implementation of
# tests/beman/expected/testing/type_name.hpp, which is otherwise dormant.
set(CMAKE_CXX_FLAGS
    "${CMAKE_CXX_FLAGS} -freflection"
    CACHE STRING
    "CXX_FLAGS"
    FORCE
)
