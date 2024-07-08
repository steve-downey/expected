add_library(base_project STATIC "")

target_sources(
  base_project
  PRIVATE
  example.cpp)

include(GNUInstallDirs)

target_include_directories(base_project PUBLIC
  $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/../..>
  $<INSTALL_INTERFACE:${CMAKE_INSTALL_INCLUDEDIR}/base/project/>
  )

install(
  TARGETS base_project
  EXPORT ${TARGETS_EXPORT_NAME}
  DESTINATION ${CMAKE_INSTALL_LIBDIR}
  )

string(TOLOWER ${CMAKE_PROJECT_NAME} CMAKE_LOWER_PROJECT_NAME)

install(
  DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/
  DESTINATION ${CMAKE_INSTALL_INCLUDEDIR}/base/project
  FILES_MATCHING PATTERN "*.hpp"
  )


## Tests
add_executable(base_project_test "")

target_sources(
  base_project_test
  PRIVATE
  example.t.cpp)

target_link_libraries(base_project_test base_project)
target_link_libraries(base_project_test gtest)
target_link_libraries(base_project_test gtest_main)

include(GoogleTest)
gtest_discover_tests(base_project_test)
