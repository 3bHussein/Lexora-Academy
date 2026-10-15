# Lexora Academy

A free-first multilingual learning academy, starting with **Russian A1 → B2**.

## Status

- Public GitHub repository connected.
- **Initial published prototype:** 12 interactive Russian A1 sample lessons, basic answer checking and local progress saving.
- **Not yet deployed with full earlier V7 features.** The previously developed package includes additional material and a free neural-audio generation script that still needs transfer into this repository.
- **Not a completed A1–B2 curriculum.** Further lessons, assessment, listening, pronunciation, and other languages are future work.

## Run locally

Open `index.html` in a browser.

## GitHub Pages

In repository **Settings → Pages**, select **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.

Expected URL once GitHub Pages is enabled:
https://3bhussein.github.io/Lexora-Academy/

## Next steps

1. Migrate the full V7 site and related scripts without losing functionality.
2. Generate and commit Russian neural audio (edge-tts, no paid API key).
3. Build full instructional A1 content with skills-based checks.
4. Extend to A2, B1, B2 and then German, Italian, and more languages.
5. Add automated tests, accessibility checks, and deployment gates.

**Note:** Current progress is browser-local only. It does not sync across devices.

## Multilingual studio and PTE foundations

Use **Languages & PTE** in the sidebar for German and Italian starter lessons and original PTE foundation practice. See [PLATFORM-PLAN.md](PLATFORM-PLAN.md) for delivered scope, limitations and the remaining platform roadmap. Existing Russian lessons and progress are preserved.

Check the new studio with `node --test tests/expansion.test.cjs`.
