# Lexora multilingual academy

## Shipped in this increment
- Additive Languages & PTE navigation; all existing Russian activities remain available.
- Four German and four Italian introductory lessons with answer feedback.
- Four original PTE foundation activities: reading comprehension, summary writing, read-aloud self-practice and partner-assisted listening comprehension.
- Separate browser-local progress, writing drafts, completion badge and JSON export.
- Responsive cards, explicit labels and live feedback.

These starter collections are not complete CEFR courses. The PTE section is not an official mock test, does not record speech, and does not estimate official scores. Listening currently requires a partner reading the supplied transcript. New German/Italian audio is not yet provided.

## Next implementation stages
1. Expand teacher-reviewed course outcomes and units from A1 through B2 for each language; produce and review licensed audio.
2. Add a server-backed account system, password recovery and per-user access controls; migrate local progress with explicit conflict handling and backup/restore checks.
3. Add spaced repetition with scheduled review and skill-specific assessments.
4. Verify current PTE requirements against official Pearson documentation before implementing timed mock tests and rubrics. Label any automated feedback as practice feedback.
5. Add moderated lesson discussions, reporting/blocking, teacher roles and optional session booking.
6. Add verifiable completion certificates with published completion criteria.

## Data boundaries
Existing Russian storage is untouched. New activities use `lexoraExpansionV1`. New export covers studio progress only; existing Russian export remains separate. Clearing browser storage removes local progress. Accounts, cross-device sync, shared chat, official certification and full B2 coverage are not implemented.

## Validation
Run `node --check scripts/academy-expansion.js` and `node --test tests/expansion.test.cjs`. The tests exercise wrong/correct answers, progress isolation, malformed stored JSON, PTE completion and writing drafts. Existing browser checks remain in `tests/academy.spec.cjs`; browser testing is required for a release acceptance pass.
