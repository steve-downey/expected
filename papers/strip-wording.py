#!/usr/bin/env python3
# SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
"""Strip working-draft change markup from a wording .tex file.

Turns the marked-up editable copy (expected-new.tex) into clean text
suitable for a pull request against the C++ working draft:

    \\added{X}              -> X
    \\removed{X}            -> (deleted)
    \\changed{X}{Y}         -> Y
    \\addednb{n}{X}         -> X
    \\removednb{n}{X}       -> (deleted)
    \\changednb{n}{X}{Y}    -> Y
    \\remitem{X}            -> (deleted)
    \\begin{addedblock}..\\end{addedblock}     -> unwrapped
    \\begin{addedcode}..\\end{addedcode}       -> unwrapped
    \\begin{removedblock}..\\end{removedblock} -> (deleted)
    \\begin{removedcode}..\\end{removedcode}   -> (deleted)

Brace matching is nesting-aware, so \\added{... {x} ...} is handled, as
are marks that span several lines. Any other control sequence is passed
through untouched.

Usage:
    strip-wording.py [INPUT] [-o OUTPUT]
        INPUT defaults to stdin, OUTPUT to stdout.
"""

import argparse
import re
import sys

_CTRLWORD = re.compile(r'\\([a-zA-Z]+)')


def read_group(s, i):
    """s[i] must be '{'. Return (inner_text, index_past_closing_brace)."""
    assert s[i] == '{'
    depth = 0
    start = i
    while i < len(s):
        c = s[i]
        if c == '\\':          # escaped char (\{ \} \\ \& ...): skip the pair
            i += 2
            continue
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                return s[start + 1:i], i + 1
        i += 1
    raise ValueError("unbalanced braces starting at offset %d" % start)


def _skip_ws(s, i):
    while i < len(s) and s[i] in ' \t':
        i += 1
    return i


def _groups(s, i, n):
    """Read n consecutive brace groups starting at s[i] (whitespace allowed
    between them). Return (list_of_inner_texts, index_past_last) or None if
    the n groups are not all present."""
    texts = []
    for _ in range(n):
        i = _skip_ws(s, i)
        if i >= len(s) or s[i] != '{':
            return None
        inner, i = read_group(s, i)
        texts.append(inner)
    return texts, i


# name -> (arity, index of the group to keep, or None to delete)
_MARKS = {
    'added':     (1, 0),
    'removed':   (1, None),
    'changed':   (2, 1),
    'addednb':   (2, 1),
    'removednb': (2, None),
    'changednb': (3, 2),
    'remitem':   (1, None),
}


def strip_inline(s):
    out = []
    i, n = 0, len(s)
    while i < n:
        c = s[i]
        if c != '\\':
            out.append(c)
            i += 1
            continue
        m = _CTRLWORD.match(s, i)
        if not m:                       # backslash + non-letter, e.g. \& \{ \\
            out.append(s[i:i + 2])
            i += 2
            continue
        name = m.group(1)
        after = m.end()
        spec = _MARKS.get(name)
        if spec is not None:
            arity, keep = spec
            got = _groups(s, after, arity)
            if got is not None:
                texts, end = got
                if keep is not None:
                    out.append(strip_inline(texts[keep]))
                i = end
                continue
        # not a change mark (or not followed by its groups): emit verbatim
        out.append(s[i:after])
        i = after
    return ''.join(out)


def strip_environments(s):
    # Remove deleted blocks entirely.
    s = re.sub(r'\\begin\{removedblock\}.*?\\end\{removedblock\}[ \t]*\n?',
               '', s, flags=re.DOTALL)
    s = re.sub(r'\\begin\{removedcode\}.*?\\end\{removedcode\}[ \t]*\n?',
               '', s, flags=re.DOTALL)
    # Unwrap added blocks: drop just the begin/end markers.
    for env in ('addedblock', 'addedcode'):
        s = re.sub(r'[ \t]*\\begin\{%s\}[ \t]*\n?' % env, '', s)
        s = re.sub(r'[ \t]*\\end\{%s\}[ \t]*\n?' % env, '', s)
    return s


def strip(text):
    return strip_inline(strip_environments(text))


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('input', nargs='?', help='input .tex (default: stdin)')
    ap.add_argument('-o', '--output', help='output file (default: stdout)')
    args = ap.parse_args()

    text = (open(args.input, encoding='utf-8').read()
            if args.input else sys.stdin.read())
    result = strip(text)
    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(result)
    else:
        sys.stdout.write(result)


if __name__ == '__main__':
    main()
