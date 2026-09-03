# Test Project against installed `beman.expected`

To test from the root of the source tree

```sh
cmake --workflow --preset gcc-release
cmake --install build/gcc-release --prefix .install
cmake -S installtest -B installtest/build -DCMAKE_PREFIX_PATH="$PWD/.install"
cmake --build installtest/build --target test
```
