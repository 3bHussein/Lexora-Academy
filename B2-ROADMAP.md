# Lexora Academy — Roadmap to B2

Updated: 2026-10-15

## Current implementation (not CEFR certification)
- A1: 12 short lessons, 4 reading texts, alphabet (33 letters), beginner practice.
- A2: 16 short lessons, 5 reading texts, 4 dialogues, 8 listening exercises, 16-question practice exam.
- Vocabulary: 64 words across 8 themes.
- UI: English (default) and Arabic, with bidirectional layout.
- Audio: MP3 generation workflow for Russian curriculum phrases and letters; generated output must pass CI and a browser playback check before claiming coverage.
- Progress is primarily local browser storage; backups are manual.

## Work required to reach a meaningful B2 course
### P0 — Reliability and accessibility
- Pass browser tests in both languages and mobile layouts.
- Verify audio assets are present, load successfully, and cover all learning sentences.
- Add audio coverage report with missing recordings and pronunciation quality checks.
- Fix any remaining untranslated UI strings; include tests for dynamic feedback and settings.
- Protect saved progress and test import/export and cross-device recovery.

### A1 completion
- Expand pronunciation: stressed/unstressed vowels, hard/soft consonants, ь and ъ, sound-letter differences.
- Add grammar progression: noun gender, adjective agreement, basic verb conjugation, negation, questions, accusative/prepositional, numbers and time.
- Add short dialogues, dictation, listening and graded reading.
- Include quizzes per unit and an A1 exit assessment across four skills.

### A2 completion
- Expand cases and declension, verb aspect, motion verbs, past/future, comparison, imperatives and common prepositions.
- Add real-life dialogues and original texts on health, travel, work and daily life.
- Add dictation, comprehension, writing and an A2 exit assessment across four skills.

### B1
- Develop an original sequenced B1 curriculum, with multi-paragraph readings and sustained listening.
- Teach aspect contrasts, prefixed motion verbs, complex sentences, participial basics and opinion language.
- Add longer conversations, summaries, guided writing and a B1 exit assessment.

### B2
- Build original upper-intermediate units on news, work, education, society, culture and debate.
- Teach nuanced aspect, complex clauses, register, idiomatic language and cohesive argumentation.
- Add extended authentic-style listening, reading analysis, speaking tasks and writing feedback.
- Build an assessment blueprint aligned to CEFR B2 descriptors; don't claim certified B2 proficiency from a short multiple-choice exam.

## Reference policy
- Use the user's supplied Russian textbooks and illustrated dictionary for topic selection and checking coverage.
- Write original explanations, examples and questions; do not reproduce copyrighted book pages or long passages.
- Explicitly track which books/pages were actually accessible and reviewed before attributing any curriculum detail to them.

## Definition of done for each unit
1. Accurate English and Arabic teaching text.
2. Correct Russian examples and vocabulary.
3. Verified natural MP3 for all intended listenable phrases.
4. Reading, listening, writing and speaking/production practice.
5. Correct-answer feedback and progress persistence.
6. Mobile, LTR/RTL and browser test coverage.
