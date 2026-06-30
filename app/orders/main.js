import { headers, renderTable, overlay, saveBtn, API_URL, TOKEN } from './ulits'

const getOrders = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    })
    const data = await response.json()
      console.log('API response:', data)
    return data
  } catch (error) {
    console.error('Failed to get orders:', error)
    return ['get orders failed']
  }
}

const init = async () => {
    const orders = await getOrders()
  
    const rows = orders.map(order => ({
        id: order.id,
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