# Issues against D4280 — Expected Over References

Convention: matches the decision-log form — each issue is one **question**,
identified by a slug named for the question, never the proposed answer, so the
slug survives reversal and stays linkable. Entry shape: Question / Status /
Proposal / Why / Log. (Recorded here because GitHub issues are disabled on
this repository.)

---

## dangling-rejection-mechanism

**Question:** Does D3's deleted-overload mechanic generalize beyond types with
positional slots — and should D3 say so before `variant<T&>` is in front of
LEWG?

**Status:** OPEN

**Proposal:** Add one scoping sentence to D3. Its *principle* — a dangling
construction is ill-formed and says why; nothing dangles silently, nothing is
silently picked — generalizes. Its *mechanic* — declare the candidate and
delete it — does not: it is correct precisely because `expected` (like
`optional`, `tuple`, `pair`) has positional slots, so the deleted candidate
has no siblings to perturb. A type that *selects* an alternative by overload
resolution (`variant`'s imaginary FUN set) must instead remove the candidate
from the overload set and diagnose separately; a deleted candidate still
participates in overload resolution, so against an equal-rank sibling it
creates an ambiguity and suppresses its own message.

**Why:** Verified by a minimal overload probe (GCC 13.3, Clang 18.1):

- `variant<const long&, long>` from an `int` lvalue — the reference candidate
  binds a converted temporary. Deleted, it sits at the same conversion rank as
  `FUN(long)`: the call is **ambiguous**, the construction is ill-formed with a
  misleading diagnostic, the `= delete("...")` message never fires, and the
  correct owning alternative is blocked.
- `variant<const string&, string>` from a prvalue `string` — same shape:
  deleted gives "ambiguous"; constrained-out lets the owning alternative catch
  what cannot be borrowed.

The likely `variant<T&>` design is therefore constrained-out-of-FUN plus a
separately-defined deleted converting constructor (with a D10-style message)
for the case where no alternative is viable but some reference alternative
failed only the temporary check. Without the scoping sentence, the two papers
will appear to contradict each other on D3's "rather than silently dropping
the candidate" rationale when both are in front of LEWG.

**Log:**
- 2026-09-03 — Raised by the `variant<T&>` feasibility analysis; probe
  evidence recorded there under the same slug in the variant decision log
  (`dangling-rejection-mechanism`, with the fallthrough policy split out as
  `temporary-fallthrough`).
