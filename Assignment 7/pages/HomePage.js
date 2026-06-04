class HomePage {

    constructor(page) {
        this.page = page

        this.searchBox = 'input[name="q"]'
        this.searchButton = '.search-box__button--1oH7'
    }

    async gotoDaraz() {
        await this.page.goto('https://www.daraz.pk', {
            waitUntil: 'networkidle',
            timeout: 90000
        })
        // Add additional wait for page stabilization
        await this.page.waitForLoadState('domcontentloaded')
    }

    async searchProduct(productName) {
        await this.page.fill(this.searchBox, productName)
        await this.page.click(this.searchButton)
        // Wait for product cards to load instead of networkidle (more reliable for WebKit)
        try {
            await this.page.waitForSelector('[data-qa-locator="product-item"]', { timeout: 30000 })
        } catch (e) {
            console.log('Product cards wait timed out, continuing anyway')
        }
        // Small delay to ensure filters are ready
        await this.page.waitForTimeout(1000)
    }
}

module.exports = HomePage