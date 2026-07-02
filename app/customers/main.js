import { headers, renderTable, get } from './ulits'

const init = async () => {
    const customers = await get('')

    await renderTable(headers, customers)
}
init()