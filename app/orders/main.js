import { headers, renderTable, get } from './ulits/index.js'

const init = async () => {
    const orders = await get('')
    console.log(orders)
  
    const rows = orders.map(order => ({
        id: order.id,
        customerId: order.customer?.id,
        productId: order.product?.id,
        price: order.product?.price,
        amount: order.amount,
        name: order.customer?.name,
        phone: order.customer?.phone,
        status: order.status,
        productName: order.product?.name,
        date: order.date,
        total: (order.product?.price??0) * (order.amount??0)
    }));

    await renderTable(headers, rows)
}
init()