// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    // Verifica se a página carregou corretamente
    await page.goto('https://tech-festivaldojapao.github.io/Gerenciamento', { waitUntil: 'domcontentloaded' });    
});

test.describe('Navegação entre tabs', () => {
    test('deve acessar a tab home', async ({ page }) => {     
        // Acessa a tab home pelo menu de navegação
        await page.click('#home-tab');        
        await page.waitForSelector('#home-tab-pane', { state: 'visible' });

        // Verifica se a tab home foi acessada
        await expect(page.locator('#home-tab-pane')).toBeVisible();

        // Verifica se o conteúdo da tab home foi carregado
        await expect(page.locator('#cards')).toBeVisible();
    });

    test('deve acessar a tab de voluntários', async ({ page }) => {
        // Acessa a tab voluntários pelo menu de navegação
        await page.click('#voluntarios-tab');        
        await page.waitForSelector('#voluntarios-tab-pane', { state: 'visible' });

        // Verifica se a tab voluntários foi acessada
        await expect(page.locator('#voluntarios-tab-pane')).toBeVisible();

        // Verifica se o conteúdo da tab voluntários foi carregado
        await expect(page.locator('#corpoTabelaDeListagemDeVoluntarios')).toBeVisible();        
    });

    test('deve acessar a tab de recursos', async ({ page }) => {});

    test('deve acessar a tab de estandes', async ({ page }) => {
        // Acessa a tab estandes pelo menu de navegação
        await page.click('#estandes-tab');        
        await page.waitForSelector('#estandes-tab-pane', { state: 'visible' });

        // Verifica se a tab estandes foi acessada
        await expect(page.locator('#estandes-tab-pane')).toBeVisible();
    });
});