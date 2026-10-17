# cmake/clang-libstdc++-flags.cmake                                 -*-cmake-*-
# SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception

include_guard(GLOBAL)

# The clang flags, built against libstdc++ instead of libc++. CI's clang jobs
# run both standard libraries; the libc++-only local toolchains skip the
# std::expected equivalence gate, which is only built off libc++.
include("${CMAKE_CURRENT_LIST_DIR}/clang-flags.cmake")

set(CMAKE_CXX_FLAGS
    "-stdlib=libstdc++ -Wall -Wextra -std=gnu++20"
    CACHE STRING
    "CXX_FLAGS"
    FORCE
)
