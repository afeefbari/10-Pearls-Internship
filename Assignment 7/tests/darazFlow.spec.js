const { test } = require('@playwright/test')

const HomePage = require('../pages/HomePage')
const SearchResultsPage = require('../pages/SearchResultsPage')
const ProductPage = require('../pages/ProductPage')

test('Daraz Functional Flow', async ({ page }) => {

    const homePage = new HomePage(page)
    const searchResultsPage = new SearchResultsPage(page)
    const productPage = new ProductPage(page)

    // Step 1 + 2
    await homePage.gotoDaraz()

    // Step 3
    await homePage.searchProduct('electronics')

    // Step 4
    await searchResultsPage.applyBrandFilter()

    // Step 5
    await searchResultsPage.applyPriceFilter('500', '5000')

    // Step 6
    await searchResultsPage.countProducts()

    // Step 7
    await searchResultsPage.openFirstProduct()

    // Handle new tab if opened
    const pages = page.context().pages()
    const newPage = pages[pages.length - 1]

    const newProductPage = new ProductPage(newPage)

    // Step 8
    await newProductPage.verifyFreeShipping()
})