# beman.expected: Expected Over References

<!--
SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
-->

<!-- markdownlint-disable-next-line line-length -->
[![Library Status](https://raw.githubusercontent.com/bemanproject/beman/refs/heads/main/images/badges/beman_badge-beman_library_under_development.svg)](https://github.com/bemanproject/beman/blob/main/docs/beman_library_maturity_model.md#the-beman-library-maturity-model) ![Continuous Integration Tests](https://github.com/steve-downey/sandbox-expected/actions/workflows/ci_tests.yml/badge.svg) ![Lint Check (pre-commit)](https://github.com/steve-downey/sandbox-expected/actions/workflows/pre-commit-check.yml/badge.svg) [![Coverage](https://coveralls.io/repos/github/steve-downey/sandbox-expected/badge.svg?branch=main)](https://coveralls.io/github/steve-downey/sandbox-expected?branch=main) ![Standard Target](https://github.com/bemanproject/beman/blob/main/images/badges/cpp29.svg)

`beman.expected` is a C++ library implementing the std::expected specification conforming to [The Beman Standard](https://github.com/bemanproject/beman/blob/main/docs/beman_standard.md).

**Implements**: `std::expected` proposed in [Expected over References (D4280R0)](https://wg21.link/D4280R0).

**Status**: [Under development and not yet ready for production use.](https://github.com/bemanproject/beman/blob/main/docs/beman_library_maturity_model.md#under-development-and-not-yet-ready-for-production-use)

## Review Guides

As this implementation proposes extensions targeting standard library adoption (notably supporting reference semantics in `std::expected`), two rigorous review guides have been prepared:
- **[LLM Code Review Guide](docs/llm-code-review-guide.md)**: Specialized prompt instructions and strict standardese criteria for automated reviewers to mechanically verify C++26 constraints and mandates.
- **[Human Design Review Guide](docs/human-design-review-guide.md)**: An analytical guide for human contributors highlighting the compromises, architectural semantics (like assignment-through vs rebinding), and abstraction structures.  We encourage reviewers to read this guide before contributing to standard wording or feature requests.

## License

`beman.expected` is licensed under the Apache License v2.0 with LLVM Exceptions.

## Usage


Full runnable examples can be found in [`examples/`](examples/).

## Dependencies

### Build Environment

This project requires at least the following to build:

* A C++ compiler that conforms to the C++20 standard or greater
* CMake 3.30 or later
* (Test Only) Catch2

You can disable building tests by setting CMake option
[`BEMAN_EXPECTED_BUILD_TESTS`](#beman_expected_build_tests) to `OFF`
when configuring the project.

### Supported Platforms

This project officially supports:

* GCC versions 13–16
* LLVM Clang++ (with libstdc++ or libc++) versions 19–22
* AppleClang version 17.0.0 (i.e., the [latest version on GitHub-hosted macOS runners](https://github.com/actions/runner-images/blob/main/images/macos/macos-15-arm64-Readme.md))

> [!NOTE]
>
> Versions outside of this range would likely work as well,
> especially if you're using a version above the given range
> (e.g. HEAD/ nightly).

#### Compiler floor and unsupported toolchains

The reference specializations detect temporary-binding hazards with
`reference_constructs_from_temporary` — the C++23 library trait where available,
otherwise the `__reference_constructs_from_temporary` compiler builtin. That
builtin lands in **GCC 13** and **Clang 19**, which sets the floor:

* **GCC ≤ 12 / Clang ≤ 17** lack the builtin, so the trait is undefined in C++20
  mode.
* **Clang 18** has the builtin but rejects out-of-line definitions of constrained
  members whose `requires`-clause names the enclosing `expected<…>` type (or a
  member typedef) with a spelling that differs from the in-class declaration —
  GCC and Clang 19+ canonicalize these, Clang 18 does not.

**MSVC is not currently supported.** In C++23 the trait is available, but MSVC
applies the same out-of-line-definition constraint-matching strictness as Clang
18 (`C2244: unable to match function definition to an existing declaration`).
The fix is to make each such member's definition token-identical to its
declaration; that work is not done here simply because we do not have direct
MSVC access to develop and verify the workarounds. Contributions with MSVC
access are welcome.
> These development environments are verified using our CI configuration.

## Development

### Develop using GitHub Codespace

This project supports [GitHub Codespace](https://github.com/features/codespaces)
via [Development Containers](https://containers.dev/),
which allows rapid development and instant hacking in your browser.
We recommend using GitHub codespace to explore this project as it
requires minimal setup.

Click the following badge to create a codespace:

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/bemanproject/expected)

For more documentation on GitHub codespaces, please see
[this doc](https://docs.github.com/en/codespaces/).

> [!NOTE]
>
> The codespace container may take up to 5 minutes to build and spin-up; this is normal.

### Develop locally on your machines

<details>
<summary> For Linux </summary>

Beman libraries require [recent versions of CMake](#build-environment).
We recommend one of:
  - downloading CMake directly from [CMake's website](https://cmake.org/download/)
  - installing it with the [Kitware apt library](https://apt.kitware.com/).
  - installing for the project using [Astral's uv](https://docs.astral.sh/uv/) and PyPI.

A [supported compiler](#supported-platforms) should be available from your package manager.

</details>

<details>
<summary> For MacOS </summary>

Beman libraries require [recent versions of CMake](#build-environment).
Use [`Homebrew`](https://brew.sh/) to install the latest version of CMake.

```bash
brew install cmake
```

A [supported compiler](#supported-platforms) is also available from brew.

For example, you can install the latest major release of Clang as:

```bash
brew install llvm
```

</details>

<details>
<summary> For Windows </summary>

To build Beman libraries, you will need the MSVC compiler. MSVC can be obtained
by installing Visual Studio; the free Visual Studio 2022 Community Edition can
be downloaded from
[Microsoft](https://visualstudio.microsoft.com/vs/community/).

After Visual Studio has been installed, you can launch "Developer PowerShell for
VS 2022" by typing it into Windows search bar. This shell environment will
provide CMake, Ninja, and MSVC, allowing you to build the library and run the
tests.

</details>

### Configure and Build the Project Using CMake Presets

This project recommends using [CMake Presets](https://cmake.org/cmake/help/latest/manual/cmake-presets.7.html)
to configure, build and test the project.
Appropriate presets for major compilers have been included by default.
You can use `cmake --list-presets` to see all available presets.

Here is an example to invoke the `gcc-debug` preset.

```shell
cmake --workflow --preset gcc-debug
```

Generally, there are two kinds of presets, `debug` and `release`.

The `debug` presets are designed to aid development, so it has debugging
instrumentation enabled and many sanitizers enabled.

> [!NOTE]
>
> The sanitizers that are enabled vary from compiler to compiler.
> See the toolchain files under ([`cmake`](cmake/)) to determine the exact configuration used for each preset.

The `release` presets are designed for production use, and
consequently have the highest optimization turned on (e.g. `O3`).

### Configure and Build Manually

If the presets are not suitable for your use-case, a traditional CMake
invocation will provide more configurability.

To configure, build and test the project with extra arguments,
you can run this set of commands.

```bash
cmake \
  -B build \
  -S . \
  -DCMAKE_CXX_STANDARD=20 \
  -DCMAKE_PREFIX_PATH=$PWD/infra/cmake \
  # Your extra arguments here.
cmake --build build
ctest --test-dir build
```

> [!IMPORTANT]
>
> Beman projects are
> [passive projects](https://github.com/bemanproject/beman/blob/main/docs/beman_standard.md#cmake),
> therefore,
> you will need to specify the C++ version via `CMAKE_CXX_STANDARD`
> when manually configuring the project.

### Project specific configure arguments

Project-specific options are prefixed with `BEMAN_EXPECTED`.
You can see the list of available options with:

```bash
cmake -LH -S . -B build | grep "BEMAN_EXPECTED" -C 2
```

<details>

<summary> Details of CMake arguments. </summary>

#### `BEMAN_EXPECTED_BUILD_TESTS`

Enable building tests and test infrastructure. Default: ON.
Values: `{ ON, OFF }`.

You can configure the project to have this option turned off via:

```bash
cmake -B build -S . -DCMAKE_CXX_STANDARD=20 -DBEMAN_EXPECTED_BUILD_TESTS=OFF
```

> [!TIP]
> Disabling `BEMAN_EXPECTED_BUILD_TESTS` skips fetching Catch2.

#### `BEMAN_EXPECTED_BUILD_EXAMPLES`

Enable building examples. Default: ON. Values: { ON, OFF }.

#### `BEMAN_EXPECTED_INSTALL_CONFIG_FILE_PACKAGE`

Enable installing the CMake config file package. Default: ON.
Values: { ON, OFF }.

This is required so that users of `beman.expected` can use
`find_package(beman.expected)` to locate the library.

</details>

## Integrate beman.expected into your project

To use `beman.expected` in your C++ project,
include an appropriate `beman.expected` header from your source code.

```c++
#include <beman/expected/expected.hpp>
```

> [!NOTE]
>
> `beman.expected` headers are to be included with the `beman/expected/` prefix.
> Altering include search paths to spell the include target another way (e.g.
> `#include <identity.hpp>`) is unsupported.

The process for incorporating `beman.expected` into your project depends on the
build system being used. Instructions for CMake are provided in following sections.

### Incorporating `beman.expected` into your project with CMake

For CMake based projects,
you will need to use the `beman.expected` CMake module
to define the `beman::expected` CMake target:

```cmake
find_package(beman.expected REQUIRED)
```

You will also need to add `beman::expected` to the link libraries of
any libraries or executables that include `beman.expected` headers.

```cmake
target_link_libraries(yourlib PUBLIC beman::expected)
```

### Produce beman.expected interface library

You can produce expected's interface library locally by:

```bash
cmake --workflow --preset gcc-release
cmake --install build/gcc-release --prefix /opt/beman
```

This will generate the following directory structure at `/opt/beman`.

```txt
/opt/beman
├── include
│   └── beman
│       └── expected
│           ├── bad_expected_access.hpp
│           ├── expected.hpp
│           └── unexpected.hpp
└── lib
    └── cmake
        └── beman.expected
            ├── beman.expected-config.cmake
            ├── beman.expected-config-version.cmake
            └── beman.expected-targets.cmake```
