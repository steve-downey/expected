# installtest/CMakeLists.txt                                        -*-CMake-*-
# SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception

cmake_minimum_required(VERSION 3.27)
project(TestInstalledExpected LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Enable testing in this separate project
enable_testing()

# Find the installed package
find_package(beman.expected REQUIRED)

# Add the test executable
add_executable(TestInstalledExpected test.cpp)

# Link against the imported target
target_link_libraries(TestInstalledExpected beman::expected)

# Register the test with CTest
add_test(NAME RunInstalledTest COMMAND TestInstalledExpected)

# Ensure 'make test' first builds the 'all' target
set(CMAKE_SKIP_TEST_ALL_DEPENDENCY FALSE)
