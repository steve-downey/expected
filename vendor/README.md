# Vendored Dependencies

## googletest
Vendored in via `git subtree`

added via:
```sh
git subtree add --prefix=vendor/googletest https://github.com/google/googletest.git  main --squash
```

to update:
```sh`
git subtree pull --prefix=vendor/googletest https://github.com/google/googletest.git  main --squash
```
The squash option only pulls the current set of objects without their history.

[Handling Dependencies with Submodules and Subtrees - GitHub Cheatsheets](https://training.github.com/downloads/submodule-vs-subtree-cheat-sheet/ "Handling Dependencies with Submodules and Subtrees - GitHub Cheatsheets")
