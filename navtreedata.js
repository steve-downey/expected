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
    [ "Blog transclusion pins", "md_docs_blog_pins.html", [
      [ "The mapping", "md_docs_blog_pins.html#autotoc_md1", null ],
      [ "Notes", "md_docs_blog_pins.html#autotoc_md2", null ]
    ] ],
    [ "scrap-your-static_assert", "md_docs_blog_scrap_your_static_assert.html", [
      [ "Type identity as a value", "md_docs_blog_scrap_your_static_assert.html#autotoc_md3", null ],
      [ "Reporting a compile-time value at runtime", "md_docs_blog_scrap_your_static_assert.html#autotoc_md4", null ],
      [ "What it buys", "md_docs_blog_scrap_your_static_assert.html#autotoc_md5", null ]
    ] ],
    [ "Conformance Audit: beman::expected vs std::expected (C++26)", "md_docs_conformance_audit.html", [
      [ "1. unexpected<E> [expected.unexpected]", "md_docs_conformance_audit.html#autotoc_md8", [
        [ "1.1 Static assertions [expected.un.general] para 2", "md_docs_conformance_audit.html#autotoc_md9", null ],
        [ "1.2 Constructors [expected.un.cons]", "md_docs_conformance_audit.html#autotoc_md10", null ],
        [ "1.3 Observers [expected.un.obs]", "md_docs_conformance_audit.html#autotoc_md11", null ],
        [ "1.4 Swap [expected.un.swap]", "md_docs_conformance_audit.html#autotoc_md12", null ],
        [ "1.5 Equality operator [expected.un.eq]", "md_docs_conformance_audit.html#autotoc_md13", null ],
        [ "1.6 CTAD", "md_docs_conformance_audit.html#autotoc_md14", null ]
      ] ],
      [ "2. bad_expected_access<void> [expected.bad.void]", "md_docs_conformance_audit.html#autotoc_md16", null ],
      [ "3. bad_expected_access<E> [expected.bad]", "md_docs_conformance_audit.html#autotoc_md18", null ],
      [ "4. expected<T, E> Primary Template [expected.expected]", "md_docs_conformance_audit.html#autotoc_md20", [
        [ "4.1 Type aliases and rebind", "md_docs_conformance_audit.html#autotoc_md21", null ],
        [ "4.2 Static assertions [expected.object.general] para 2-3", "md_docs_conformance_audit.html#autotoc_md22", null ],
        [ "4.3 Constructors [expected.object.cons]", "md_docs_conformance_audit.html#autotoc_md23", [
          [ "Default constructor", "md_docs_conformance_audit.html#autotoc_md24", null ],
          [ "Copy constructor", "md_docs_conformance_audit.html#autotoc_md25", null ],
          [ "Move constructor", "md_docs_conformance_audit.html#autotoc_md26", null ],
          [ "Converting constructors from expected<U, G>", "md_docs_conformance_audit.html#autotoc_md27", null ],
          [ "Value constructor <tt>expected(U&& v)</tt>", "md_docs_conformance_audit.html#autotoc_md28", null ],
          [ "unexpected<G> constructors", "md_docs_conformance_audit.html#autotoc_md29", null ],
          [ "in_place_t constructors", "md_docs_conformance_audit.html#autotoc_md30", null ],
          [ "unexpect_t constructors", "md_docs_conformance_audit.html#autotoc_md31", null ]
        ] ],
        [ "4.4 Destructor [expected.object.dtor]", "md_docs_conformance_audit.html#autotoc_md32", null ],
        [ "4.5 Assignment [expected.object.assign]", "md_docs_conformance_audit.html#autotoc_md33", [
          [ "Copy assignment", "md_docs_conformance_audit.html#autotoc_md34", null ],
          [ "Move assignment", "md_docs_conformance_audit.html#autotoc_md35", null ],
          [ "Value assignment <tt>operator=(U&&)</tt>", "md_docs_conformance_audit.html#autotoc_md36", null ],
          [ "unexpected<G> assignment", "md_docs_conformance_audit.html#autotoc_md37", null ],
          [ "emplace", "md_docs_conformance_audit.html#autotoc_md38", null ]
        ] ],
        [ "4.6 Swap [expected.object.swap]", "md_docs_conformance_audit.html#autotoc_md39", null ],
        [ "4.7 Observers [expected.object.obs]", "md_docs_conformance_audit.html#autotoc_md40", [
          [ "operator->", "md_docs_conformance_audit.html#autotoc_md41", null ],
          [ "operator*", "md_docs_conformance_audit.html#autotoc_md42", null ],
          [ "operator bool / has_value()", "md_docs_conformance_audit.html#autotoc_md43", null ],
          [ "value()", "md_docs_conformance_audit.html#autotoc_md44", null ],
          [ "error()", "md_docs_conformance_audit.html#autotoc_md45", null ],
          [ "value_or()", "md_docs_conformance_audit.html#autotoc_md46", null ],
          [ "error_or()", "md_docs_conformance_audit.html#autotoc_md47", null ]
        ] ],
        [ "4.8 Monadic operations [expected.object.monadic]", "md_docs_conformance_audit.html#autotoc_md48", [
          [ "and_then (all 4 overloads)", "md_docs_conformance_audit.html#autotoc_md49", null ],
          [ "or_else (all 4 overloads)", "md_docs_conformance_audit.html#autotoc_md50", null ],
          [ "transform (all 4 overloads)", "md_docs_conformance_audit.html#autotoc_md51", null ],
          [ "transform_error (all 4 overloads)", "md_docs_conformance_audit.html#autotoc_md52", null ]
        ] ],
        [ "4.9 Equality operators [expected.object.eq]", "md_docs_conformance_audit.html#autotoc_md53", [
          [ "operator==(expected, expected<T2, E2>)", "md_docs_conformance_audit.html#autotoc_md54", null ],
          [ "operator==(expected, T2)", "md_docs_conformance_audit.html#autotoc_md55", null ],
          [ "operator==(expected, unexpected<E2>)", "md_docs_conformance_audit.html#autotoc_md56", null ]
        ] ]
      ] ],
      [ "5. expected<void, E> Specialization [expected.void]", "md_docs_conformance_audit.html#autotoc_md58", [
        [ "5.1 Static assertions", "md_docs_conformance_audit.html#autotoc_md59", null ],
        [ "5.2 Constructors [expected.void.cons]", "md_docs_conformance_audit.html#autotoc_md60", null ],
        [ "5.3 Destructor [expected.void.dtor]", "md_docs_conformance_audit.html#autotoc_md61", null ],
        [ "5.4 Assignment [expected.void.assign]", "md_docs_conformance_audit.html#autotoc_md62", null ],
        [ "5.5 Swap [expected.void.swap]", "md_docs_conformance_audit.html#autotoc_md63", null ],
        [ "5.6 Observers [expected.void.obs]", "md_docs_conformance_audit.html#autotoc_md64", null ],
        [ "5.7 Monadic operations [expected.void.monadic]", "md_docs_conformance_audit.html#autotoc_md65", [
          [ "and_then", "md_docs_conformance_audit.html#autotoc_md66", null ],
          [ "or_else", "md_docs_conformance_audit.html#autotoc_md67", null ],
          [ "transform", "md_docs_conformance_audit.html#autotoc_md68", null ],
          [ "transform_error", "md_docs_conformance_audit.html#autotoc_md69", null ]
        ] ],
        [ "5.8 Equality operators [expected.void.eq]", "md_docs_conformance_audit.html#autotoc_md70", null ]
      ] ],
      [ "Summary", "md_docs_conformance_audit.html#autotoc_md72", [
        [ "Extensions (not in standard, kept as conforming)", "md_docs_conformance_audit.html#autotoc_md73", null ]
      ] ]
    ] ],
    [ "Fix 1: Constructor, Assignment, and Equality Constraints", "md_docs_conformance_fixes_fix1_constraints.html", [
      [ "Goal", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md76", null ],
      [ "Changes", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md77", [
        [ "1. Add <tt>converts_from_any_cvref</tt> helper", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md78", null ],
        [ "2. Fix converting constructors from expected<U, G>", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md79", null ],
        [ "3. Fix value constructor <tt>expected(U&&)</tt> constraints", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md80", null ],
        [ "4. Fix value assignment <tt>operator=(U&&)</tt>", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md81", null ],
        [ "5. Fix move assignment constraint", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md82", null ],
        [ "6. Fix <tt>operator==(const expected&, const T2&)</tt>", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md83", null ]
      ] ],
      [ "Tests", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md84", [
        [ "New tests (beman-only target — these test constraint behavior)", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md85", null ],
        [ "Negative compile tests", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md86", null ],
        [ "Existing tests", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md87", null ]
      ] ],
      [ "Verification", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md88", null ],
      [ "Handoff", "md_docs_conformance_fixes_fix1_constraints.html#autotoc_md89", null ]
    ] ],
    [ "Fix 2: Trivial Special Member Functions", "md_docs_conformance_fixes_fix2_trivial_smfs.html", [
      [ "Goal", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md92", null ],
      [ "Background", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md93", null ],
      [ "Changes", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md94", [
        [ "Primary template: trivial copy constructor", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md95", null ],
        [ "Primary template: trivial move constructor", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md96", null ],
        [ "Primary template: trivial copy assignment", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md97", null ],
        [ "Primary template: trivial move assignment", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md98", null ],
        [ "Void specialization: trivial copy assignment", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md99", null ],
        [ "Void specialization: trivial move assignment", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md100", null ]
      ] ],
      [ "Tests", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md101", null ],
      [ "Verification", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md102", null ],
      [ "Handoff", "md_docs_conformance_fixes_fix2_trivial_smfs.html#autotoc_md103", null ]
    ] ],
    [ "Fix 3: Monadic Operation Constraints", "md_docs_conformance_fixes_fix3_monadic_constraints.html", [
      [ "Goal", "md_docs_conformance_fixes_fix3_monadic_constraints.html#autotoc_md106", null ],
      [ "Which operations need constraints", "md_docs_conformance_fixes_fix3_monadic_constraints.html#autotoc_md107", [
        [ "Primary template <tt>expected<T, E></tt>", "md_docs_conformance_fixes_fix3_monadic_constraints.html#autotoc_md108", null ],
        [ "Void specialization <tt>expected<void, E></tt>", "md_docs_conformance_fixes_fix3_monadic_constraints.html#autotoc_md109", null ]
      ] ],
      [ "Implementation", "md_docs_conformance_fixes_fix3_monadic_constraints.html#autotoc_md110", null ],
      [ "Tests", "md_docs_conformance_fixes_fix3_monadic_constraints.html#autotoc_md111", null ],
      [ "Verification", "md_docs_conformance_fixes_fix3_monadic_constraints.html#autotoc_md112", null ],
      [ "Handoff", "md_docs_conformance_fixes_fix3_monadic_constraints.html#autotoc_md113", null ]
    ] ],
    [ "Fix 4: Mandates static_asserts", "md_docs_conformance_fixes_fix4_mandates.html", [
      [ "Goal", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md116", null ],
      [ "Changes", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md117", [
        [ "1. Primary template static_assert: T not a specialization of unexpected", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md118", null ],
        [ "2. value() Mandates — primary template", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md119", null ],
        [ "3. value() Mandates — void specialization", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md120", null ],
        [ "4. value_or() Mandates — primary template", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md121", null ],
        [ "5. error_or() Mandates — both primary and void", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md122", null ],
        [ "6. transform() Mandates — both primary and void", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md123", null ],
        [ "7. transform_error() Mandates — both primary and void", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md124", null ]
      ] ],
      [ "Tests", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md125", null ],
      [ "Verification", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md126", null ],
      [ "Handoff", "md_docs_conformance_fixes_fix4_mandates.html#autotoc_md127", null ]
    ] ],
    [ "Fix 5: Hardened Preconditions and Minor Fixes", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html", [
      [ "Goal", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md130", null ],
      [ "Changes", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md131", [
        [ "1. Hardened preconditions (<tt>include/beman/expected/expected.hpp</tt>)", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md132", null ],
        [ "2. unexpected friend swap constraint (<tt>include/beman/expected/unexpected.hpp</tt>)", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md133", null ],
        [ "3. Void specialization <tt>or_else</tt>: use <tt>is_same_v</tt> not <tt>is_void_v</tt>", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md134", null ],
        [ "4. Void specialization <tt>transform_error</tt>: use <tt>expected<T, G></tt> not <tt>expected<void, G></tt>", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md135", null ]
      ] ],
      [ "Tests", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md136", [
        [ "Hardened precondition tests", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md137", null ],
        [ "unexpected swap constraint test", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md138", null ],
        [ "or_else / transform_error minor fix tests", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md139", null ]
      ] ],
      [ "Verification", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md140", null ],
      [ "Handoff", "md_docs_conformance_fixes_fix5_preconditions_and_minor.html#autotoc_md141", null ]
    ] ],
    [ "Plan: Conformance Fixes for expected<T, E> and expected<void, E>", "md_docs_conformance_fixes_index.html", [
      [ "Motivation", "md_docs_conformance_fixes_index.html#autotoc_md143", null ],
      [ "Reference Materials", "md_docs_conformance_fixes_index.html#autotoc_md144", null ],
      [ "Phase Overview", "md_docs_conformance_fixes_index.html#autotoc_md145", null ],
      [ "Standing Conventions", "md_docs_conformance_fixes_index.html#autotoc_md146", [
        [ "std cross-check rule", "md_docs_conformance_fixes_index.html#autotoc_md147", null ]
      ] ],
      [ "Step Details", "md_docs_conformance_fixes_index.html#autotoc_md148", null ],
      [ "Checklist", "md_docs_conformance_fixes_index.html#autotoc_md149", null ],
      [ "After All Fixes", "md_docs_conformance_fixes_index.html#autotoc_md150", null ]
    ] ],
    [ "Instructions for Fix Steps", "md_docs_conformance_fixes_instructions.html", [
      [ "Prompt", "md_docs_conformance_fixes_instructions.html#autotoc_md153", null ]
    ] ],
    [ "Human Design Review Guide: <tt>beman::expected</tt>", "md_docs_human_design_review_guide.html", [
      [ "What This Is", "md_docs_human_design_review_guide.html#autotoc_md155", null ],
      [ "Decision 1: Three Class Templates, Reference Errors Folded In, Zero Abstraction", "md_docs_human_design_review_guide.html#autotoc_md157", [
        [ "What was done", "md_docs_human_design_review_guide.html#autotoc_md158", null ],
        [ "Why this matters", "md_docs_human_design_review_guide.html#autotoc_md159", null ],
        [ "The argument for the current approach", "md_docs_human_design_review_guide.html#autotoc_md160", null ],
        [ "The argument against", "md_docs_human_design_review_guide.html#autotoc_md161", null ],
        [ "What to decide", "md_docs_human_design_review_guide.html#autotoc_md162", null ]
      ] ],
      [ "Decision 2: Rebind Semantics (Not Assign-Through)", "md_docs_human_design_review_guide.html#autotoc_md164", [
        [ "What was done", "md_docs_human_design_review_guide.html#autotoc_md165", null ],
        [ "Why this is the only defensible choice", "md_docs_human_design_review_guide.html#autotoc_md166", null ],
        [ "What to discuss anyway", "md_docs_human_design_review_guide.html#autotoc_md167", null ]
      ] ],
      [ "Decision 3: Shallow Const", "md_docs_human_design_review_guide.html#autotoc_md169", [
        [ "What was done", "md_docs_human_design_review_guide.html#autotoc_md170", null ],
        [ "Why", "md_docs_human_design_review_guide.html#autotoc_md171", null ],
        [ "What to discuss", "md_docs_human_design_review_guide.html#autotoc_md172", null ]
      ] ],
      [ "Decision 4: <tt>unexpected<G></tt> Construction for <tt>E&</tt> Specializations — Allowed Only When <tt>G</tt> Is a Reference", "md_docs_human_design_review_guide.html#autotoc_md174", [
        [ "What was done", "md_docs_human_design_review_guide.html#autotoc_md175", null ],
        [ "Why", "md_docs_human_design_review_guide.html#autotoc_md176", null ],
        [ "What to discuss", "md_docs_human_design_review_guide.html#autotoc_md177", null ]
      ] ],
      [ "Decision 5: Dangling Prevention via <tt>reference_constructs_from_temporary_v</tt>", "md_docs_human_design_review_guide.html#autotoc_md179", [
        [ "What was done", "md_docs_human_design_review_guide.html#autotoc_md180", null ],
        [ "The subtlety", "md_docs_human_design_review_guide.html#autotoc_md181", null ],
        [ "What to discuss", "md_docs_human_design_review_guide.html#autotoc_md182", null ]
      ] ],
      [ "Decision 6: <tt>= delete(\"message\")</tt> as a Diagnostic Strategy", "md_docs_human_design_review_guide.html#autotoc_md184", [
        [ "What was done", "md_docs_human_design_review_guide.html#autotoc_md185", null ],
        [ "What to discuss", "md_docs_human_design_review_guide.html#autotoc_md186", null ]
      ] ],
      [ "Decision 7: <tt>value_or</tt> Deleted for <tt>expected<void, E&></tt>", "md_docs_human_design_review_guide.html#autotoc_md188", [
        [ "What was done", "md_docs_human_design_review_guide.html#autotoc_md189", null ],
        [ "What to discuss", "md_docs_human_design_review_guide.html#autotoc_md190", null ]
      ] ],
      [ "Decision 8: Monadic Operations on Reference Specializations", "md_docs_human_design_review_guide.html#autotoc_md192", [
        [ "What was done", "md_docs_human_design_review_guide.html#autotoc_md193", null ],
        [ "What to discuss", "md_docs_human_design_review_guide.html#autotoc_md194", null ]
      ] ],
      [ "Decision 9: Test Architecture", "md_docs_human_design_review_guide.html#autotoc_md196", [
        [ "What exists", "md_docs_human_design_review_guide.html#autotoc_md197", null ],
        [ "Gaps to discuss", "md_docs_human_design_review_guide.html#autotoc_md198", null ],
        [ "What to decide", "md_docs_human_design_review_guide.html#autotoc_md199", null ]
      ] ],
      [ "Decision 10: Single Header vs Multi-Header", "md_docs_human_design_review_guide.html#autotoc_md201", [
        [ "What exists", "md_docs_human_design_review_guide.html#autotoc_md202", null ],
        [ "What to discuss", "md_docs_human_design_review_guide.html#autotoc_md203", null ]
      ] ],
      [ "Decision 11: Shallow Conversions Must Not Steal — the Move-Then-Deref Idiom", "md_docs_human_design_review_guide.html#autotoc_md205", [
        [ "What was done", "md_docs_human_design_review_guide.html#autotoc_md206", null ],
        [ "Why this matters", "md_docs_human_design_review_guide.html#autotoc_md207", null ],
        [ "What to discuss / watch in review", "md_docs_human_design_review_guide.html#autotoc_md208", null ]
      ] ],
      [ "How to Approach Your Review", "md_docs_human_design_review_guide.html#autotoc_md210", null ],
      [ "References & Citations", "md_docs_human_design_review_guide.html#autotoc_md212", null ]
    ] ],
    [ "LLM Code Review Guide: <tt>beman::expected</tt>", "md_docs_llm_code_review_guide.html", [
      [ "Mission", "md_docs_llm_code_review_guide.html#autotoc_md214", null ],
      [ "Specification Sources (Authoritative, In-Repo)", "md_docs_llm_code_review_guide.html#autotoc_md216", [
        [ "What You Have No Normative Source For", "md_docs_llm_code_review_guide.html#autotoc_md217", null ]
      ] ],
      [ "Review Protocol", "md_docs_llm_code_review_guide.html#autotoc_md219", [
        [ "Phase 1: Structural Inventory", "md_docs_llm_code_review_guide.html#autotoc_md220", null ],
        [ "Phase 2: Clause-by-Clause for Primary and Void", "md_docs_llm_code_review_guide.html#autotoc_md221", [
          [ "Constraints vs Mandates", "md_docs_llm_code_review_guide.html#autotoc_md222", null ],
          [ "Explicit Conditions", "md_docs_llm_code_review_guide.html#autotoc_md223", null ],
          [ "noexcept Specifications", "md_docs_llm_code_review_guide.html#autotoc_md224", null ]
        ] ],
        [ "Phase 3: Reference Specialization Consistency", "md_docs_llm_code_review_guide.html#autotoc_md225", [
          [ "1. API Surface Parity", "md_docs_llm_code_review_guide.html#autotoc_md226", null ],
          [ "2. Dangling Prevention", "md_docs_llm_code_review_guide.html#autotoc_md227", null ],
          [ "3. Storage Layout", "md_docs_llm_code_review_guide.html#autotoc_md228", null ],
          [ "4. Monadic Value Categories", "md_docs_llm_code_review_guide.html#autotoc_md229", null ]
        ] ],
        [ "Phase 4: Cross-Cutting Checks", "md_docs_llm_code_review_guide.html#autotoc_md230", [
          [ "constexpr Correctness", "md_docs_llm_code_review_guide.html#autotoc_md231", null ],
          [ "Trivial Special Member Functions", "md_docs_llm_code_review_guide.html#autotoc_md232", null ],
          [ "Hardened Preconditions", "md_docs_llm_code_review_guide.html#autotoc_md233", null ],
          [ "Value Category in Converting Operations (deref-then-move anti-pattern)", "md_docs_llm_code_review_guide.html#autotoc_md234", null ]
        ] ]
      ] ],
      [ "Known Issues to Confirm or Refute", "md_docs_llm_code_review_guide.html#autotoc_md236", null ],
      [ "Output Format", "md_docs_llm_code_review_guide.html#autotoc_md238", null ]
    ] ],
    [ "Fix: PR #57 Review Corrections", "md_docs_plan_fix_review_corrections.html", [
      [ "Goal", "md_docs_plan_fix_review_corrections.html#autotoc_md241", null ],
      [ "Changes", "md_docs_plan_fix_review_corrections.html#autotoc_md242", [
        [ "expected.hpp", "md_docs_plan_fix_review_corrections.html#autotoc_md243", null ],
        [ "New test files", "md_docs_plan_fix_review_corrections.html#autotoc_md244", null ],
        [ "CMakeLists.txt", "md_docs_plan_fix_review_corrections.html#autotoc_md245", null ]
      ] ],
      [ "Verification", "md_docs_plan_fix_review_corrections.html#autotoc_md246", null ]
    ] ],
    [ "Handoff: After Step 7 (expected<T&, E> Complete)", "md_docs_plan_handoff_next.html", [
      [ "What Was Done", "md_docs_plan_handoff_next.html#autotoc_md248", [
        [ "Changes in Step 7", "md_docs_plan_handoff_next.html#autotoc_md249", null ],
        [ "Test count", "md_docs_plan_handoff_next.html#autotoc_md250", null ]
      ] ],
      [ "Build Commands", "md_docs_plan_handoff_next.html#autotoc_md251", null ],
      [ "Step 7 Checklist", "md_docs_plan_handoff_next.html#autotoc_md252", null ],
      [ "What Comes Next", "md_docs_plan_handoff_next.html#autotoc_md253", [
        [ "Key differences from Step 7", "md_docs_plan_handoff_next.html#autotoc_md254", null ]
      ] ],
      [ "Upstream Merge (2026-06-02)", "md_docs_plan_handoff_next.html#autotoc_md255", null ]
    ] ],
    [ "Handoff: Current State", "md_docs_plan_handoff.html", [
      [ "Repository", "md_docs_plan_handoff.html#autotoc_md257", null ],
      [ "Working Branch", "md_docs_plan_handoff.html#autotoc_md258", null ],
      [ "Current State", "md_docs_plan_handoff.html#autotoc_md259", [
        [ "Key Files", "md_docs_plan_handoff.html#autotoc_md260", null ],
        [ "Step 10 Design Notes", "md_docs_plan_handoff.html#autotoc_md261", null ],
        [ "Build System", "md_docs_plan_handoff.html#autotoc_md262", null ],
        [ "Coding Rules", "md_docs_plan_handoff.html#autotoc_md263", null ],
        [ "Reference Implementation", "md_docs_plan_handoff.html#autotoc_md264", null ]
      ] ],
      [ "Plan", "md_docs_plan_handoff.html#autotoc_md265", null ],
      [ "What Comes Next", "md_docs_plan_handoff.html#autotoc_md266", null ]
    ] ],
    [ "Plan: Implement expected<T&, E> and expected<T, E&> Reference Specializations", "md_docs_plan_index.html", [
      [ "Proposal", "md_docs_plan_index.html#autotoc_md268", null ],
      [ "Reference Materials", "md_docs_plan_index.html#autotoc_md269", null ],
      [ "Phase Overview", "md_docs_plan_index.html#autotoc_md270", null ],
      [ "Standing Conventions", "md_docs_plan_index.html#autotoc_md271", [
        [ "Code", "md_docs_plan_index.html#autotoc_md272", null ],
        [ "Testing", "md_docs_plan_index.html#autotoc_md273", null ]
      ] ],
      [ "Step Details", "md_docs_plan_index.html#autotoc_md274", null ],
      [ "Checklist", "md_docs_plan_index.html#autotoc_md275", null ]
    ] ],
    [ "Review Remediation Plan", "md_docs_plan_review_remediation_2026_09_02.html", [
      [ "Objective", "md_docs_plan_review_remediation_2026_09_02.html#autotoc_md277", null ],
      [ "Implementation", "md_docs_plan_review_remediation_2026_09_02.html#autotoc_md278", null ],
      [ "Proposal and Citations", "md_docs_plan_review_remediation_2026_09_02.html#autotoc_md279", null ],
      [ "Documentation and Infrastructure", "md_docs_plan_review_remediation_2026_09_02.html#autotoc_md280", null ],
      [ "Tests and Acceptance Criteria", "md_docs_plan_review_remediation_2026_09_02.html#autotoc_md281", null ],
      [ "Public Interface Effects", "md_docs_plan_review_remediation_2026_09_02.html#autotoc_md282", null ]
    ] ],
    [ "Step 1: Implement unexpected<E>", "md_docs_plan_step1_unexpected.html", [
      [ "Goal", "md_docs_plan_step1_unexpected.html#autotoc_md285", null ],
      [ "Context for Executing Agent", "md_docs_plan_step1_unexpected.html#autotoc_md286", [
        [ "Key files", "md_docs_plan_step1_unexpected.html#autotoc_md287", null ],
        [ "Standard reference", "md_docs_plan_step1_unexpected.html#autotoc_md288", null ],
        [ "Constraints on the converting constructor", "md_docs_plan_step1_unexpected.html#autotoc_md289", null ],
        [ "Constraints on E", "md_docs_plan_step1_unexpected.html#autotoc_md290", null ]
      ] ],
      [ "Deliverables", "md_docs_plan_step1_unexpected.html#autotoc_md291", null ],
      [ "Procedure", "md_docs_plan_step1_unexpected.html#autotoc_md292", null ],
      [ "Verification", "md_docs_plan_step1_unexpected.html#autotoc_md293", null ],
      [ "Handoff to Step 2", "md_docs_plan_step1_unexpected.html#autotoc_md294", null ]
    ] ],
    [ "Step 10: Implement expected<void, E&> Specialization", "md_docs_plan_step10_expected_void_ref_e.html", [
      [ "Goal", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md297", null ],
      [ "Context for Executing Agent", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md298", [
        [ "Storage model", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md299", null ],
        [ "Key properties", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md300", null ],
        [ "Constructors", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md301", null ],
        [ "Assignment", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md302", null ],
        [ "Observers", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md303", null ],
        [ "Monadic operations", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md304", null ]
      ] ],
      [ "Deliverables", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md305", null ],
      [ "Procedure", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md306", null ],
      [ "Verification", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md307", null ],
      [ "Completion", "md_docs_plan_step10_expected_void_ref_e.html#autotoc_md308", null ]
    ] ],
    [ "Step 2: Implement bad_expected_access", "md_docs_plan_step2_bad_expected_access.html", [
      [ "Goal", "md_docs_plan_step2_bad_expected_access.html#autotoc_md311", null ],
      [ "Context for Executing Agent", "md_docs_plan_step2_bad_expected_access.html#autotoc_md312", [
        [ "Key files", "md_docs_plan_step2_bad_expected_access.html#autotoc_md313", null ],
        [ "Standard reference", "md_docs_plan_step2_bad_expected_access.html#autotoc_md314", null ],
        [ "Notes", "md_docs_plan_step2_bad_expected_access.html#autotoc_md315", null ]
      ] ],
      [ "Deliverables", "md_docs_plan_step2_bad_expected_access.html#autotoc_md316", null ],
      [ "Procedure", "md_docs_plan_step2_bad_expected_access.html#autotoc_md317", null ],
      [ "Verification", "md_docs_plan_step2_bad_expected_access.html#autotoc_md318", null ],
      [ "Handoff to Step 3", "md_docs_plan_step2_bad_expected_access.html#autotoc_md319", null ]
    ] ],
    [ "Step 3: Implement expected<T, E> Primary Template", "md_docs_plan_step3_expected_primary.html", [
      [ "Goal", "md_docs_plan_step3_expected_primary.html#autotoc_md322", null ],
      [ "Context for Executing Agent", "md_docs_plan_step3_expected_primary.html#autotoc_md323", [
        [ "Key files", "md_docs_plan_step3_expected_primary.html#autotoc_md324", null ],
        [ "Standard reference (non-monadic subset)", "md_docs_plan_step3_expected_primary.html#autotoc_md325", null ],
        [ "Storage", "md_docs_plan_step3_expected_primary.html#autotoc_md326", null ],
        [ "Constraints", "md_docs_plan_step3_expected_primary.html#autotoc_md327", null ],
        [ "Exception safety in assignment", "md_docs_plan_step3_expected_primary.html#autotoc_md328", null ]
      ] ],
      [ "Deliverables", "md_docs_plan_step3_expected_primary.html#autotoc_md329", null ],
      [ "Procedure", "md_docs_plan_step3_expected_primary.html#autotoc_md330", null ],
      [ "Verification", "md_docs_plan_step3_expected_primary.html#autotoc_md331", null ],
      [ "Handoff to Step 4", "md_docs_plan_step3_expected_primary.html#autotoc_md332", null ]
    ] ],
    [ "Step 4: Implement expected<void, E> Specialization", "md_docs_plan_step4_expected_void.html", [
      [ "Goal", "md_docs_plan_step4_expected_void.html#autotoc_md335", null ],
      [ "Context for Executing Agent", "md_docs_plan_step4_expected_void.html#autotoc_md336", [
        [ "Key differences from primary template", "md_docs_plan_step4_expected_void.html#autotoc_md337", null ],
        [ "Constructors [expected.void.cons]", "md_docs_plan_step4_expected_void.html#autotoc_md338", null ],
        [ "Storage", "md_docs_plan_step4_expected_void.html#autotoc_md339", null ]
      ] ],
      [ "Deliverables", "md_docs_plan_step4_expected_void.html#autotoc_md340", null ],
      [ "Procedure", "md_docs_plan_step4_expected_void.html#autotoc_md341", null ],
      [ "Verification", "md_docs_plan_step4_expected_void.html#autotoc_md342", null ],
      [ "Handoff to Step 5", "md_docs_plan_step4_expected_void.html#autotoc_md343", null ]
    ] ],
    [ "Step 5: Monadic Operations for expected<T, E>", "md_docs_plan_step5_expected_primary_monadic.html", [
      [ "Goal", "md_docs_plan_step5_expected_primary_monadic.html#autotoc_md346", null ],
      [ "Context for Executing Agent", "md_docs_plan_step5_expected_primary_monadic.html#autotoc_md347", [
        [ "Monadic operations overview", "md_docs_plan_step5_expected_primary_monadic.html#autotoc_md348", null ],
        [ "Key constraints per [expected.object.monadic]", "md_docs_plan_step5_expected_primary_monadic.html#autotoc_md349", null ],
        [ "Ref-qualification pattern", "md_docs_plan_step5_expected_primary_monadic.html#autotoc_md350", null ]
      ] ],
      [ "Deliverables", "md_docs_plan_step5_expected_primary_monadic.html#autotoc_md351", null ],
      [ "Procedure", "md_docs_plan_step5_expected_primary_monadic.html#autotoc_md352", null ],
      [ "Verification", "md_docs_plan_step5_expected_primary_monadic.html#autotoc_md353", null ],
      [ "Handoff to Step 6", "md_docs_plan_step5_expected_primary_monadic.html#autotoc_md354", null ]
    ] ],
    [ "Step 6: Monadic Operations for expected<void, E>", "md_docs_plan_step6_expected_void_monadic.html", [
      [ "Goal", "md_docs_plan_step6_expected_void_monadic.html#autotoc_md357", null ],
      [ "Context for Executing Agent", "md_docs_plan_step6_expected_void_monadic.html#autotoc_md358", [
        [ "Differences from primary template monadic ops", "md_docs_plan_step6_expected_void_monadic.html#autotoc_md359", null ],
        [ "Constraints per [expected.void.monadic]", "md_docs_plan_step6_expected_void_monadic.html#autotoc_md360", null ]
      ] ],
      [ "Deliverables", "md_docs_plan_step6_expected_void_monadic.html#autotoc_md361", null ],
      [ "Procedure", "md_docs_plan_step6_expected_void_monadic.html#autotoc_md362", null ],
      [ "Verification", "md_docs_plan_step6_expected_void_monadic.html#autotoc_md363", null ],
      [ "Handoff to Step 7", "md_docs_plan_step6_expected_void_monadic.html#autotoc_md364", null ]
    ] ],
    [ "Step 7: Implement expected<T&, E> Reference Specialization", "md_docs_plan_step7_expected_ref_t.html", [
      [ "Goal", "md_docs_plan_step7_expected_ref_t.html#autotoc_md367", null ],
      [ "Context for Executing Agent", "md_docs_plan_step7_expected_ref_t.html#autotoc_md368", [
        [ "Design principles (from optional<T&>)", "md_docs_plan_step7_expected_ref_t.html#autotoc_md369", null ],
        [ "Storage model", "md_docs_plan_step7_expected_ref_t.html#autotoc_md370", null ],
        [ "Reference binding helper", "md_docs_plan_step7_expected_ref_t.html#autotoc_md371", null ],
        [ "Constructors", "md_docs_plan_step7_expected_ref_t.html#autotoc_md372", null ],
        [ "Assignment (rebind semantics)", "md_docs_plan_step7_expected_ref_t.html#autotoc_md373", null ],
        [ "Observers", "md_docs_plan_step7_expected_ref_t.html#autotoc_md374", null ],
        [ "Monadic operations", "md_docs_plan_step7_expected_ref_t.html#autotoc_md375", null ],
        [ "reference_constructs_from_temporary_v", "md_docs_plan_step7_expected_ref_t.html#autotoc_md376", null ]
      ] ],
      [ "Deliverables", "md_docs_plan_step7_expected_ref_t.html#autotoc_md377", null ],
      [ "Procedure", "md_docs_plan_step7_expected_ref_t.html#autotoc_md378", null ],
      [ "Verification", "md_docs_plan_step7_expected_ref_t.html#autotoc_md379", null ],
      [ "Handoff to Step 8", "md_docs_plan_step7_expected_ref_t.html#autotoc_md380", null ]
    ] ],
    [ "Step 8: Implement expected<T, E&> Error-Reference Specialization", "md_docs_plan_step8_expected_ref_e.html", [
      [ "Goal", "md_docs_plan_step8_expected_ref_e.html#autotoc_md383", null ],
      [ "Context for Executing Agent", "md_docs_plan_step8_expected_ref_e.html#autotoc_md384", [
        [ "Storage model", "md_docs_plan_step8_expected_ref_e.html#autotoc_md385", null ],
        [ "Design principles", "md_docs_plan_step8_expected_ref_e.html#autotoc_md386", null ],
        [ "Constructors", "md_docs_plan_step8_expected_ref_e.html#autotoc_md387", null ],
        [ "Assignment (rebind on error side)", "md_docs_plan_step8_expected_ref_e.html#autotoc_md388", null ],
        [ "Observers", "md_docs_plan_step8_expected_ref_e.html#autotoc_md389", null ],
        [ "Monadic operations", "md_docs_plan_step8_expected_ref_e.html#autotoc_md390", null ]
      ] ],
      [ "Deliverables", "md_docs_plan_step8_expected_ref_e.html#autotoc_md391", null ],
      [ "Procedure", "md_docs_plan_step8_expected_ref_e.html#autotoc_md392", null ],
      [ "Verification", "md_docs_plan_step8_expected_ref_e.html#autotoc_md393", null ],
      [ "Handoff to Step 9", "md_docs_plan_step8_expected_ref_e.html#autotoc_md394", null ]
    ] ],
    [ "Step 9: Implement expected<T&, E&> Both-Reference Specialization", "md_docs_plan_step9_expected_ref_both.html", [
      [ "Goal", "md_docs_plan_step9_expected_ref_both.html#autotoc_md397", null ],
      [ "Context for Executing Agent", "md_docs_plan_step9_expected_ref_both.html#autotoc_md398", [
        [ "Storage model", "md_docs_plan_step9_expected_ref_both.html#autotoc_md399", null ],
        [ "Key properties", "md_docs_plan_step9_expected_ref_both.html#autotoc_md400", null ],
        [ "Constructors", "md_docs_plan_step9_expected_ref_both.html#autotoc_md401", null ],
        [ "Assignment", "md_docs_plan_step9_expected_ref_both.html#autotoc_md402", null ],
        [ "Observers", "md_docs_plan_step9_expected_ref_both.html#autotoc_md403", null ],
        [ "Monadic operations", "md_docs_plan_step9_expected_ref_both.html#autotoc_md404", null ]
      ] ],
      [ "Deliverables", "md_docs_plan_step9_expected_ref_both.html#autotoc_md405", null ],
      [ "Procedure", "md_docs_plan_step9_expected_ref_both.html#autotoc_md406", null ],
      [ "Verification", "md_docs_plan_step9_expected_ref_both.html#autotoc_md407", null ],
      [ "Handoff to Step 10", "md_docs_plan_step9_expected_ref_both.html#autotoc_md408", null ]
    ] ],
    [ "Test Plan Overview — beman::expected", "md_docs_plan_tests_overview.html", [
      [ "Test Framework", "md_docs_plan_tests_overview.html#autotoc_md411", null ],
      [ "Standard Testing Conventions", "md_docs_plan_tests_overview.html#autotoc_md413", [
        [ "1. Header idempotence", "md_docs_plan_tests_overview.html#autotoc_md414", null ],
        [ "2. Three tiers of negative testing", "md_docs_plan_tests_overview.html#autotoc_md415", null ],
        [ "3. Negative compile test pattern", "md_docs_plan_tests_overview.html#autotoc_md416", [
          [ "Source file format", "md_docs_plan_tests_overview.html#autotoc_md417", null ],
          [ "CMakeLists pattern", "md_docs_plan_tests_overview.html#autotoc_md418", null ]
        ] ],
        [ "4. Type-trait / static_assert tests", "md_docs_plan_tests_overview.html#autotoc_md419", null ],
        [ "5. Hardened precondition tests", "md_docs_plan_tests_overview.html#autotoc_md420", null ]
      ] ],
      [ "Files per Step", "md_docs_plan_tests_overview.html#autotoc_md422", [
        [ "6. Constraint and mandate coverage requirement", "md_docs_plan_tests_overview.html#autotoc_md423", [
          [ "How to cover each kind:", "md_docs_plan_tests_overview.html#autotoc_md424", null ],
          [ "What to cover for each step:", "md_docs_plan_tests_overview.html#autotoc_md425", null ],
          [ "Naming convention:", "md_docs_plan_tests_overview.html#autotoc_md426", null ]
        ] ]
      ] ],
      [ "Standard Reference Summary", "md_docs_plan_tests_overview.html#autotoc_md428", null ],
      [ "CMakeLists Structure", "md_docs_plan_tests_overview.html#autotoc_md430", null ]
    ] ],
    [ "Test Plan: Step 1 — unexpected<E>", "md_docs_plan_tests_step1.html", [
      [ "Testing Strategy", "md_docs_plan_tests_step1.html#autotoc_md433", null ],
      [ "Testable Statements from the Standard", "md_docs_plan_tests_step1.html#autotoc_md435", [
        [ "[expected.un.general] para 2 — ill-formed instantiations", "md_docs_plan_tests_step1.html#autotoc_md436", null ],
        [ "[expected.un.cons] — constructors", "md_docs_plan_tests_step1.html#autotoc_md437", null ],
        [ "[expected.un.obs] — observers", "md_docs_plan_tests_step1.html#autotoc_md438", null ],
        [ "[expected.un.swap] — swap", "md_docs_plan_tests_step1.html#autotoc_md439", null ],
        [ "[expected.un.eq] — equality", "md_docs_plan_tests_step1.html#autotoc_md440", null ]
      ] ],
      [ "Test Outline", "md_docs_plan_tests_step1.html#autotoc_md442", [
        [ "Normal (positive) tests", "md_docs_plan_tests_step1.html#autotoc_md443", null ],
        [ "Constraint / type-trait tests (in normal test file)", "md_docs_plan_tests_step1.html#autotoc_md444", null ]
      ] ],
      [ "Negative Compile Tests", "md_docs_plan_tests_step1.html#autotoc_md446", [
        [ "<tt>unexpected_array_fail.cpp</tt>", "md_docs_plan_tests_step1.html#autotoc_md447", null ],
        [ "<tt>unexpected_cvref_fail.cpp</tt>", "md_docs_plan_tests_step1.html#autotoc_md448", null ],
        [ "<tt>unexpected_self_fail.cpp</tt>", "md_docs_plan_tests_step1.html#autotoc_md449", null ],
        [ "<tt>unexpected_swap_nonswappable_fail.cpp</tt>", "md_docs_plan_tests_step1.html#autotoc_md450", null ]
      ] ],
      [ "CMakeLists additions", "md_docs_plan_tests_step1.html#autotoc_md452", null ]
    ] ],
    [ "Test Plan: Step 10 — expected<void, E&> Void+Error-Reference Specialization", "md_docs_plan_tests_step10.html", [
      [ "Testing Strategy", "md_docs_plan_tests_step10.html#autotoc_md455", null ],
      [ "Type-Level Tests (static_assert)", "md_docs_plan_tests_step10.html#autotoc_md457", null ],
      [ "Test Outline", "md_docs_plan_tests_step10.html#autotoc_md459", null ],
      [ "Negative Compile Tests", "md_docs_plan_tests_step10.html#autotoc_md461", [
        [ "<tt>expected_void_ref_e_temporary_fail.cpp</tt>", "md_docs_plan_tests_step10.html#autotoc_md462", null ],
        [ "<tt>expected_void_ref_e_const_lvalue_fail.cpp</tt>", "md_docs_plan_tests_step10.html#autotoc_md463", null ],
        [ "<tt>expected_void_ref_e_no_value_or_fail.cpp</tt>", "md_docs_plan_tests_step10.html#autotoc_md464", null ]
      ] ],
      [ "CMakeLists additions", "md_docs_plan_tests_step10.html#autotoc_md466", null ]
    ] ],
    [ "Test Plan: Step 2 — bad_expected_access<E>", "md_docs_plan_tests_step2.html", [
      [ "Testing Strategy", "md_docs_plan_tests_step2.html#autotoc_md469", null ],
      [ "Testable Statements from the Standard", "md_docs_plan_tests_step2.html#autotoc_md471", [
        [ "[expected.bad.void] — base specialization", "md_docs_plan_tests_step2.html#autotoc_md472", null ],
        [ "[expected.bad] — primary template", "md_docs_plan_tests_step2.html#autotoc_md473", null ]
      ] ],
      [ "Test Outline", "md_docs_plan_tests_step2.html#autotoc_md475", null ],
      [ "Return value conventions", "md_docs_plan_tests_step2.html#autotoc_md477", null ],
      [ "No negative compile tests", "md_docs_plan_tests_step2.html#autotoc_md479", null ]
    ] ],
    [ "Test Plan: Step 3 — expected<T, E> Primary Template", "md_docs_plan_tests_step3.html", [
      [ "Testing Strategy", "md_docs_plan_tests_step3.html#autotoc_md482", null ],
      [ "Ill-Formed Instantiations [expected.object.general] para 2–3", "md_docs_plan_tests_step3.html#autotoc_md484", null ],
      [ "Constructors [expected.object.cons]", "md_docs_plan_tests_step3.html#autotoc_md486", [
        [ "Default constructor", "md_docs_plan_tests_step3.html#autotoc_md487", null ],
        [ "Copy constructor", "md_docs_plan_tests_step3.html#autotoc_md488", null ],
        [ "Move constructor", "md_docs_plan_tests_step3.html#autotoc_md489", null ],
        [ "Converting constructor from expected<U, G>", "md_docs_plan_tests_step3.html#autotoc_md490", null ],
        [ "Converting constructor from value U&&", "md_docs_plan_tests_step3.html#autotoc_md491", null ],
        [ "Constructors from unexpected<G>", "md_docs_plan_tests_step3.html#autotoc_md492", null ],
        [ "In-place constructors", "md_docs_plan_tests_step3.html#autotoc_md493", null ]
      ] ],
      [ "Destructor [expected.object.dtor]", "md_docs_plan_tests_step3.html#autotoc_md495", null ],
      [ "Assignment [expected.object.assign]", "md_docs_plan_tests_step3.html#autotoc_md497", [
        [ "Copy assignment", "md_docs_plan_tests_step3.html#autotoc_md498", null ],
        [ "Move assignment", "md_docs_plan_tests_step3.html#autotoc_md499", null ],
        [ "Assign from value U&&", "md_docs_plan_tests_step3.html#autotoc_md500", null ],
        [ "Assign from unexpected<G>", "md_docs_plan_tests_step3.html#autotoc_md501", null ]
      ] ],
      [ "Emplace [expected.object.assign] para 18–21", "md_docs_plan_tests_step3.html#autotoc_md503", null ],
      [ "Swap [expected.object.swap]", "md_docs_plan_tests_step3.html#autotoc_md505", null ],
      [ "Observers [expected.object.obs]", "md_docs_plan_tests_step3.html#autotoc_md507", [
        [ "operator->() — Hardened precondition: has_value()", "md_docs_plan_tests_step3.html#autotoc_md508", null ],
        [ "operator*() — Hardened precondition: has_value()", "md_docs_plan_tests_step3.html#autotoc_md509", null ],
        [ "has_value() / operator bool()", "md_docs_plan_tests_step3.html#autotoc_md510", null ],
        [ "value() — throws bad_expected_access when empty", "md_docs_plan_tests_step3.html#autotoc_md511", null ],
        [ "error() — Hardened precondition: !has_value()", "md_docs_plan_tests_step3.html#autotoc_md512", null ],
        [ "value_or()", "md_docs_plan_tests_step3.html#autotoc_md513", null ],
        [ "error_or()", "md_docs_plan_tests_step3.html#autotoc_md514", null ]
      ] ],
      [ "Equality Operators [expected.object.eq]", "md_docs_plan_tests_step3.html#autotoc_md516", [
        [ "expected == expected (T2 not void)", "md_docs_plan_tests_step3.html#autotoc_md517", null ],
        [ "expected == T2 (comparison with value)", "md_docs_plan_tests_step3.html#autotoc_md518", null ],
        [ "expected == unexpected<E2>", "md_docs_plan_tests_step3.html#autotoc_md519", null ]
      ] ],
      [ "Negative Compile Tests", "md_docs_plan_tests_step3.html#autotoc_md521", [
        [ "<tt>expected_t_ref_fail.cpp</tt>", "md_docs_plan_tests_step3.html#autotoc_md522", null ],
        [ "<tt>expected_e_ref_fail.cpp</tt>", "md_docs_plan_tests_step3.html#autotoc_md523", null ],
        [ "<tt>expected_t_array_fail.cpp</tt>", "md_docs_plan_tests_step3.html#autotoc_md524", null ],
        [ "<tt>expected_value_mandate_fail.cpp</tt>", "md_docs_plan_tests_step3.html#autotoc_md525", null ],
        [ "<tt>expected_emplace_throwing_fail.cpp</tt>", "md_docs_plan_tests_step3.html#autotoc_md526", null ]
      ] ]
    ] ],
    [ "Test Plan: Step 4 — expected<void, E> Specialization", "md_docs_plan_tests_step4.html", [
      [ "Testing Strategy", "md_docs_plan_tests_step4.html#autotoc_md529", null ],
      [ "Ill-Formed Instantiations [expected.void.general] para 2", "md_docs_plan_tests_step4.html#autotoc_md531", null ],
      [ "Constructors [expected.void.cons]", "md_docs_plan_tests_step4.html#autotoc_md533", [
        [ "Default constructor", "md_docs_plan_tests_step4.html#autotoc_md534", null ],
        [ "Copy constructor", "md_docs_plan_tests_step4.html#autotoc_md535", null ],
        [ "Move constructor", "md_docs_plan_tests_step4.html#autotoc_md536", null ],
        [ "Converting constructor from expected<U, G> (void case)", "md_docs_plan_tests_step4.html#autotoc_md537", null ],
        [ "Constructors from unexpected<G>", "md_docs_plan_tests_step4.html#autotoc_md538", null ],
        [ "in_place_t constructor", "md_docs_plan_tests_step4.html#autotoc_md539", null ],
        [ "unexpect_t constructors", "md_docs_plan_tests_step4.html#autotoc_md540", null ]
      ] ],
      [ "Destructor [expected.void.dtor]", "md_docs_plan_tests_step4.html#autotoc_md542", null ],
      [ "Assignment [expected.void.assign]", "md_docs_plan_tests_step4.html#autotoc_md544", [
        [ "Copy assignment", "md_docs_plan_tests_step4.html#autotoc_md545", null ],
        [ "Move assignment", "md_docs_plan_tests_step4.html#autotoc_md546", null ],
        [ "Assign from unexpected<G>", "md_docs_plan_tests_step4.html#autotoc_md547", null ],
        [ "emplace()", "md_docs_plan_tests_step4.html#autotoc_md548", null ]
      ] ],
      [ "Swap [expected.void.swap]", "md_docs_plan_tests_step4.html#autotoc_md550", null ],
      [ "Observers [expected.void.obs]", "md_docs_plan_tests_step4.html#autotoc_md552", [
        [ "operator bool() / has_value()", "md_docs_plan_tests_step4.html#autotoc_md553", null ],
        [ "operator*() — void, noexcept, Hardened precondition: has_value()", "md_docs_plan_tests_step4.html#autotoc_md554", null ],
        [ "value() — returns void, throws when empty", "md_docs_plan_tests_step4.html#autotoc_md555", null ],
        [ "error() — Hardened precondition: !has_value()", "md_docs_plan_tests_step4.html#autotoc_md556", null ],
        [ "error_or()", "md_docs_plan_tests_step4.html#autotoc_md557", null ]
      ] ],
      [ "Equality Operators [expected.void.eq]", "md_docs_plan_tests_step4.html#autotoc_md559", [
        [ "expected<void> == expected<void, E2>", "md_docs_plan_tests_step4.html#autotoc_md560", null ],
        [ "expected<void> == unexpected<E2>", "md_docs_plan_tests_step4.html#autotoc_md561", null ]
      ] ],
      [ "No-value members (confirm absence)", "md_docs_plan_tests_step4.html#autotoc_md563", null ]
    ] ],
    [ "Test Plan: Step 5 — Monadic Operations for expected<T, E>", "md_docs_plan_tests_step5.html", [
      [ "Testing Strategy", "md_docs_plan_tests_step5.html#autotoc_md566", null ],
      [ "and_then [expected.object.monadic] para 1–8", "md_docs_plan_tests_step5.html#autotoc_md568", [
        [ "<tt>and_then(F)</tt> — lvalue and const-lvalue overloads (para 1–4)", "md_docs_plan_tests_step5.html#autotoc_md569", null ],
        [ "<tt>and_then(F)</tt> — rvalue and const-rvalue overloads (para 5–8)", "md_docs_plan_tests_step5.html#autotoc_md570", null ]
      ] ],
      [ "or_else [expected.object.monadic] para 9–16", "md_docs_plan_tests_step5.html#autotoc_md572", null ],
      [ "transform [expected.object.monadic] para 17–24", "md_docs_plan_tests_step5.html#autotoc_md574", null ],
      [ "transform_error [expected.object.monadic] para 25–32", "md_docs_plan_tests_step5.html#autotoc_md576", null ],
      [ "Test Outline", "md_docs_plan_tests_step5.html#autotoc_md578", null ],
      [ "Negative Compile Tests", "md_docs_plan_tests_step5.html#autotoc_md580", [
        [ "<tt>and_then_wrong_error_type_fail.cpp</tt>", "md_docs_plan_tests_step5.html#autotoc_md581", null ],
        [ "<tt>and_then_not_expected_fail.cpp</tt>", "md_docs_plan_tests_step5.html#autotoc_md582", null ],
        [ "<tt>or_else_wrong_value_type_fail.cpp</tt>", "md_docs_plan_tests_step5.html#autotoc_md583", null ],
        [ "<tt>transform_error_not_valid_unexpected_arg_fail.cpp</tt>", "md_docs_plan_tests_step5.html#autotoc_md584", null ]
      ] ]
    ] ],
    [ "Test Plan: Step 6 — Monadic Operations for expected<void, E>", "md_docs_plan_tests_step6.html", [
      [ "Testing Strategy", "md_docs_plan_tests_step6.html#autotoc_md587", null ],
      [ "and_then [expected.void.monadic] para 1–8", "md_docs_plan_tests_step6.html#autotoc_md589", [
        [ "Lvalue overloads (para 1–4)", "md_docs_plan_tests_step6.html#autotoc_md590", null ],
        [ "Rvalue overloads (para 5–8)", "md_docs_plan_tests_step6.html#autotoc_md591", null ]
      ] ],
      [ "or_else [expected.void.monadic] para 9–14", "md_docs_plan_tests_step6.html#autotoc_md593", null ],
      [ "transform [expected.void.monadic] para 15–22", "md_docs_plan_tests_step6.html#autotoc_md595", null ],
      [ "transform_error [expected.void.monadic] para 23–28", "md_docs_plan_tests_step6.html#autotoc_md597", null ],
      [ "Test Outline", "md_docs_plan_tests_step6.html#autotoc_md599", null ],
      [ "Negative Compile Tests", "md_docs_plan_tests_step6.html#autotoc_md601", [
        [ "<tt>void_and_then_wrong_error_type_fail.cpp</tt>", "md_docs_plan_tests_step6.html#autotoc_md602", null ],
        [ "<tt>void_or_else_wrong_value_type_fail.cpp</tt>", "md_docs_plan_tests_step6.html#autotoc_md603", null ]
      ] ]
    ] ],
    [ "Test Plan: Step 7 — expected<T&, E> Reference Specialization", "md_docs_plan_tests_step7.html", [
      [ "Testing Strategy", "md_docs_plan_tests_step7.html#autotoc_md606", null ],
      [ "Type-Level Tests (static_assert)", "md_docs_plan_tests_step7.html#autotoc_md608", null ],
      [ "Test Outline", "md_docs_plan_tests_step7.html#autotoc_md610", null ],
      [ "Negative Compile Tests", "md_docs_plan_tests_step7.html#autotoc_md612", [
        [ "<tt>expected_ref_temporary_fail.cpp</tt>", "md_docs_plan_tests_step7.html#autotoc_md613", null ],
        [ "<tt>expected_ref_no_default_fail.cpp</tt>", "md_docs_plan_tests_step7.html#autotoc_md614", null ],
        [ "<tt>expected_ref_inplace_value_fail.cpp</tt>", "md_docs_plan_tests_step7.html#autotoc_md615", null ]
      ] ],
      [ "CMakeLists additions", "md_docs_plan_tests_step7.html#autotoc_md617", null ]
    ] ],
    [ "Test Plan: Step 8 — expected<T, E&> Error-Reference Specialization", "md_docs_plan_tests_step8.html", [
      [ "Testing Strategy", "md_docs_plan_tests_step8.html#autotoc_md620", null ],
      [ "Type-Level Tests (static_assert)", "md_docs_plan_tests_step8.html#autotoc_md622", null ],
      [ "Test Outline", "md_docs_plan_tests_step8.html#autotoc_md624", null ],
      [ "Negative Compile Tests", "md_docs_plan_tests_step8.html#autotoc_md626", [
        [ "<tt>expected_ref_e_temporary_error_fail.cpp</tt>", "md_docs_plan_tests_step8.html#autotoc_md627", null ],
        [ "<tt>expected_ref_e_const_lvalue_assignment_fail.cpp</tt>", "md_docs_plan_tests_step8.html#autotoc_md628", null ]
      ] ]
    ] ],
    [ "Test Plan: Step 9 — expected<T&, E&> Both-Reference Specialization", "md_docs_plan_tests_step9.html", [
      [ "Testing Strategy", "md_docs_plan_tests_step9.html#autotoc_md631", null ],
      [ "Type-Level Tests (static_assert)", "md_docs_plan_tests_step9.html#autotoc_md633", null ],
      [ "Test Outline", "md_docs_plan_tests_step9.html#autotoc_md635", null ],
      [ "Negative Compile Tests", "md_docs_plan_tests_step9.html#autotoc_md637", [
        [ "<tt>expected_ref_both_temp_value_fail.cpp</tt>", "md_docs_plan_tests_step9.html#autotoc_md638", null ],
        [ "<tt>expected_ref_both_temp_error_fail.cpp</tt>", "md_docs_plan_tests_step9.html#autotoc_md639", null ],
        [ "<tt>expected_ref_both_no_default_fail.cpp</tt>", "md_docs_plan_tests_step9.html#autotoc_md640", null ]
      ] ]
    ] ],
    [ "std::expected Parity", "md_docs_std_parity.html", [
      [ "How it works", "md_docs_std_parity.html#autotoc_md642", null ],
      [ "Result", "md_docs_std_parity.html#autotoc_md643", null ],
      [ "Divergences found", "md_docs_std_parity.html#autotoc_md644", null ],
      [ "<tt>.std</tt> target is skipped on libc++", "md_docs_std_parity.html#autotoc_md645", null ],
      [ "Not yet covered", "md_docs_std_parity.html#autotoc_md646", null ]
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
"md_docs_plan_handoff_next.html#autotoc_md250",
"md_docs_plan_tests_step4.html#autotoc_md559"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';