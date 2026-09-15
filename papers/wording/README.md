# Generated `[expected]` wording

Everything in this directory is generated from the `//!` docblocks in
`include/beman/expected/{unexpected,bad_expected_access,expected}.hpp` via
[specgen](https://github.com/steve-downey/specgen). Regenerate after editing a
header's docblocks with:

```sh
make wording
```

(equivalently: `papers/wording/generate.sh`, with `specgen` on `PATH`). Don't
hand-edit the files here; the header comments are the source of truth.

## `expected.tex`

All the generated subclauses concatenated in real standard order —
`[expected.unexpected]` (including the new `[expected.un.ref]`) through
`[expected.ref.eq]`. `generate.sh` passes `--base-section-depth 2`, so each
`\rSec` marker comes out at the level the draft writes it at:
`[expected.unexpected]` and its siblings are `\rSec2`, their subclauses
`\rSec3`, numbering `22.8.3`, `22.8.3.1`, ... This file is everything that
sits *inside* the existing `\rSec1[expected]{Expected objects}` in
[the draft](https://github.com/cplusplus/draft)'s `source/utilities.tex` — no
wrapper `\rSec1[expected]`, no `\input` directives — so it's the basis for a
patch there: replace the current `[expected.unexpected]` through
`[expected.void]` subclauses with this file's content and the new
`[expected.ref]` subclause lands after them, in place.

It does not include `[expected.general]` or `[expected.syn]`: those are prose
that doesn't come from any one declaration. See `papers/expected-new.tex` for
hand-authored versions of both.

## `fragments/`

The same content, split one file per top-level clause
(`unexpected.tex`, `bad.tex`, `bad-void.tex`, `object.tex`, `void.tex`,
`ref.tex`) — for `\input` into a standalone paper's own
`\rSec1[expected]{Expected objects}` (see `papers/expected-new.tex`), which is
the level `expected.tex` above assumes already exists.
