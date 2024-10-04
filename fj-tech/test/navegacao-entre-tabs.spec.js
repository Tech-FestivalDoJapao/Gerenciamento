// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://tech-festivaldojapao.github.io/Gerenciamento');
});

test.describe('Navegação entre tabs', () => {
    test('deve acessar a tab home', async ({ page }) => {});

    test('deve acessar a tab de voluntários', async ({ page }) => {});

    test('deve acessar a tab de recursos', async ({ page }) => {});

    test('deve acessar a tab de estandes', async ({ page }) => {});
});