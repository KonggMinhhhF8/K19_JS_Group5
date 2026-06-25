import { headers, renderTable, overlay, saveBtn, API_URL } from './ulits'

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJrMTgtc3RvcmUiLCJzdWIiOiIxIiwiZXhwIjoxNzgyNDAyODMyLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzgyNDAyMjMyLCJlbWFpbCI6ImJhbmd0eEB0ZXN0LmNvbSJ9.vxJmOHPkMFH-qsNc06Ocvxjhf2l9CD47vAe8elpoqRM'
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
  const panel = document.getElementById('table-wrapper')
    const customers = await getCustomers()

    panel.append(await renderTable(headers, customers))
}
init()