import { headers, renderTable, get } from './ulits/index.js'

const init = async () => {
    const products = await get('')
    console.log(products)

    const rows = products.map(product => ({
        id: product.id,
        name: product.name,
        categoryId: product.category?.id,
        categoryName: product.category?.name,
        price: product.price,
        remaining: product.remaining,
        sku: product.sku
    }))

    await renderTable(headers, rows)
}
init()