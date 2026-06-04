const { expect } = require('@playwright/test')

class SearchResultsPage {

    constructor(page) {
        this.page = page

        // Product cards
        this.productCards = '[data-qa-locator="product-item"]'

        // Free shipping text
        this.freeShippingText = 'Free Shipping'

        // Price filter fields
        this.minPriceInput = 'input[placeholder="Min"]'
        this.maxPriceInput = 'input[placeholder="Max"]'

        // Apply button
        this.applyPriceButton = 'button'
    }

    async applyBrandFilter() {
        try {
            // Wait for Samsung filter to be visible
            await this.page.locator('text=Samsung').first().waitFor({ state: 'visible', timeout: 15000 })
            // Click the Samsung filter
            await this.page.locator('text=Samsung').first().click()
            // Wait for filter to be applied
            await this.page.waitForLoadState('networkidle')
        } catch (error) {
            console.log('Warning: Samsung filter not found, proceeding without filter')
        }
    }

    async applyPriceFilter(min, max) {

        await this.page.fill(this.minPriceInput, min)
        await this.page.fill(this.maxPriceInput, max)

        // Press Enter instead of clicking button
        await this.page.keyboard.press('Enter')
    }

    async countProducts() {

        await this.page.waitForSelector(this.productCards)

        const count = await this.page.locator(this.productCards).count()

        console.log('Product Count:', count)

        expect(count).toBeGreaterThan(0)
    }

    async openFirstProduct() {

        const firstProduct = this.page.locator(this.productCards).first()

        await firstProduct.click()
    }
}

module.exports = SearchResultsPage