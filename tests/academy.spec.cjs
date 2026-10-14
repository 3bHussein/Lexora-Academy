const { test, expect } = require('@playwright/test');
test.beforeEach(async ({ page }, testInfo) => { if (!testInfo.title.includes('English is the default language') && !testInfo.title.includes('English mode has no Arabic UI text')) await page.addInitScript(() => localStorage.setItem('lexoraLanguage','ar')); });
test('lessons, answers, writing and reading work', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'load' });
  await page.locator('#lessonsTab').click();
  await expect(page.locator('#nav button')).toHaveCount(12);
  await expect(page.locator('#lesson h2')).toContainText('التحية والتعارف');
  await page.locator('#nav button').nth(1).click();
  await expect(page.locator('#lesson h2')).toContainText('الأسماء والتقديم');
  await page.locator('#writing').fill('Меня зовут Анна.');
  await page.locator('#checkWriting').click();
  await expect(page.locator('#writingFeedback')).toContainText('ممتاز');
  await page.locator('#answers button').filter({ hasText: 'Меня зовут Анна.' }).click();
  await expect(page.locator('#feedback')).toContainText('إجابة صحيحة');
  await page.locator('#readingTab').click();
  await expect(page.locator('#passages section')).toHaveCount(4);
  await page.locator('#passages section').first().getByRole('button', { name: 'من مصر' }).click();
  await expect(page.locator('#passages section').first().locator('[aria-live]')).toContainText('فهم ممتاز');
  await page.locator('#lessonsTab').click();
  await expect(page.locator('#lesson h2')).toContainText('الأسماء والتقديم');
  expect(errors).toEqual([]);
});

test('saved progress survives reload', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#lessonsTab').click();
  await page.locator('#answers button').filter({ hasText: 'Здравствуйте!' }).click();
  await expect(page.locator('#summary')).toContainText('1 من 12');
  await page.reload();
  await page.locator('#lessonsTab').click();
  await expect(page.locator('#summary')).toContainText('1 من 12');
  await expect(page.locator('#nav button').first()).toContainText('✓');
  await page.locator('#readingTab').click();
  await page.locator('#passages section').first().getByRole('button', { name: 'من مصر' }).click();
  await page.reload();
  await page.locator('#lessonsTab').click();
  await page.locator('#readingTab').click();
  await expect(page.locator('#passages section').first().locator('h3')).toContainText('✓');
});

test('mobile layout remains usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#lessonsTab').click();
  await expect(page.locator('#nav button')).toHaveCount(12);
  await expect(page.locator('#lesson h2')).toBeVisible();
  await page.locator('#readingTab').click();
  await expect(page.locator('#passages section')).toHaveCount(4);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
  expect(overflow).toBe(false);
});

test('all 12 lessons render and writing accepts correct answers', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#lessonsTab').click();
  for (let i = 0; i < 12; i++) {
    await page.locator('#nav button').nth(i).click();
    await expect(page.locator('#lesson h2')).toBeVisible();
    await expect(page.locator('#answers button')).toHaveCount(2);
    await expect(page.locator('#writing')).toBeVisible();
    const expected = await page.evaluate(index => window.LEXORA_NOTES[index].writingAnswer, i);
    await page.locator('#writing').fill(expected);
    await page.locator('#checkWriting').click();
    await expect(page.locator('#writingFeedback')).toContainText('ممتاز');
  }
  expect(errors).toEqual([]);
});

test('all reading passages and translation controls render', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#lessonsTab').click();
  await page.locator('#readingTab').click();
  const passages = page.locator('#passages section');
  await expect(passages).toHaveCount(4);
  for (let i = 0; i < 4; i++) {
    const passage = passages.nth(i);
    await passage.locator('summary').click();
    await expect(passage.locator('details')).toHaveAttribute('open', '');
    await expect(passage.locator('details p')).toBeVisible();
    await expect(passage.locator('button:not(.russian-audio-btn)')).toHaveCount(2);
  }
});

test('A2 lessons navigation, writing and saved progress', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#lessonsTab').click();
  await page.locator('#a2Tab').click();
  await expect(page.locator('#nav button')).toHaveCount(16);
  for (let i = 0; i < 16; i++) {
    await page.locator('#nav button').nth(i).click();
    const expected = await page.evaluate(index => window.LEXORA_A2[index].writingAnswer, i);
    await page.locator('#a2Writing').fill(expected);
    await page.locator('#a2Check').click();
    await expect(page.locator('#a2Feedback')).toContainText('ممتاز');
  }
  await page.locator('#nav button').first().click();
  await page.getByRole('button', { name: 'Вчера я работал дома.' }).click();
  await expect(page.locator('[aria-live]').first()).toContainText('إجابة صحيحة');
  await page.reload();
  await page.locator('#lessonsTab').click();
  await page.locator('#a2Tab').click();
  await expect(page.locator('#nav button').first()).toContainText('✓');
  await page.locator('#lessonsTab').click();
  await expect(page.locator('#nav button')).toHaveCount(12);
  expect(errors).toEqual([]);
});

test('A2 reading lab saves comprehension progress separately', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#lessonsTab').click();
  await page.locator('#a2ReadingTab').click();
  await expect(page.locator('#a2Passages section')).toHaveCount(5);
  for (let i = 0; i < 5; i++) {
    const passage = page.locator('#a2Passages section').nth(i);
    await passage.locator('summary').click();
    await expect(passage.locator('details p')).toBeVisible();
    await passage.locator('button:not(.russian-audio-btn)').first().click();
    await expect(passage.locator('[aria-live]')).toContainText('فهم ممتاز');
  }
  await page.reload();
  await page.locator('#lessonsTab').click();
  await page.locator('#a2ReadingTab').click();
  await expect(page.locator('#a2Passages section h3').first()).toContainText('✓');
  await page.locator('#readingTab').click();
  await expect(page.locator('#passages section')).toHaveCount(4);
  expect(errors).toEqual([]);
});

test('A2 dialogue practice, translations and progress survive reload', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#lessonsTab').click();
  await page.locator('#a2DialoguesTab').click();
  await expect(page.locator('#a2Dialogues section')).toHaveCount(4);
  const first = page.locator('#a2Dialogues section').first();
  await expect(first.locator('details')).toHaveCount(3);
  await first.locator('summary').first().click();
  await expect(first.locator('details p').first()).toBeVisible();
  await first.getByRole('button', { name: 'Сегодня мой первый день.' }).click();
  await expect(first.locator('[aria-live]')).toContainText('إجابة صحيحة');
  await page.reload();
  await page.locator('#lessonsTab').click();
  await page.locator('#a2DialoguesTab').click();
  await expect(page.locator('#a2Dialogues section h3').first()).toContainText('✓');
  expect(errors).toEqual([]);
});

test('A2 review exam validates completion and scores answers', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#lessonsTab').click();
  await page.locator('#a2ExamTab').click();
  await expect(page.locator('#a2Exam section')).toHaveCount(16);
  await page.locator('#a2ExamSubmit').click();
  await expect(page.locator('#a2ExamResult')).toContainText('أجب عن جميع الأسئلة');
  for (let i = 0; i < 16; i++) {
    const correct = await page.evaluate(index => window.LEXORA_A2_EXAM[index].correct, i);
    await page.locator('#a2Exam section').nth(i).getByRole('radio', { name: correct, exact: true }).check();
  }
  await page.locator('#a2ExamSubmit').click();
  await expect(page.locator('#a2ExamResult')).toContainText('16/16');
  await expect(page.locator('#a2ExamResult')).toContainText('اجتزت');
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('lexoraA2exam')));
  expect(saved.score).toBe(16);
  expect(errors).toEqual([]);
});

test('A2 audio assets exist and listening practice saves progress', async ({ page, request }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#lessonsTab').click();
  const audio = await page.evaluate(() => window.LEXORA_A2_AUDIO);
  expect(Object.keys(audio).length).toBe(44);
  for (const path of Object.values(audio)) {
    const response = await request.get('http://127.0.0.1:4173/' + path);
    expect(response.ok(), path).toBe(true);
    expect((await response.body()).length, path).toBeGreaterThan(1000);
  }
  await page.locator('#a2ListeningTab').click();
  await expect(page.locator('#a2Listening section')).toHaveCount(8);
  const first = page.locator('#a2Listening section').first();
  await expect(first.locator('details')).not.toHaveAttribute('open', '');
  await first.locator('summary').click();
  await expect(first.locator('details .ru')).toBeVisible();
  await first.getByRole('button', { name: 'أمس عملت في المنزل' }).click();
  await expect(first.locator('[aria-live]')).toContainText('فهم صحيح');
  await page.reload();
  await page.locator('#lessonsTab').click();
  await page.locator('#a2ListeningTab').click();
  await expect(page.locator('#a2Listening section h3').first()).toContainText('✓');
  expect(errors).toEqual([]);
});

test('mobile A1/A2 navigation preserves independent progress', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#lessonsTab').click();
  await page.locator('#answers button').filter({ hasText: 'Здравствуйте!' }).click();
  await page.locator('#a2Tab').click();
  await page.locator('#nav button').first().click();
  await page.getByRole('button', { name: 'Вчера я работал дома.' }).click();
  await page.locator('#a2ReadingTab').click();
  await page.locator('#a2Passages section').first().getByRole('button', { name: 'كتبت رسالة إلى عميل' }).click();
  await page.locator('#a2ListeningTab').click();
  await page.locator('#a2Listening section').first().getByRole('button', { name: 'أمس عملت في المنزل' }).click();
  await page.reload();
  await page.locator('#lessonsTab').click();
  await expect(page.locator('#summary')).toContainText('1 من 12');
  await page.locator('#a2Tab').click();
  await expect(page.locator('#nav button').first()).toContainText('✓');
  await page.locator('#a2ReadingTab').click();
  await expect(page.locator('#a2Passages section h3').first()).toContainText('✓');
  await page.locator('#a2ListeningTab').click();
  await expect(page.locator('#a2Listening section h3').first()).toContainText('✓');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
  expect(overflow).toBe(false);
  expect(errors).toEqual([]);
});

test('unified dashboard reports saved A1/A2 progress and exam score', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#lessonsTab').click();
  await page.evaluate(() => {
    localStorage.setItem('lexoraA1done', JSON.stringify([0, 1]));
    localStorage.setItem('lexoraA1reading', JSON.stringify([0]));
    localStorage.setItem('lexoraA2done', JSON.stringify([0, 1, 2]));
    localStorage.setItem('lexoraA2reading', JSON.stringify([0]));
    localStorage.setItem('lexoraA2dialogues', JSON.stringify([0, 1]));
    localStorage.setItem('lexoraA2listening', JSON.stringify([0, 1, 2, 3]));
    localStorage.setItem('lexoraA2exam', JSON.stringify({ score: 13, total: 16 }));
  });
  await page.locator('#dashboardTab').click();
  const cards = page.locator('#dashboardStats section');
  await expect(cards).toHaveCount(7);
  await expect(cards.nth(0)).toContainText('2 / 12');
  await expect(cards.nth(1)).toContainText('1 / 4');
  await expect(cards.nth(2)).toContainText('3 / 16');
  await expect(cards.nth(3)).toContainText('1 / 5');
  await expect(cards.nth(4)).toContainText('2 / 4');
  await expect(cards.nth(5)).toContainText('4 / 8');
  await expect(cards.nth(6)).toContainText('13 / 16');
  await page.reload();
  await page.locator('#lessonsTab').click();
  await page.locator('#dashboardTab').click();
  await expect(page.locator('#dashboardStats section').nth(6)).toContainText('13 / 16');
  expect(errors).toEqual([]);
});

test('progress backup exports and restores safely without losing unrelated data', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#lessonsTab').click();
  await page.evaluate(() => {
    localStorage.setItem('lexoraA1done', JSON.stringify([0, 2]));
    localStorage.setItem('lexoraA2exam', JSON.stringify({ score: 14, total: 16 }));
    localStorage.setItem('unrelated', 'keep');
  });
  await page.locator('#backupTab').click();
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#backupExport').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('lexora-progress.json');
  await page.evaluate(() => localStorage.setItem('lexoraA1done', '[]'));
  page.once('dialog', dialog => dialog.accept());
  await page.locator('#backupImport').setInputFiles({
    name: 'progress.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({format:'lexora-progress',version:1,progress:{lexoraA1done:[0,2],lexoraA2exam:{score:14,total:16}}}))
  });
  await page.locator('#backupRestore').click();
  await expect(page.locator('#backupFeedback')).toContainText('تمت الاستعادة');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('lexoraA1done')))).toEqual([0,2]);
  expect(await page.evaluate(() => localStorage.getItem('unrelated'))).toBe('keep');
  await page.locator('#backupImport').setInputFiles({
    name: 'invalid.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({format:'lexora-progress',version:1,progress:{evil:'yes'}}))
  });
  await page.locator('#backupRestore').click();
  await expect(page.locator('#backupFeedback')).toContainText('غير صالحة');
  expect(errors).toEqual([]);
});

test('A2 exam explains incorrect answers and clears review on retry', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#lessonsTab').click();
  await page.locator('#a2ExamTab').click();
  for (let i = 0; i < 16; i++) {
    const answer = await page.evaluate(index => index === 0 ? window.LEXORA_A2_EXAM[index].wrong : window.LEXORA_A2_EXAM[index].correct, i);
    await page.locator('#a2Exam section').nth(i).getByRole('radio', { name: answer, exact: true }).check();
  }
  await page.locator('#a2ExamSubmit').click();
  await expect(page.locator('#a2ExamResult')).toContainText('15/16');
  await expect(page.locator('#a2ExamReview')).toContainText('راجع 1 إجابة');
  await expect(page.locator('#a2ExamReview')).toContainText('الصحيح:');
  const correct = await page.evaluate(() => window.LEXORA_A2_EXAM[0].correct);
  await page.locator('#a2Exam section').first().getByRole('radio', { name: correct, exact: true }).check();
  await page.locator('#a2ExamSubmit').click();
  await expect(page.locator('#a2ExamReview')).toContainText('جميع الإجابات صحيحة');
  await expect(page.locator('#a2ExamReview')).not.toContainText('إجابتك:');
});

test('A2 exam does not put all correct answers in the first position', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#lessonsTab').click();
  await page.locator('#a2ExamTab').click();
  const placements = await page.locator('#a2Exam section').evaluateAll(sections =>
    sections.map((section, i) => {
      const correct = window.LEXORA_A2_EXAM[i].correct;
      return [...section.querySelectorAll('input[type=radio]')].findIndex(input => input.value === correct);
    })
  );
  expect(placements).toContain(0);
  expect(placements).toContain(1);
  expect(placements).toHaveLength(16);
});

test('redesigned home menu and complete A1 alphabet work for a first-time learner', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#lessonsTab').click();
  await page.locator('#homeTab').click();
  await expect(page.locator('.hero')).toContainText('Lexora Academy');
  await expect(page.locator('.course-card')).toHaveCount(8);
  await page.locator('#heroStart').click();
  await expect(page.locator('.alphabet-card')).toHaveCount(33);
  await page.locator('#alphabetWriting').fill('мама');
  await page.locator('#alphabetCheck').click();
  await expect(page.locator('#alphabetFeedback')).toContainText('ممتاز');
  await page.getByRole('button', { name: 'التالي: درس التحية والتعارف' }).click();
  await expect(page.locator('#lesson h2')).toContainText('التحية والتعارف');
  expect(errors).toEqual([]);
});

test('redesigned mobile navigation stays in viewport', async ({ page }) => {
  await page.setViewportSize({width: 375, height: 812});
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#lessonsTab').click();
  await page.locator('#homeTab').click();
  await expect(page.locator('.course-card')).toHaveCount(8);
  await page.locator('#alphabetTab').click();
  await expect(page.locator('.alphabet-card')).toHaveCount(33);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
  expect(overflow).toBe(false);
});

test('new home is the default page and legacy dark theme is absent', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173/');
  await expect(page.locator('.hero')).toBeVisible();
  await expect(page.locator('.course-card')).toHaveCount(8);
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(246, 249, 254)');
  await expect(page.locator('aside')).toHaveCSS('position', 'sticky');
  await expect(page.locator('#homeTab')).toBeVisible();
});

test('English is the default language and switching to Arabic persists', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173/');
  await page.evaluate(() => localStorage.removeItem('lexoraLanguage'));
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang','en');
  await expect(page.locator('#academyLanguage')).toHaveValue('en');
  await expect(page.locator('.hero h1')).toContainText('Welcome to');
  await expect(page.locator('.course-card').first()).toContainText('A1 Lessons');
  await page.locator('#alphabetTab').click();
  await expect(page.locator('#lesson h2')).toContainText('Start from Zero');
  await page.locator('#academyLanguage').selectOption('ar');
  await expect(page.locator('html')).toHaveAttribute('lang','ar');
  await expect(page.locator('.hero h1')).toContainText('مرحبًا');
  await expect(page.locator('#academyLanguage')).toHaveValue('ar');
  await page.reload();
  await expect(page.locator('#academyLanguage')).toHaveValue('ar');
});

test('English mode has no Arabic UI text across learning sections', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173/');
  await page.evaluate(() => localStorage.removeItem('lexoraLanguage'));
  await page.reload();
  for (const id of ['homeTab','alphabetTab','vocabTab','lessonsTab','readingTab','a2Tab','a2ReadingTab','a2DialoguesTab','a2ListeningTab','a2ExamTab','dashboardTab','backupTab']) {
    await page.locator('#'+id).click();
    await expect.poll(async () => page.locator('body').evaluate(el => {
      const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
      let n,found=[];
      while((n=walker.nextNode())){
        if(n.parentElement?.closest('script,style,option,[lang="ru"],.ru'))continue;
        if(/[\u0600-\u06ff]/.test(n.nodeValue))found.push(n.nodeValue.trim().slice(0,80));
      }
      return found.join(' | ');
    })).toBe('');
  }
});
