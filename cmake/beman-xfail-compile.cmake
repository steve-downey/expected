# cmake/beman-xfail-compile.cmake                                   -*-CMake-*-
# SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception

include_guard(GLOBAL)

# beman_add_xfail_compile_test
# ============================
#
# Registers a negative compile test: a translation unit that must fail to
# compile, and must fail with a specific diagnostic.
#
# Usage:
# ------
#   beman_add_xfail_compile_test(<name>
#     SOURCE <file>
#     EXPECT <regex>
#     [LINK_LIBRARIES <target> ...]
#     [COMPILE_DEFINITIONS <definition> ...]
#     [TARGET_PREFIX <prefix>]
#     [LABELS <label> ...]
#   )
#
# Arguments:
# ----------
#
# name
#   The CTest test name.
#
# SOURCE (required)
#   The source file that must not compile.
#
# EXPECT (required)
#   A regular expression matched against the compiler output. The test
#   passes only when the output matches, which confirms the failure is the
#   intended static_assert, deleted overload, or constraint, and not an
#   unrelated build error. Alternations such as
#   "use of deleted function|call to deleted" cover compiler phrasings.
#
# LINK_LIBRARIES (optional)
#   Targets whose usage requirements the source is compiled with, typically
#   the library under test. Nothing is ever linked.
#
# COMPILE_DEFINITIONS (optional)
#   Extra preprocessor definitions for the source.
#
# TARGET_PREFIX (optional)
#   Prefix of the per-test CMake target. Defaults to "${PROJECT_NAME}.tests."
#   so beman.<lib> gets beman.<lib>.tests.<name>.
#
# LABELS (optional)
#   CTest labels to attach to the test.
#
# Brief
# -----
#
# The source becomes an OBJECT library that is excluded from the default
# build, so an ordinary build never compiles it and nothing links it. The
# test itself is a nested build of just that target, which compiles the
# source with exactly the toolchain, flags, launcher, and usage
# requirements the rest of the project gets. CTest then requires the
# build output to match EXPECT.

function(beman_add_xfail_compile_test name)
    set(oneValueArgs SOURCE EXPECT TARGET_PREFIX)
    set(multiValueArgs LINK_LIBRARIES COMPILE_DEFINITIONS LABELS)
    cmake_parse_arguments(
        BEMAN_XFAIL
        ""
        "${oneValueArgs}"
        "${multiValueArgs}"
        ${ARGN}
    )

    if(BEMAN_XFAIL_UNPARSED_ARGUMENTS)
        message(
            FATAL_ERROR
            "beman_add_xfail_compile_test(${name}): unexpected arguments '${BEMAN_XFAIL_UNPARSED_ARGUMENTS}'"
        )
    endif()
    if(NOT BEMAN_XFAIL_SOURCE)
        message(
            FATAL_ERROR
            "beman_add_xfail_compile_test(${name}): SOURCE must be specified"
        )
    endif()
    if(NOT BEMAN_XFAIL_EXPECT)
        message(
            FATAL_ERROR
            "beman_add_xfail_compile_test(${name}): EXPECT must be specified"
        )
    endif()
    if(NOT DEFINED BEMAN_XFAIL_TARGET_PREFIX)
        set(BEMAN_XFAIL_TARGET_PREFIX "${PROJECT_NAME}.tests.")
    endif()

    set(_target "${BEMAN_XFAIL_TARGET_PREFIX}${name}")

    add_library(${_target} OBJECT)
    target_sources(${_target} PRIVATE ${BEMAN_XFAIL_SOURCE})
    if(BEMAN_XFAIL_LINK_LIBRARIES)
        target_link_libraries(${_target} PRIVATE ${BEMAN_XFAIL_LINK_LIBRARIES})
    endif()
    if(BEMAN_XFAIL_COMPILE_DEFINITIONS)
        target_compile_definitions(
            ${_target}
            PRIVATE ${BEMAN_XFAIL_COMPILE_DEFINITIONS}
        )
    endif()
    set_target_properties(
        ${_target}
        PROPERTIES EXCLUDE_FROM_ALL true EXCLUDE_FROM_DEFAULT_BUILD true
    )

    add_test(
        NAME ${name}
        COMMAND
            ${CMAKE_COMMAND} --build "${CMAKE_BINARY_DIR}" --target ${_target}
            --config $<CONFIGURATION>
    )
    set_tests_properties(
        ${name}
        PROPERTIES PASS_REGULAR_EXPRESSION "${BEMAN_XFAIL_EXPECT}"
    )
    if(BEMAN_XFAIL_LABELS)
        set_tests_properties(${name} PROPERTIES LABELS "${BEMAN_XFAIL_LABELS}")
    endif()
endfunction()
