# examples/CMakeLists.txt                                           -*-cmake-*-
# SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception

include(GNUInstallDirs)

# List of all buildable examples.
set(EXAMPLES example1)

foreach(example ${EXAMPLES})
  # Add example executable.
  add_executable(${example} "")

  # Add example source file.
  target_sources(${example} PRIVATE ${example}.cpp)

  # Link example with the library.
  target_link_libraries(${example} expected)

  # Install .
  install(
    TARGETS ${example}
    EXPORT ${TARGETS_EXPORT_NAME}
    DESTINATION ${CMAKE_INSTALL_BINDIR})
endforeach()
