add_library(expected STATIC "")

target_sources(expected PRIVATE expected.cpp)

include(GNUInstallDirs)

target_include_directories(
  expected
  PUBLIC $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/../..>
         $<INSTALL_INTERFACE:${CMAKE_INSTALL_INCLUDEDIR}/smd/expected/>)

install(
  TARGETS expected
  EXPORT ${TARGETS_EXPORT_NAME}
  DESTINATION ${CMAKE_INSTALL_LIBDIR})

string(TOLOWER ${CMAKE_PROJECT_NAME} CMAKE_LOWER_PROJECT_NAME)

install(
  DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/
  DESTINATION ${CMAKE_INSTALL_INCLUDEDIR}/smd/expected
  FILES_MATCHING
  PATTERN "*.hpp")

# Tests
add_executable(smd_expected_test "")

target_sources(smd_expected_test PRIVATE expected.t.cpp)

target_link_libraries(smd_expected_test expected)
target_link_libraries(smd_expected_test gtest)
target_link_libraries(smd_expected_test gtest_main)

include(GoogleTest)
gtest_discover_tests(smd_expected_test)
