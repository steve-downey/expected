# Blog transclusion pins

Each post that transcludes live code is pinned to one annotated tag.
`#+transclude:` links resolve against that tag's tree, not against the
worktree, so a later refactor cannot rewrite the code inside an already
published entry. The transclusion machinery is the copy of `.emacs.d/` and the
`blog-md` Makefile target carried over from the `compile-time-scheme`
repository; see `.emacs.d/lisp/orgit-file-transclusion.el`.

## The mapping

| Post | Tag | Basis |
|---|---|---|
| `scrap-your-static_assert.org` | `blog/scrap-static-assert` | commit adding the UUID anchors and the post |

## Notes

`orgit-file:` links pin to a tag, so a pinned post's `.md.deps` names only its
own `.org` and not the transcluded sources — that is correct, not a bug to
repair. The code comes from an immutable tag, so there is no worktree
dependency to track; rebuilding the post when the working tree changes would be
the defect. The `file:`/`orgit:` dependency extraction in the Makefile stays
useful only for any living document that still resolves against the worktree.
