import { headers, renderTable, overlay, saveBtn, API_URL, TOKEN } from './ulits'

const getCustomers = async () => {
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
    console.error('Failed to get customers:', error)
    return []
  }
}

const init = async () => {
    const customers = await getCustomers()

    await renderTable(headers, customers)
}
init()