import { headers, renderTable, overlay, saveBtn, API_URL, TOKEN, get } from './ulits'

const init = async () => {
    const customers = await get('')

    await renderTable(headers, customers)
}
init()