const { test, expect } = require('@playwright/test');
test('lessons, answers, writing and reading work', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'load' });
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
  await page.locator('#answers button').filter({ hasText: 'Здравствуйте!' }).click();
  await expect(page.locator('#summary')).toContainText('1 من 12');
  await page.reload();
  await expect(page.locator('#summary')).toContainText('1 من 12');
  await expect(page.locator('#nav button').first()).toContainText('✓');
  await page.locator('#readingTab').click();
  await page.locator('#passages section').first().getByRole('button', { name: 'من مصر' }).click();
  await page.reload();
  await page.locator('#readingTab').click();
  await expect(page.locator('#passages section').first().locator('h3')).toContainText('✓');
});

test('mobile layout remains usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:4173/');
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
  await page.locator('#readingTab').click();
  const passages = page.locator('#passages section');
  await expect(passages).toHaveCount(4);
  for (let i = 0; i < 4; i++) {
    const passage = passages.nth(i);
    await passage.locator('summary').click();
    await expect(passage.locator('details')).toHaveAttribute('open', '');
    await expect(passage.locator('details p')).toBeVisible();
    await expect(passage.locator('button')).toHaveCount(2);
  }
});

test('A2 lessons navigation, writing and saved progress', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/');
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
  await page.locator('#a2ReadingTab').click();
  await expect(page.locator('#a2Passages section')).toHaveCount(5);
  for (let i = 0; i < 5; i++) {
    const passage = page.locator('#a2Passages section').nth(i);
    await passage.locator('summary').click();
    await expect(passage.locator('details p')).toBeVisible();
    await passage.locator('button').first().click();
    await expect(passage.locator('[aria-live]')).toContainText('فهم ممتاز');
  }
  await page.reload();
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
  await page.locator('#a2DialoguesTab').click();
  await expect(page.locator('#a2Dialogues section')).toHaveCount(4);
  const first = page.locator('#a2Dialogues section').first();
  await expect(first.locator('details')).toHaveCount(3);
  await first.locator('summary').first().click();
  await expect(first.locator('details p').first()).toBeVisible();
  await first.getByRole('button', { name: 'Сегодня мой первый день.' }).click();
  await expect(first.locator('[aria-live]')).toContainText('إجابة صحيحة');
  await page.reload();
  await page.locator('#a2DialoguesTab').click();
  await expect(page.locator('#a2Dialogues section h3').first()).toContainText('✓');
  expect(errors).toEqual([]);
});
