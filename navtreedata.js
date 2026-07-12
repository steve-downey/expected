/*
 @licstart  The following is the entire license notice for the JavaScript code in this file.

 The MIT License (MIT)

 Copyright (C) 1997-2020 by Dimitri van Heesch

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 and associated documentation files (the "Software"), to deal in the Software without restriction,
 including without limitation the rights to use, copy, modify, merge, publish, distribute,
 sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or
 substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 @licend  The above is the entire license notice for the JavaScript code in this file
*/
var NAVTREE =
[
  [ "beman::expected", "index.html", [
    [ "Conformance Audit: beman::expected vs std::expected (C++26)", "md_docs_conformance_audit.html", [
      [ "1. unexpected<E> [expected.unexpected]", "md_docs_conformance_audit.html#autotoc_md2", [
        [ "1.1 Static assertions [expected.un.general] para 2", "md_docs_conformance_audit.html#autotoc_md3", null ],
        [ "1.2 Constructors [expected.un.cons]", "md_docs_conformance_audit.html#autotoc_md4", null ],
        [ "1.3 Observers [expected.un.obs]", "md_docs_conformance_audit.html#autotoc_md5", null ],
        [ "1.4 Swap [expected.un.swap]", "md_docs_conformance_audit.html#autotoc_md6", null ],
        [ "1.5 Equality operator [expected.un.eq]", "md_docs_conformance_audit.html#autotoc_md7", null ],
        [ "1.6 CTAD", "md_docs_conformance_audit.html#autotoc_md8", null ]
      ] ],
      [ "2. bad_expected_access<void> [expected.bad.void]", "md_docs_conformance_audit.html#autotoc_md10", null ],
      [ "3. bad_expected_access<E> [expected.bad]", "md_docs_conformance_audit.html#autotoc_md12", null ],
      [ "4. expected<T, E> Primary Template [expected.expected]", "md_docs_conformance_audit.html#autotoc_md14", [
        [ "4.1 Type aliases and rebind", "md_docs_conformance_audit.html#autotoc_md15", null ],
        [ "4.2 Static assertions [expected.object.general] para 2-3", "md_docs_conformance_audit.html#autotoc_md16", null ],
        [ "4.3 Constructors [expected.object.cons]", "md_docs_conformance_audit.html#autotoc_md17", [
          [ "Default constructor", "md_docs_conformance_audit.html#autotoc_md18", null ],
          [ "Copy constructor", "md_docs_conformance_audit.html#autotoc_md19", null ],
          [ "Move constructor", "md_docs_conformance_audit.html#autotoc_md20", null ],
          [ "Converting constructors from expected<U, G>", "md_docs_conformance_audit.html#autotoc_md21", null ],
          [ "Value constructor <tt>expected(U&& v)</tt>", "md_docs_conformance_audit.html#autotoc_md22", null ],
          [ "unexpected<G> constructors", "md_docs_conformance_audit.html#autotoc_md23", null ],
          [ "in_place_t constructors", "md_docs_conformance_audit.html#autotoc_md24", null ],
          [ "unexpect_t constructors", "md_docs_conformance_audit.html#autotoc_md25", null ]
        ] ],
        [ "4.4 Destructor [expected.object.dtor]", "md_docs_conformance_audit.html#autotoc_md26", null ],
        [ "4.5 Assignment [expected.object.assign]", "md_docs_conformance_audit.html#autotoc_md27", [
          [ "Copy assignment", "md_docs_conformance_audit.html#autotoc_md28", null ],
          [ "Move assignment", "md_docs_conformance_audit.html#autotoc_md29", null ],
          [ "Value assignment <tt>operator=(U&&)</tt>", "md_docs_conformance_audit.html#autotoc_md30", null ],
          [ "unexpected<G> assignment", "md_docs_conformance_audit.html#autotoc_md31", null ],
          [ "emplace", "md_docs_conformance_audit.html#autotoc_md32", null ]
        ] ],
        [ "4.6 Swap [expected.object.swap]", "md_docs_conformance_audit.html#autotoc_md33", null ],
        [ "4.7 Observers [expected.object.obs]", "md_docs_conformance_audit.html#autotoc_md34", [
          [ "operator->", "md_docs_conformance_audit.html#autotoc_md35", null ],
          [ "operator*", "md_docs_conformance_audit.html#autotoc_md36", null ],
          [ "operator bool / has_value()", "md_docs_conformance_audit.html#autotoc_md37", null ],
          [ "value()", "md_docs_conformance_audit.html#autotoc_md38", null ],
          [ "error()", "md_docs_conformance_audit.html#autotoc_md39", null ],
          [ "value_or()", "md_docs_conformance_audit.html#autotoc_md40", null ],
          [ "error_or()", "md_docs_conformance_audit.html#autotoc_md41", null ]
        ] ],
        [ "4.8 Monadic operations [expected.object.monadic]", "md_docs_conformance_audit.html#autotoc_md42", [
          [ "and_then (all 4 overloads)", "md_docs_conformance_audit.html#autotoc_md43", null ],
          [ "or_else (all 4 overloads)", "md_docs_conformance_audit.html#autotoc_md44", null ],
          [ "transform (all 4 overloads)", "md_docs_conformance_audit.html#autotoc_md45", null ],
          [ "transform_error (all 4 overloads)", "md_docs_conformance_audit.html#autotoc_md46", null ]
        ] ],
        [ "4.9 Equality operators [expected.object.eq]", "md_docs_conformance_audit.html#autotoc_md47", [
          [ "operator==(expected, expected<T2, E2>)", "md_docs_conformance_audit.html#autotoc_md48", null ],
          [ "operator==(expected, T2)", "md_docs_conformance_audit.html#autotoc_md49", null ],
          [ "operator==(expected, unexpected<E2>)", "md_docs_conformance_audit.html#autotoc_md50", null ]
        ] ]
      ] ],
      [ "5. expected<void, E> Specialization [expected.void]", "md_docs_conformance_audit.html#autotoc_md52", [
        [ "5.1 Static assertions", "md_docs_conformance_audit.html#autotoc_md53", null ],
        [ "5.2 Constructors [expected.void.cons]", "md_docs_conformance_audit.html#autotoc_md54", null ],
        [ "5.3 Destructor [expected.void.dtor]", "md_docs_conformance_audit.html#autotoc_md55", null ],
        [ "5.4 Assignment [expected.void.assign]", "md_docs_conformance_audit.html#autotoc_md56", null ],
        [ "5.5 Swap [expected.void.swap]", "md_docs_conformance_audit.html#autotoc_md57", null ],
        [ "5.6 Observers [expected.void.obs]", "md_docs_conformance_audit.html#autotoc_md58", null ],
        [ "5.7 Monadic operations [expected.void.monadic]", "md_docs_conformance_audit.html#autotoc_md59", [
          [ "and_then", "md_docs_conformance_audit.html#autotoc_md60", null ],
          [ "or_else", "md_docs_conformance_audit.html#autotoc_md61", null ],
          [ "transform", "md_docs_conformance_audit.html#autotoc_md62", null ],
          [ "transform_error", "md_docs_conformance_audit.html#autotoc_md63", null ]
        ] ],
        [ "5.8 Equality operators [expected.void.eq]", "md_docs_conformance_audit.html#autotoc_md64", null ]
      ] ],
      [ "Summary", "md_docs_conformance_audit.html#autotoc_md66", [
        [ "Extensions (not in standard, kept as conforming)", "md_docs_conformance_audit.html#autotoc_md67", null ]
      ] ]
    ] ],
    [ "Fix 1: Constructor, Assignment, and Equality Constraints", "md_docs_conformance_fixes_fix1_constraints.html", [
      [ "Goal", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md70", null ],
      [ "Changes", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md71", [
        [ "1. Add <tt>converts_from_any_cvref</tt> helper", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md72", null ],
        [ "2. Fix converting constructors from expected<U, G>", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md73", null ],
        [ "3. Fix value constructor <tt>expected(U&&)</tt> constraints", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md74", null ],
        [ "4. Fix value assignment <tt>operator=(U&&)</tt>", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md75", null ],
        [ "5. Fix move assignment constraint", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md76", null ],
        [ "6. Fix <tt>operator==(const expected&, const T2&)</tt>", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md77", null ]
      ] ],
      [ "Tests", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md78", [
        [ "New tests (beman-only target — these test constraint behavior)", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md79", null ],
        [ "Negative compile tests", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md80", null ],
        [ "Existing tests", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md81", null ]
      ] ],
      [ "Verification", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md82", null ],
      [ "Handoff", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md83", null ]
    ] ],
    [ "Fix 2: Trivial Special Member Functions", "md_docs_conformance_fixes_fix2_trivial_smfs.html", [
      [ "Goal", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md86", null ],
      [ "Background", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md87", null ],
      [ "Changes", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md88", [
        [ "Primary template: trivial copy constructor", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md89", null ],
        [ "Primary template: trivial move constructor", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md90", null ],
        [ "Primary template: trivial copy assignment", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md91", null ],
        [ "Primary template: trivial move assignment", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md92", null ],
        [ "Void specialization: trivial copy assignment", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md93", null ],
        [ "Void specialization: trivial move assignment", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md94", null ]
      ] ],
      [ "Tests", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md95", null ],
      [ "Verification", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md96", null ],
      [ "Handoff", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md97", null ]
    ] ],
    [ "Fix 3: Monadic Operation Constraints", "md_docs_conformance_fixes_fix3_monadic_constraints.html", [
      [ "Goal", "md_docs_conformance_fixes_fix3_monadic_constraints.html#autotoc_md100", null ],
      [ "Which operations need constraints", "md_docs_conformance_fixes_fix3_monadic_constraints.html#autotoc_md101", [
        [ "Primary template <tt>expected<T, E></tt>", "md_docs_conformance_fixes_fix3_monadic_constraints.html#autotoc_md102", null ],
        [ "Void specialization <tt>expected<void, E></tt>", "md_docs_conformance_fixes_fix3_monadic_constraints.html#autotoc_md103", null ]
      ] ],
      [ "Implementation", "md_docs_conformance_fixes_fix3_monadic_constraints.html#autotoc_md104", null ],
      [ "Tests", "md_docs_conformance_fixes_fix3_monadic_constraints.html#autotoc_md105", null ],
      [ "Verification", "md_docs_conformance_fixes_fix3_monadic_constraints.html#autotoc_md106", null ],
      [ "Handoff", "md_docs_conformance_fixes_fix3_monadic_constraints.html#autotoc_md107", null ]
    ] ],
    [ "Fix 4: Mandates static_asserts", "md_docs_conformance_fixes_fix4_mandates.html", [
      [ "Goal", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md110", null ],
      [ "Changes", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md111", [
        [ "1. Primary template static_assert: T not a specialization of unexpected", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md112", null ],
        [ "2. value() Mandates — primary template", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md113", null ],
        [ "3. value() Mandates — void specialization", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md114", null ],
        [ "4. value_or() Mandates — primary template", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md115", null ],
        [ "5. error_or() Mandates — both primary and void", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md116", null ],
        [ "6. transform() Mandates — both primary and void", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md117", null ],
        [ "7. transform_error() Mandates — both primary and void", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md118", null ]
      ] ],
      [ "Tests", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md119", null ],
      [ "Verification", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md120", null ],
      [ "Handoff", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md121", null ]
    ] ],
    [ "Fix 5: Hardened Preconditions and Minor Fixes", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html", [
      [ "Goal", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md124", null ],
      [ "Changes", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md125", [
        [ "1. Hardened preconditions (<tt>include/beman/expected/expected.hpp</tt>)", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md126", null ],
        [ "2. unexpected friend swap constraint (<tt>include/beman/expected/unexpected.hpp</tt>)", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md127", null ],
        [ "3. Void specialization <tt>or_else</tt>: use <tt>is_same_v</tt> not <tt>is_void_v</tt>", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md128", null ],
        [ "4. Void specialization <tt>transform_error</tt>: use <tt>expected<T, G></tt> not <tt>expected<void, G></tt>", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md129", null ]
      ] ],
      [ "Tests", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md130", [
        [ "Hardened precondition tests", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md131", null ],
        [ "unexpected swap constraint test", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md132", null ],
        [ "or_else / transform_error minor fix tests", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md133", null ]
      ] ],
      [ "Verification", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md134", null ],
      [ "Handoff", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md135", null ]
    ] ],
    [ "Plan: Conformance Fixes for expected<T, E> and expected<void, E>", "md_docs_conformance_fixes_index.html", [
      [ "Motivation", "md_docs_conformance_fixes_index.html#autotoc_md137", null ],
      [ "Reference Materials", "md_docs_conformance_fixes_index.html#autotoc_md138", null ],
      [ "Phase Overview", "md_docs_conformance_fixes_index.html#autotoc_md139", null ],
      [ "Standing Conventions", "md_docs_conformance_fixes_index.html#autotoc_md140", [
        [ "std cross-check rule", "md_docs_conformance_fixes_index.html#autotoc_md141", null ]
      ] ],
      [ "Step Details", "md_docs_conformance_fixes_index.html#autotoc_md142", null ],
      [ "Checklist", "md_docs_conformance_fixes_index.html#autotoc_md143", null ],
      [ "After All Fixes", "md_docs_conformance_fixes_index.html#autotoc_md144", null ]
    ] ],
    [ "Instructions for Fix Steps", "md_docs_conformance_fixes_instructions.html", [
      [ "Prompt", "md_docs_conformance_fixes_instructions.html#autotoc_md147", null ]
    ] ],
    [ "Human Design Review Guide: <tt>beman::expected</tt>", "md_docs_human_design_review_guide.html", [
      [ "What This Is", "md_docs_human_design_review_guide.html#autotoc_md149", null ],
      [ "Decision 1: Six Separate Specializations, Zero Abstraction", "md_docs_human_design_review_guide.html#autotoc_md151", [
        [ "What was done", "md_docs_human_design_review_guide.html#autotoc_md152", null ],
        [ "Why this matters", "md_docs_human_design_review_guide.html#autotoc_md153", null ],
        [ "The argument for the current approach", "md_docs_human_design_review_guide.html#autotoc_md154", null ],
        [ "The argument against", "md_docs_human_design_review_guide.html#autotoc_md155", null ],
        [ "What to decide", "md_docs_human_design_review_guide.html#autotoc_md156", null ]
      ] ],
      [ "Decision 2: Rebind Semantics (Not Assign-Through)", "md_docs_human_design_review_guide.html#autotoc_md158", [
        [ "What was done", "md_docs_human_design_review_guide.html#autotoc_md159", null ],
        [ "Why this is the only defensible choice", "md_docs_human_design_review_guide.html#autotoc_md160", null ],
        [ "What to discuss anyway", "md_docs_human_design_review_guide.html#autotoc_md161", null ]
      ] ],
      [ "Decision 3: Shallow Const", "md_docs_human_design_review_guide.html#autotoc_md163", [
        [ "What was done", "md_docs_human_design_review_guide.html#autotoc_md164", null ],
        [ "Why", "md_docs_human_design_review_guide.html#autotoc_md165", null ],
        [ "What to discuss", "md_docs_human_design_review_guide.html#autotoc_md166", null ]
      ] ],
      [ "Decision 4: <tt>unexpected<G></tt> Construction for <tt>E&</tt> Specializations — Allowed Only When <tt>G</tt> Is a Reference", "md_docs_human_design_review_guide.html#autotoc_md168", [
        [ "What was done", "md_docs_human_design_review_guide.html#autotoc_md169", null ],
        [ "Why", "md_docs_human_design_review_guide.html#autotoc_md170", null ],
        [ "What to discuss", "md_docs_human_design_review_guide.html#autotoc_md171", null ]
      ] ],
      [ "Decision 5: Dangling Prevention via <tt>reference_constructs_from_temporary_v</tt>", "md_docs_human_design_review_guide.html#autotoc_md173", [
        [ "What was done", "md_docs_human_design_review_guide.html#autotoc_md174", null ],
        [ "The subtlety", "md_docs_human_design_review_guide.html#autotoc_md175", null ],
        [ "What to discuss", "md_docs_human_design_review_guide.html#autotoc_md176", null ]
      ] ],
      [ "Decision 6: <tt>= delete(\"message\")</tt> as a Diagnostic Strategy", "md_docs_human_design_review_guide.html#autotoc_md178", [
        [ "What was done", "md_docs_human_design_review_guide.html#autotoc_md179", null ],
        [ "What to discuss", "md_docs_human_design_review_guide.html#autotoc_md180", null ]
      ] ],
      [ "Decision 7: <tt>value_or</tt> Deleted for <tt>expected<void, E&></tt>", "md_docs_human_design_review_guide.html#autotoc_md182", [
        [ "What was done", "md_docs_human_design_review_guide.html#autotoc_md183", null ],
        [ "What to discuss", "md_docs_human_design_review_guide.html#autotoc_md184", null ]
      ] ],
      [ "Decision 8: Monadic Operations on Reference Specializations", "md_docs_human_design_review_guide.html#autotoc_md186", [
        [ "What was done", "md_docs_human_design_review_guide.html#autotoc_md187", null ],
        [ "What to discuss", "md_docs_human_design_review_guide.html#autotoc_md188", null ]
      ] ],
      [ "Decision 9: Test Architecture", "md_docs_human_design_review_guide.html#autotoc_md190", [
        [ "What exists", "md_docs_human_design_review_guide.html#autotoc_md191", null ],
        [ "Gaps to discuss", "md_docs_human_design_review_guide.html#autotoc_md192", null ],
        [ "What to decide", "md_docs_human_design_review_guide.html#autotoc_md193", null ]
      ] ],
      [ "Decision 10: Single Header vs Multi-Header", "md_docs_human_design_review_guide.html#autotoc_md195", [
        [ "What exists", "md_docs_human_design_review_guide.html#autotoc_md196", null ],
        [ "What to discuss", "md_docs_human_design_review_guide.html#autotoc_md197", null ]
      ] ],
      [ "Decision 11: Shallow Conversions Must Not Steal — the Move-Then-Deref Idiom", "md_docs_human_design_review_guide.html#autotoc_md199", [
        [ "What was done", "md_docs_human_design_review_guide.html#autotoc_md200", null ],
        [ "Why this matters", "md_docs_human_design_review_guide.html#autotoc_md201", null ],
        [ "What to discuss / watch in review", "md_docs_human_design_review_guide.html#autotoc_md202", null ]
      ] ],
      [ "How to Approach Your Review", "md_docs_human_design_review_guide.html#autotoc_md204", null ],
      [ "References & Citations", "md_docs_human_design_review_guide.html#autotoc_md206", null ]
    ] ],
    [ "LLM Code Review Guide: <tt>beman::expected</tt>", "md_docs_llm_code_review_guide.html", [
      [ "Mission", "md_docs_llm_code_review_guide.html#autotoc_md208", null ],
      [ "Specification Sources (Authoritative, In-Repo)", "md_docs_llm_code_review_guide.html#autotoc_md210", [
        [ "What You Have No Normative Source For", "md_docs_llm_code_review_guide.html#autotoc_md211", null ]
      ] ],
      [ "Review Protocol", "md_docs_llm_code_review_guide.html#autotoc_md213", [
        [ "Phase 1: Structural Inventory", "md_docs_llm_code_review_guide.html#autotoc_md214", null ],
        [ "Phase 2: Clause-by-Clause for Primary and Void", "md_docs_llm_code_review_guide.html#autotoc_md215", [
          [ "Constraints vs Mandates", "md_docs_llm_code_review_guide.html#autotoc_md216", null ],
          [ "Explicit Conditions", "md_docs_llm_code_review_guide.html#autotoc_md217", null ],
          [ "noexcept Specifications", "md_docs_llm_code_review_guide.html#autotoc_md218", null ]
        ] ],
        [ "Phase 3: Reference Specialization Consistency", "md_docs_llm_code_review_guide.html#autotoc_md219", [
          [ "1. API Surface Parity", "md_docs_llm_code_review_guide.html#autotoc_md220", null ],
          [ "2. Dangling Prevention", "md_docs_llm_code_review_guide.html#autotoc_md221", null ],
          [ "3. Storage Layout", "md_docs_llm_code_review_guide.html#autotoc_md222", null ],
          [ "4. Monadic Value Categories", "md_docs_llm_code_review_guide.html#autotoc_md223", null ]
        ] ],
        [ "Phase 4: Cross-Cutting Checks", "md_docs_llm_code_review_guide.html#autotoc_md224", [
          [ "constexpr Correctness", "md_docs_llm_code_review_guide.html#autotoc_md225", null ],
          [ "Trivial Special Member Functions", "md_docs_llm_code_review_guide.html#autotoc_md226", null ],
          [ "Hardened Preconditions", "md_docs_llm_code_review_guide.html#autotoc_md227", null ],
          [ "Value Category in Converting Operations (deref-then-move anti-pattern)", "md_docs_llm_code_review_guide.html#autotoc_md228", null ]
        ] ]
      ] ],
      [ "Known Issues to Confirm or Refute", "md_docs_llm_code_review_guide.html#autotoc_md230", null ],
      [ "Output Format", "md_docs_llm_code_review_guide.html#autotoc_md232", null ]
    ] ],
    [ "Changes Since Last Version", "md_docs_optional_references.html", [
      [ "Comparison table", "md_docs_optional_references.html#autotoc_md234", [
        [ "Using a raw pointer result for an element search function", "md_docs_optional_references.html#autotoc_md235", null ],
        [ "returning result of an element search function via a (smart) pointer", "md_docs_optional_references.html#autotoc_md236", null ],
        [ "returning result of an element search function via an iterator", "md_docs_optional_references.html#autotoc_md237", null ],
        [ "Using an optional<T*> as a substitute for optional<T&>", "md_docs_optional_references.html#autotoc_md238", null ]
      ] ],
      [ "Motivation", "md_docs_optional_references.html#autotoc_md239", null ],
      [ "Design", "md_docs_optional_references.html#autotoc_md240", [
        [ "Relational Operations", "md_docs_optional_references.html#autotoc_md241", null ],
        [ "make_optional", "md_docs_optional_references.html#autotoc_md242", null ],
        [ "Trivial construction", "md_docs_optional_references.html#autotoc_md243", null ],
        [ "Value Category Affects value()", "md_docs_optional_references.html#autotoc_md244", null ],
        [ "Shallow vs Deep const", "md_docs_optional_references.html#autotoc_md245", null ],
        [ "Conditional Explicit", "md_docs_optional_references.html#autotoc_md246", null ],
        [ "value_or", "md_docs_optional_references.html#autotoc_md247", null ],
        [ "in_place_t construction", "md_docs_optional_references.html#autotoc_md248", null ],
        [ "Converting assignment", "md_docs_optional_references.html#autotoc_md249", null ],
        [ "Compiler Explorer Playground", "md_docs_optional_references.html#autotoc_md250", null ]
      ] ],
      [ "Principles for Reification of Design", "md_docs_optional_references.html#autotoc_md251", [
        [ "Construction from temporary", "md_docs_optional_references.html#autotoc_md252", null ],
        [ "Deleting dangling overloads", "md_docs_optional_references.html#autotoc_md253", null ],
        [ "Assignment of optional<T&>", "md_docs_optional_references.html#autotoc_md254", null ],
        [ "Copy and Assignment of optional<U&>&& to optional<T>", "md_docs_optional_references.html#autotoc_md255", null ]
      ] ],
      [ "Proposal", "md_docs_optional_references.html#autotoc_md256", null ],
      [ "Wording", "md_docs_optional_references.html#autotoc_md257", null ],
      [ "Impact on the standard", "md_docs_optional_references.html#autotoc_md258", null ],
      [ "Acknowledgments", "md_docs_optional_references.html#autotoc_md259", null ],
      [ "Document history", "md_docs_optional_references.html#autotoc_md260", null ],
      [ "Implementation", "md_docs_optional_references.html#autotoc_md261", null ]
    ] ],
    [ "Fix: PR #57 Review Corrections", "md_docs_plan_fix_review_corrections.html", [
      [ "Goal", "md_docs_plan_fix_review_corrections.html#autotoc_md264", null ],
      [ "Changes", "md_docs_plan_fix_review_corrections.html#autotoc_md265", [
        [ "expected.hpp", "md_docs_plan_fix_review_corrections.html#autotoc_md266", null ],
        [ "New test files", "md_docs_plan_fix_review_corrections.html#autotoc_md267", null ],
        [ "CMakeLists.txt", "md_docs_plan_fix_review_corrections.html#autotoc_md268", null ]
      ] ],
      [ "Verification", "md_docs_plan_fix_review_corrections.html#autotoc_md269", null ]
    ] ],
    [ "Handoff: After Step 7 (expected<T&, E> Complete)", "md_docs_plan_handoff_next.html", [
      [ "What Was Done", "md_docs_plan_handoff_next.html#autotoc_md271", [
        [ "Changes in Step 7", "md_docs_plan_handoff_next.html#autotoc_md272", null ],
        [ "Test count", "md_docs_plan_handoff_next.html#autotoc_md273", null ]
      ] ],
      [ "Build Commands", "md_docs_plan_handoff_next.html#autotoc_md274", null ],
      [ "Step 7 Checklist", "md_docs_plan_handoff_next.html#autotoc_md275", null ],
      [ "What Comes Next", "md_docs_plan_handoff_next.html#autotoc_md276", [
        [ "Key differences from Step 7", "md_docs_plan_handoff_next.html#autotoc_md277", null ]
      ] ],
      [ "Upstream Merge (2026-06-02)", "md_docs_plan_handoff_next.html#autotoc_md278", null ]
    ] ],
    [ "Handoff: Current State", "md_docs_plan_handoff.html", [
      [ "Repository", "md_docs_plan_handoff.html#autotoc_md280", null ],
      [ "Working Branch", "md_docs_plan_handoff.html#autotoc_md281", null ],
      [ "Current State", "md_docs_plan_handoff.html#autotoc_md282", [
        [ "Key Files", "md_docs_plan_handoff.html#autotoc_md283", null ],
        [ "Step 10 Design Notes", "md_docs_plan_handoff.html#autotoc_md284", null ],
        [ "Build System", "md_docs_plan_handoff.html#autotoc_md285", null ],
        [ "Coding Rules", "md_docs_plan_handoff.html#autotoc_md286", null ],
        [ "Reference Implementation", "md_docs_plan_handoff.html#autotoc_md287", null ]
      ] ],
      [ "Plan", "md_docs_plan_handoff.html#autotoc_md288", null ],
      [ "What Comes Next", "md_docs_plan_handoff.html#autotoc_md289", null ]
    ] ],
    [ "Plan: Implement expected<T&, E> and expected<T, E&> Reference Specializations", "md_docs_plan_index.html", [
      [ "Proposal", "md_docs_plan_index.html#autotoc_md291", null ],
      [ "Reference Materials", "md_docs_plan_index.html#autotoc_md292", null ],
      [ "Phase Overview", "md_docs_plan_index.html#autotoc_md293", null ],
      [ "Standing Conventions", "md_docs_plan_index.html#autotoc_md294", [
        [ "Code", "md_docs_plan_index.html#autotoc_md295", null ],
        [ "Testing", "md_docs_plan_index.html#autotoc_md296", null ]
      ] ],
      [ "Step Details", "md_docs_plan_index.html#autotoc_md297", null ],
      [ "Checklist", "md_docs_plan_index.html#autotoc_md298", null ]
    ] ],
    [ "Step 1: Implement unexpected<E>", "md_docs_plan_step1_unexpected.html", [
      [ "Goal", "md_docs_plan_step1_unexpected.html#autotoc_md301", null ],
      [ "Context for Executing Agent", "md_docs_plan_step1_unexpected.html#autotoc_md302", [
        [ "Key files", "md_docs_plan_step1_unexpected.html#autotoc_md303", null ],
        [ "Standard reference", "md_docs_plan_step1_unexpected.html#autotoc_md304", null ],
        [ "Constraints on the converting constructor", "md_docs_plan_step1_unexpected.html#autotoc_md305", null ],
        [ "Constraints on E", "md_docs_plan_step1_unexpected.html#autotoc_md306", null ]
      ] ],
      [ "Deliverables", "md_docs_plan_step1_unexpected.html#autotoc_md307", null ],
      [ "Procedure", "md_docs_plan_step1_unexpected.html#autotoc_md308", null ],
      [ "Verification", "md_docs_plan_step1_unexpected.html#autotoc_md309", null ],
      [ "Handoff to Step 2", "md_docs_plan_step1_unexpected.html#autotoc_md310", null ]
    ] ],
    [ "Step 10: Implement expected<void, E&> Specialization", "md_docs_plan_step10_expected_void_ref_e.html", [
      [ "Goal", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md313", null ],
      [ "Context for Executing Agent", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md314", [
        [ "Storage model", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md315", null ],
        [ "Key properties", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md316", null ],
        [ "Constructors", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md317", null ],
        [ "Assignment", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md318", null ],
        [ "Observers", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md319", null ],
        [ "Monadic operations", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md320", null ]
      ] ],
      [ "Deliverables", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md321", null ],
      [ "Procedure", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md322", null ],
      [ "Verification", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md323", null ],
      [ "Completion", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md324", null ]
    ] ],
    [ "Step 2: Implement bad_expected_access", "md_docs_plan_step2_bad_expected_access.html", [
      [ "Goal", "md_docs_plan_step2_bad_expected_access.html#autotoc_md327", null ],
      [ "Context for Executing Agent", "md_docs_plan_step2_bad_expected_access.html#autotoc_md328", [
        [ "Key files", "md_docs_plan_step2_bad_expected_access.html#autotoc_md329", null ],
        [ "Standard reference", "md_docs_plan_step2_bad_expected_access.html#autotoc_md330", null ],
        [ "Notes", "md_docs_plan_step2_bad_expected_access.html#autotoc_md331", null ]
      ] ],
      [ "Deliverables", "md_docs_plan_step2_bad_expected_access.html#autotoc_md332", null ],
      [ "Procedure", "md_docs_plan_step2_bad_expected_access.html#autotoc_md333", null ],
      [ "Verification", "md_docs_plan_step2_bad_expected_access.html#autotoc_md334", null ],
      [ "Handoff to Step 3", "md_docs_plan_step2_bad_expected_access.html#autotoc_md335", null ]
    ] ],
    [ "Step 3: Implement expected<T, E> Primary Template", "md_docs_plan_step3_expected_primary.html", [
      [ "Goal", "md_docs_plan_step3_expected_primary.html#autotoc_md338", null ],
      [ "Context for Executing Agent", "md_docs_plan_step3_expected_primary.html#autotoc_md339", [
        [ "Key files", "md_docs_plan_step3_expected_primary.html#autotoc_md340", null ],
        [ "Standard reference (non-monadic subset)", "md_docs_plan_step3_expected_primary.html#autotoc_md341", null ],
        [ "Storage", "md_docs_plan_step3_expected_primary.html#autotoc_md342", null ],
        [ "Constraints", "md_docs_plan_step3_expected_primary.html#autotoc_md343", null ],
        [ "Exception safety in assignment", "md_docs_plan_step3_expected_primary.html#autotoc_md344", null ]
      ] ],
      [ "Deliverables", "md_docs_plan_step3_expected_primary.html#autotoc_md345", null ],
      [ "Procedure", "md_docs_plan_step3_expected_primary.html#autotoc_md346", null ],
      [ "Verification", "md_docs_plan_step3_expected_primary.html#autotoc_md347", null ],
      [ "Handoff to Step 4", "md_docs_plan_step3_expected_primary.html#autotoc_md348", null ]
    ] ],
    [ "Step 4: Implement expected<void, E> Specialization", "md_docs_plan_step4_expected_void.html", [
      [ "Goal", "md_docs_plan_step4_expected_void.html#autotoc_md351", null ],
      [ "Context for Executing Agent", "md_docs_plan_step4_expected_void.html#autotoc_md352", [
        [ "Key differences from primary template", "md_docs_plan_step4_expected_void.html#autotoc_md353", null ],
        [ "Constructors [expected.void.cons]", "md_docs_plan_step4_expected_void.html#autotoc_md354", null ],
        [ "Storage", "md_docs_plan_step4_expected_void.html#autotoc_md355", null ]
      ] ],
      [ "Deliverables", "md_docs_plan_step4_expected_void.html#autotoc_md356", null ],
      [ "Procedure", "md_docs_plan_step4_expected_void.html#autotoc_md357", null ],
      [ "Verification", "md_docs_plan_step4_expected_void.html#autotoc_md358", null ],
      [ "Handoff to Step 5", "md_docs_plan_step4_expected_void.html#autotoc_md359", null ]
    ] ],
    [ "Step 5: Monadic Operations for expected<T, E>", "md_docs_plan_step5_expected_primary_monadic.html", [
      [ "Goal", "md_docs_plan_step5_expected_primary_monadic.html#autotoc_md362", null ],
      [ "Context for Executing Agent", "md_docs_plan_step5_expected_primary_monadic.html#autotoc_md363", [
        [ "Monadic operations overview", "md_docs_plan_step5_expected_primary_monadic.html#autotoc_md364", null ],
        [ "Key constraints per [expected.object.monadic]", "md_docs_plan_step5_expected_primary_monadic.html#autotoc_md365", null ],
        [ "Ref-qualification pattern", "md_docs_plan_step5_expected_primary_monadic.html#autotoc_md366", null ]
      ] ],
      [ "Deliverables", "md_docs_plan_step5_expected_primary_monadic.html#autotoc_md367", null ],
      [ "Procedure", "md_docs_plan_step5_expected_primary_monadic.html#autotoc_md368", null ],
      [ "Verification", "md_docs_plan_step5_expected_primary_monadic.html#autotoc_md369", null ],
      [ "Handoff to Step 6", "md_docs_plan_step5_expected_primary_monadic.html#autotoc_md370", null ]
    ] ],
    [ "Step 6: Monadic Operations for expected<void, E>", "md_docs_plan_step6_expected_void_monadic.html", [
      [ "Goal", "md_docs_plan_step6_expected_void_monadic.html#autotoc_md373", null ],
      [ "Context for Executing Agent", "md_docs_plan_step6_expected_void_monadic.html#autotoc_md374", [
        [ "Differences from primary template monadic ops", "md_docs_plan_step6_expected_void_monadic.html#autotoc_md375", null ],
        [ "Constraints per [expected.void.monadic]", "md_docs_plan_step6_expected_void_monadic.html#autotoc_md376", null ]
      ] ],
      [ "Deliverables", "md_docs_plan_step6_expected_void_monadic.html#autotoc_md377", null ],
      [ "Procedure", "md_docs_plan_step6_expected_void_monadic.html#autotoc_md378", null ],
      [ "Verification", "md_docs_plan_step6_expected_void_monadic.html#autotoc_md379", null ],
      [ "Handoff to Step 7", "md_docs_plan_step6_expected_void_monadic.html#autotoc_md380", null ]
    ] ],
    [ "Step 7: Implement expected<T&, E> Reference Specialization", "md_docs_plan_step7_expected_ref_t.html", [
      [ "Goal", "md_docs_plan_step7_expected_ref_t.html#autotoc_md383", null ],
      [ "Context for Executing Agent", "md_docs_plan_step7_expected_ref_t.html#autotoc_md384", [
        [ "Design principles (from optional<T&>)", "md_docs_plan_step7_expected_ref_t.html#autotoc_md385", null ],
        [ "Storage model", "md_docs_plan_step7_expected_ref_t.html#autotoc_md386", null ],
        [ "Reference binding helper", "md_docs_plan_step7_expected_ref_t.html#autotoc_md387", null ],
        [ "Constructors", "md_docs_plan_step7_expected_ref_t.html#autotoc_md388", null ],
        [ "Assignment (rebind semantics)", "md_docs_plan_step7_expected_ref_t.html#autotoc_md389", null ],
        [ "Observers", "md_docs_plan_step7_expected_ref_t.html#autotoc_md390", null ],
        [ "Monadic operations", "md_docs_plan_step7_expected_ref_t.html#autotoc_md391", null ],
        [ "reference_constructs_from_temporary_v", "md_docs_plan_step7_expected_ref_t.html#autotoc_md392", null ]
      ] ],
      [ "Deliverables", "md_docs_plan_step7_expected_ref_t.html#autotoc_md393", null ],
      [ "Procedure", "md_docs_plan_step7_expected_ref_t.html#autotoc_md394", null ],
      [ "Verification", "md_docs_plan_step7_expected_ref_t.html#autotoc_md395", null ],
      [ "Handoff to Step 8", "md_docs_plan_step7_expected_ref_t.html#autotoc_md396", null ]
    ] ],
    [ "Step 8: Implement expected<T, E&> Error-Reference Specialization", "md_docs_plan_step8_expected_ref_e.html", [
      [ "Goal", "md_docs_plan_step8_expected_ref_e.html#autotoc_md399", null ],
      [ "Context for Executing Agent", "md_docs_plan_step8_expected_ref_e.html#autotoc_md400", [
        [ "Storage model", "md_docs_plan_step8_expected_ref_e.html#autotoc_md401", null ],
        [ "Design principles", "md_docs_plan_step8_expected_ref_e.html#autotoc_md402", null ],
        [ "Constructors", "md_docs_plan_step8_expected_ref_e.html#autotoc_md403", null ],
        [ "Assignment (rebind on error side)", "md_docs_plan_step8_expected_ref_e.html#autotoc_md404", null ],
        [ "Observers", "md_docs_plan_step8_expected_ref_e.html#autotoc_md405", null ],
        [ "Monadic operations", "md_docs_plan_step8_expected_ref_e.html#autotoc_md406", null ]
      ] ],
      [ "Deliverables", "md_docs_plan_step8_expected_ref_e.html#autotoc_md407", null ],
      [ "Procedure", "md_docs_plan_step8_expected_ref_e.html#autotoc_md408", null ],
      [ "Verification", "md_docs_plan_step8_expected_ref_e.html#autotoc_md409", null ],
      [ "Handoff to Step 9", "md_docs_plan_step8_expected_ref_e.html#autotoc_md410", null ]
    ] ],
    [ "Step 9: Implement expected<T&, E&> Both-Reference Specialization", "md_docs_plan_step9_expected_ref_both.html", [
      [ "Goal", "md_docs_plan_step9_expected_ref_both.html#autotoc_md413", null ],
      [ "Context for Executing Agent", "md_docs_plan_step9_expected_ref_both.html#autotoc_md414", [
        [ "Storage model", "md_docs_plan_step9_expected_ref_both.html#autotoc_md415", null ],
        [ "Key properties", "md_docs_plan_step9_expected_ref_both.html#autotoc_md416", null ],
        [ "Constructors", "md_docs_plan_step9_expected_ref_both.html#autotoc_md417", null ],
        [ "Assignment", "md_docs_plan_step9_expected_ref_both.html#autotoc_md418", null ],
        [ "Observers", "md_docs_plan_step9_expected_ref_both.html#autotoc_md419", null ],
        [ "Monadic operations", "md_docs_plan_step9_expected_ref_both.html#autotoc_md420", null ]
      ] ],
      [ "Deliverables", "md_docs_plan_step9_expected_ref_both.html#autotoc_md421", null ],
      [ "Procedure", "md_docs_plan_step9_expected_ref_both.html#autotoc_md422", null ],
      [ "Verification", "md_docs_plan_step9_expected_ref_both.html#autotoc_md423", null ],
      [ "Handoff to Step 10", "md_docs_plan_step9_expected_ref_both.html#autotoc_md424", null ]
    ] ],
    [ "Test Plan Overview — beman::expected", "md_docs_plan_tests_overview.html", [
      [ "Test Framework", "md_docs_plan_tests_overview.html#autotoc_md427", null ],
      [ "Standard Testing Conventions", "md_docs_plan_tests_overview.html#autotoc_md429", [
        [ "1. Header idempotence", "md_docs_plan_tests_overview.html#autotoc_md430", null ],
        [ "2. Three tiers of negative testing", "md_docs_plan_tests_overview.html#autotoc_md431", null ],
        [ "3. Negative compile test pattern", "md_docs_plan_tests_overview.html#autotoc_md432", [
          [ "Source file format", "md_docs_plan_tests_overview.html#autotoc_md433", null ],
          [ "CMakeLists pattern", "md_docs_plan_tests_overview.html#autotoc_md434", null ]
        ] ],
        [ "4. Type-trait / static_assert tests", "md_docs_plan_tests_overview.html#autotoc_md435", null ],
        [ "5. Hardened precondition tests", "md_docs_plan_tests_overview.html#autotoc_md436", null ]
      ] ],
      [ "Files per Step", "md_docs_plan_tests_overview.html#autotoc_md438", [
        [ "6. Constraint and mandate coverage requirement", "md_docs_plan_tests_overview.html#autotoc_md439", [
          [ "How to cover each kind:", "md_docs_plan_tests_overview.html#autotoc_md440", null ],
          [ "What to cover for each step:", "md_docs_plan_tests_overview.html#autotoc_md441", null ],
          [ "Naming convention:", "md_docs_plan_tests_overview.html#autotoc_md442", null ]
        ] ]
      ] ],
      [ "Standard Reference Summary", "md_docs_plan_tests_overview.html#autotoc_md444", null ],
      [ "CMakeLists Structure", "md_docs_plan_tests_overview.html#autotoc_md446", null ]
    ] ],
    [ "Test Plan: Step 1 — unexpected<E>", "md_docs_plan_tests_step1.html", [
      [ "Testing Strategy", "md_docs_plan_tests_step1.html#autotoc_md449", null ],
      [ "Testable Statements from the Standard", "md_docs_plan_tests_step1.html#autotoc_md451", [
        [ "[expected.un.general] para 2 — ill-formed instantiations", "md_docs_plan_tests_step1.html#autotoc_md452", null ],
        [ "[expected.un.cons] — constructors", "md_docs_plan_tests_step1.html#autotoc_md453", null ],
        [ "[expected.un.obs] — observers", "md_docs_plan_tests_step1.html#autotoc_md454", null ],
        [ "[expected.un.swap] — swap", "md_docs_plan_tests_step1.html#autotoc_md455", null ],
        [ "[expected.un.eq] — equality", "md_docs_plan_tests_step1.html#autotoc_md456", null ]
      ] ],
      [ "Test Outline", "md_docs_plan_tests_step1.html#autotoc_md458", [
        [ "Normal (positive) tests", "md_docs_plan_tests_step1.html#autotoc_md459", null ],
        [ "Constraint / type-trait tests (in normal test file)", "md_docs_plan_tests_step1.html#autotoc_md460", null ]
      ] ],
      [ "Negative Compile Tests", "md_docs_plan_tests_step1.html#autotoc_md462", [
        [ "<tt>unexpected_array_fail.cpp</tt>", "md_docs_plan_tests_step1.html#autotoc_md463", null ],
        [ "<tt>unexpected_cvref_fail.cpp</tt>", "md_docs_plan_tests_step1.html#autotoc_md464", null ],
        [ "<tt>unexpected_self_fail.cpp</tt>", "md_docs_plan_tests_step1.html#autotoc_md465", null ],
        [ "<tt>unexpected_swap_nonswappable_fail.cpp</tt>", "md_docs_plan_tests_step1.html#autotoc_md466", null ]
      ] ],
      [ "CMakeLists additions", "md_docs_plan_tests_step1.html#autotoc_md468", null ]
    ] ],
    [ "Test Plan: Step 10 — expected<void, E&> Void+Error-Reference Specialization", "md_docs_plan_tests_step10.html", [
      [ "Testing Strategy", "md_docs_plan_tests_step10.html#autotoc_md471", null ],
      [ "Type-Level Tests (static_assert)", "md_docs_plan_tests_step10.html#autotoc_md473", null ],
      [ "Test Outline", "md_docs_plan_tests_step10.html#autotoc_md475", null ],
      [ "Negative Compile Tests", "md_docs_plan_tests_step10.html#autotoc_md477", [
        [ "<tt>expected_void_ref_e_temporary_fail.cpp</tt>", "md_docs_plan_tests_step10.html#autotoc_md478", null ],
        [ "<tt>expected_void_ref_e_const_lvalue_fail.cpp</tt>", "md_docs_plan_tests_step10.html#autotoc_md479", null ],
        [ "<tt>expected_void_ref_e_no_value_or_fail.cpp</tt>", "md_docs_plan_tests_step10.html#autotoc_md480", null ]
      ] ],
      [ "CMakeLists additions", "md_docs_plan_tests_step10.html#autotoc_md482", null ]
    ] ],
    [ "Test Plan: Step 2 — bad_expected_access<E>", "md_docs_plan_tests_step2.html", [
      [ "Testing Strategy", "md_docs_plan_tests_step2.html#autotoc_md485", null ],
      [ "Testable Statements from the Standard", "md_docs_plan_tests_step2.html#autotoc_md487", [
        [ "[expected.bad.void] — base specialization", "md_docs_plan_tests_step2.html#autotoc_md488", null ],
        [ "[expected.bad] — primary template", "md_docs_plan_tests_step2.html#autotoc_md489", null ]
      ] ],
      [ "Test Outline", "md_docs_plan_tests_step2.html#autotoc_md491", null ],
      [ "Return value conventions", "md_docs_plan_tests_step2.html#autotoc_md493", null ],
      [ "No negative compile tests", "md_docs_plan_tests_step2.html#autotoc_md495", null ]
    ] ],
    [ "Test Plan: Step 3 — expected<T, E> Primary Template", "md_docs_plan_tests_step3.html", [
      [ "Testing Strategy", "md_docs_plan_tests_step3.html#autotoc_md498", null ],
      [ "Ill-Formed Instantiations [expected.object.general] para 2–3", "md_docs_plan_tests_step3.html#autotoc_md500", null ],
      [ "Constructors [expected.object.cons]", "md_docs_plan_tests_step3.html#autotoc_md502", [
        [ "Default constructor", "md_docs_plan_tests_step3.html#autotoc_md503", null ],
        [ "Copy constructor", "md_docs_plan_tests_step3.html#autotoc_md504", null ],
        [ "Move constructor", "md_docs_plan_tests_step3.html#autotoc_md505", null ],
        [ "Converting constructor from expected<U, G>", "md_docs_plan_tests_step3.html#autotoc_md506", null ],
        [ "Converting constructor from value U&&", "md_docs_plan_tests_step3.html#autotoc_md507", null ],
        [ "Constructors from unexpected<G>", "md_docs_plan_tests_step3.html#autotoc_md508", null ],
        [ "In-place constructors", "md_docs_plan_tests_step3.html#autotoc_md509", null ]
      ] ],
      [ "Destructor [expected.object.dtor]", "md_docs_plan_tests_step3.html#autotoc_md511", null ],
      [ "Assignment [expected.object.assign]", "md_docs_plan_tests_step3.html#autotoc_md513", [
        [ "Copy assignment", "md_docs_plan_tests_step3.html#autotoc_md514", null ],
        [ "Move assignment", "md_docs_plan_tests_step3.html#autotoc_md515", null ],
        [ "Assign from value U&&", "md_docs_plan_tests_step3.html#autotoc_md516", null ],
        [ "Assign from unexpected<G>", "md_docs_plan_tests_step3.html#autotoc_md517", null ]
      ] ],
      [ "Emplace [expected.object.assign] para 18–21", "md_docs_plan_tests_step3.html#autotoc_md519", null ],
      [ "Swap [expected.object.swap]", "md_docs_plan_tests_step3.html#autotoc_md521", null ],
      [ "Observers [expected.object.obs]", "md_docs_plan_tests_step3.html#autotoc_md523", [
        [ "operator->() — Hardened precondition: has_value()", "md_docs_plan_tests_step3.html#autotoc_md524", null ],
        [ "operator*() — Hardened precondition: has_value()", "md_docs_plan_tests_step3.html#autotoc_md525", null ],
        [ "has_value() / operator bool()", "md_docs_plan_tests_step3.html#autotoc_md526", null ],
        [ "value() — throws bad_expected_access when empty", "md_docs_plan_tests_step3.html#autotoc_md527", null ],
        [ "error() — Hardened precondition: !has_value()", "md_docs_plan_tests_step3.html#autotoc_md528", null ],
        [ "value_or()", "md_docs_plan_tests_step3.html#autotoc_md529", null ],
        [ "error_or()", "md_docs_plan_tests_step3.html#autotoc_md530", null ]
      ] ],
      [ "Equality Operators [expected.object.eq]", "md_docs_plan_tests_step3.html#autotoc_md532", [
        [ "expected == expected (T2 not void)", "md_docs_plan_tests_step3.html#autotoc_md533", null ],
        [ "expected == T2 (comparison with value)", "md_docs_plan_tests_step3.html#autotoc_md534", null ],
        [ "expected == unexpected<E2>", "md_docs_plan_tests_step3.html#autotoc_md535", null ]
      ] ],
      [ "Negative Compile Tests", "md_docs_plan_tests_step3.html#autotoc_md537", [
        [ "<tt>expected_t_ref_fail.cpp</tt>", "md_docs_plan_tests_step3.html#autotoc_md538", null ],
        [ "<tt>expected_e_ref_fail.cpp</tt>", "md_docs_plan_tests_step3.html#autotoc_md539", null ],
        [ "<tt>expected_t_array_fail.cpp</tt>", "md_docs_plan_tests_step3.html#autotoc_md540", null ],
        [ "<tt>expected_value_mandate_fail.cpp</tt>", "md_docs_plan_tests_step3.html#autotoc_md541", null ],
        [ "<tt>expected_emplace_throwing_fail.cpp</tt>", "md_docs_plan_tests_step3.html#autotoc_md542", null ]
      ] ]
    ] ],
    [ "Test Plan: Step 4 — expected<void, E> Specialization", "md_docs_plan_tests_step4.html", [
      [ "Testing Strategy", "md_docs_plan_tests_step4.html#autotoc_md545", null ],
      [ "Ill-Formed Instantiations [expected.void.general] para 2", "md_docs_plan_tests_step4.html#autotoc_md547", null ],
      [ "Constructors [expected.void.cons]", "md_docs_plan_tests_step4.html#autotoc_md549", [
        [ "Default constructor", "md_docs_plan_tests_step4.html#autotoc_md550", null ],
        [ "Copy constructor", "md_docs_plan_tests_step4.html#autotoc_md551", null ],
        [ "Move constructor", "md_docs_plan_tests_step4.html#autotoc_md552", null ],
        [ "Converting constructor from expected<U, G> (void case)", "md_docs_plan_tests_step4.html#autotoc_md553", null ],
        [ "Constructors from unexpected<G>", "md_docs_plan_tests_step4.html#autotoc_md554", null ],
        [ "in_place_t constructor", "md_docs_plan_tests_step4.html#autotoc_md555", null ],
        [ "unexpect_t constructors", "md_docs_plan_tests_step4.html#autotoc_md556", null ]
      ] ],
      [ "Destructor [expected.void.dtor]", "md_docs_plan_tests_step4.html#autotoc_md558", null ],
      [ "Assignment [expected.void.assign]", "md_docs_plan_tests_step4.html#autotoc_md560", [
        [ "Copy assignment", "md_docs_plan_tests_step4.html#autotoc_md561", null ],
        [ "Move assignment", "md_docs_plan_tests_step4.html#autotoc_md562", null ],
        [ "Assign from unexpected<G>", "md_docs_plan_tests_step4.html#autotoc_md563", null ],
        [ "emplace()", "md_docs_plan_tests_step4.html#autotoc_md564", null ]
      ] ],
      [ "Swap [expected.void.swap]", "md_docs_plan_tests_step4.html#autotoc_md566", null ],
      [ "Observers [expected.void.obs]", "md_docs_plan_tests_step4.html#autotoc_md568", [
        [ "operator bool() / has_value()", "md_docs_plan_tests_step4.html#autotoc_md569", null ],
        [ "operator*() — void, noexcept, Hardened precondition: has_value()", "md_docs_plan_tests_step4.html#autotoc_md570", null ],
        [ "value() — returns void, throws when empty", "md_docs_plan_tests_step4.html#autotoc_md571", null ],
        [ "error() — Hardened precondition: !has_value()", "md_docs_plan_tests_step4.html#autotoc_md572", null ],
        [ "error_or()", "md_docs_plan_tests_step4.html#autotoc_md573", null ]
      ] ],
      [ "Equality Operators [expected.void.eq]", "md_docs_plan_tests_step4.html#autotoc_md575", [
        [ "expected<void> == expected<void, E2>", "md_docs_plan_tests_step4.html#autotoc_md576", null ],
        [ "expected<void> == unexpected<E2>", "md_docs_plan_tests_step4.html#autotoc_md577", null ]
      ] ],
      [ "No-value members (confirm absence)", "md_docs_plan_tests_step4.html#autotoc_md579", null ]
    ] ],
    [ "Test Plan: Step 5 — Monadic Operations for expected<T, E>", "md_docs_plan_tests_step5.html", [
      [ "Testing Strategy", "md_docs_plan_tests_step5.html#autotoc_md582", null ],
      [ "and_then [expected.object.monadic] para 1–8", "md_docs_plan_tests_step5.html#autotoc_md584", [
        [ "<tt>and_then(F)</tt> — lvalue and const-lvalue overloads (para 1–4)", "md_docs_plan_tests_step5.html#autotoc_md585", null ],
        [ "<tt>and_then(F)</tt> — rvalue and const-rvalue overloads (para 5–8)", "md_docs_plan_tests_step5.html#autotoc_md586", null ]
      ] ],
      [ "or_else [expected.object.monadic] para 9–16", "md_docs_plan_tests_step5.html#autotoc_md588", null ],
      [ "transform [expected.object.monadic] para 17–24", "md_docs_plan_tests_step5.html#autotoc_md590", null ],
      [ "transform_error [expected.object.monadic] para 25–32", "md_docs_plan_tests_step5.html#autotoc_md592", null ],
      [ "Test Outline", "md_docs_plan_tests_step5.html#autotoc_md594", null ],
      [ "Negative Compile Tests", "md_docs_plan_tests_step5.html#autotoc_md596", [
        [ "<tt>and_then_wrong_error_type_fail.cpp</tt>", "md_docs_plan_tests_step5.html#autotoc_md597", null ],
        [ "<tt>and_then_not_expected_fail.cpp</tt>", "md_docs_plan_tests_step5.html#autotoc_md598", null ],
        [ "<tt>or_else_wrong_value_type_fail.cpp</tt>", "md_docs_plan_tests_step5.html#autotoc_md599", null ],
        [ "<tt>transform_error_not_valid_unexpected_arg_fail.cpp</tt>", "md_docs_plan_tests_step5.html#autotoc_md600", null ]
      ] ]
    ] ],
    [ "Test Plan: Step 6 — Monadic Operations for expected<void, E>", "md_docs_plan_tests_step6.html", [
      [ "Testing Strategy", "md_docs_plan_tests_step6.html#autotoc_md603", null ],
      [ "and_then [expected.void.monadic] para 1–8", "md_docs_plan_tests_step6.html#autotoc_md605", [
        [ "Lvalue overloads (para 1–4)", "md_docs_plan_tests_step6.html#autotoc_md606", null ],
        [ "Rvalue overloads (para 5–8)", "md_docs_plan_tests_step6.html#autotoc_md607", null ]
      ] ],
      [ "or_else [expected.void.monadic] para 9–14", "md_docs_plan_tests_step6.html#autotoc_md609", null ],
      [ "transform [expected.void.monadic] para 15–22", "md_docs_plan_tests_step6.html#autotoc_md611", null ],
      [ "transform_error [expected.void.monadic] para 23–28", "md_docs_plan_tests_step6.html#autotoc_md613", null ],
      [ "Test Outline", "md_docs_plan_tests_step6.html#autotoc_md615", null ],
      [ "Negative Compile Tests", "md_docs_plan_tests_step6.html#autotoc_md617", [
        [ "<tt>void_and_then_wrong_error_type_fail.cpp</tt>", "md_docs_plan_tests_step6.html#autotoc_md618", null ],
        [ "<tt>void_or_else_wrong_value_type_fail.cpp</tt>", "md_docs_plan_tests_step6.html#autotoc_md619", null ]
      ] ]
    ] ],
    [ "Test Plan: Step 7 — expected<T&, E> Reference Specialization", "md_docs_plan_tests_step7.html", [
      [ "Testing Strategy", "md_docs_plan_tests_step7.html#autotoc_md622", null ],
      [ "Type-Level Tests (static_assert)", "md_docs_plan_tests_step7.html#autotoc_md624", null ],
      [ "Test Outline", "md_docs_plan_tests_step7.html#autotoc_md626", null ],
      [ "Negative Compile Tests", "md_docs_plan_tests_step7.html#autotoc_md628", [
        [ "<tt>expected_ref_temporary_fail.cpp</tt>", "md_docs_plan_tests_step7.html#autotoc_md629", null ],
        [ "<tt>expected_ref_no_default_fail.cpp</tt>", "md_docs_plan_tests_step7.html#autotoc_md630", null ],
        [ "<tt>expected_ref_inplace_value_fail.cpp</tt>", "md_docs_plan_tests_step7.html#autotoc_md631", null ]
      ] ],
      [ "CMakeLists additions", "md_docs_plan_tests_step7.html#autotoc_md633", null ]
    ] ],
    [ "Test Plan: Step 8 — expected<T, E&> Error-Reference Specialization", "md_docs_plan_tests_step8.html", [
      [ "Testing Strategy", "md_docs_plan_tests_step8.html#autotoc_md636", null ],
      [ "Type-Level Tests (static_assert)", "md_docs_plan_tests_step8.html#autotoc_md638", null ],
      [ "Test Outline", "md_docs_plan_tests_step8.html#autotoc_md640", null ],
      [ "Negative Compile Tests", "md_docs_plan_tests_step8.html#autotoc_md642", [
        [ "<tt>expected_ref_e_temporary_error_fail.cpp</tt>", "md_docs_plan_tests_step8.html#autotoc_md643", null ],
        [ "<tt>expected_ref_e_const_lvalue_assignment_fail.cpp</tt>", "md_docs_plan_tests_step8.html#autotoc_md644", null ]
      ] ]
    ] ],
    [ "Test Plan: Step 9 — expected<T&, E&> Both-Reference Specialization", "md_docs_plan_tests_step9.html", [
      [ "Testing Strategy", "md_docs_plan_tests_step9.html#autotoc_md647", null ],
      [ "Type-Level Tests (static_assert)", "md_docs_plan_tests_step9.html#autotoc_md649", null ],
      [ "Test Outline", "md_docs_plan_tests_step9.html#autotoc_md651", null ],
      [ "Negative Compile Tests", "md_docs_plan_tests_step9.html#autotoc_md653", [
        [ "<tt>expected_ref_both_temp_value_fail.cpp</tt>", "md_docs_plan_tests_step9.html#autotoc_md654", null ],
        [ "<tt>expected_ref_both_temp_error_fail.cpp</tt>", "md_docs_plan_tests_step9.html#autotoc_md655", null ],
        [ "<tt>expected_ref_both_no_default_fail.cpp</tt>", "md_docs_plan_tests_step9.html#autotoc_md656", null ]
      ] ]
    ] ],
    [ "std::expected Parity", "md_docs_std_parity.html", [
      [ "How it works", "md_docs_std_parity.html#autotoc_md658", null ],
      [ "Result", "md_docs_std_parity.html#autotoc_md659", null ],
      [ "Divergences found", "md_docs_std_parity.html#autotoc_md660", null ],
      [ "<tt>.std</tt> target is skipped on libc++", "md_docs_std_parity.html#autotoc_md661", null ],
      [ "Not yet covered", "md_docs_std_parity.html#autotoc_md662", null ]
    ] ],
    [ "Classes", "annotated.html", [
      [ "Class List", "annotated.html", "annotated_dup" ],
      [ "Class Index", "classes.html", null ],
      [ "Class Hierarchy", "hierarchy.html", "hierarchy" ]
    ] ],
    [ "Files", "files.html", [
      [ "File List", "files.html", "files_dup" ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"annotated.html",
"md_docs_optional_references.html#autotoc_md261",
"md_docs_plan_tests_step4.html#autotoc_md555"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';