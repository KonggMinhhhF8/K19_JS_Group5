import {addressInput, mailInput, nameInput, phoneInput, saveBtn, rankStatus} from "../edit"
import { put, post, del} from "../../../login/api.js"

const renderTable = async (headers, rows, className = null) => {

    const div = document.getElementById('table-wrapper');

    if (className) {
        div.className = className;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headerRow = document.createElement('tr')

    for (const header of headers) {
        const th = document.createElement('th')
        th.innerText = header.text
        headerRow.append(th)
    }

    const actionC = document.createElement('th')
    actionC.innerText = 'Thao tác'
    headerRow.append(actionC);
    thead.append(headerRow)


    for (const row of rows) {
        const tr = document.createElement('tr');

        for (const header of headers) {
            const td = document.createElement('td')

            if (header.key === 'rank') {
                const span = document.createElement('span')
                const rankMap = {
                    GOLD: 'gold',
                    SILVER: 'silver',
                    BRONZE: 'bronze'
                }
                span.className = `tier ${rankMap[row.rank] || ''}`
                span.innerText = row.rank
                td.append(span)
            } else if (header.key === 'name') {
                td.innerHTML = `<b>${row.name}</b>`
            } else {
                td.innerText = row[header.key]
            }

            tr.append(td)
        }
        const action = document.createElement('td');

        const actionWrapper = document.createElement('div');
        actionWrapper.setAttribute('style', 'display:flex; gap:10px');

        const editBtn = document.createElement('span');
        editBtn.title = 'Edit';
        editBtn.innerText = '✏️';
        editBtn.style.cursor = 'pointer';

        editBtn.addEventListener('click', () => {
            document.querySelector('#modal-toggle').checked = true;
            saveBtn.dataset.id = row.id;

            nameInput.value = row.name;
            mailInput.value = row.email;
            phoneInput.value = row.phone;
            addressInput.value = row.address;
            rankStatus.value = row.rank;

            saveBtn.onclick = async () => {
                const id = saveBtn.dataset.id;
                const data = {
                    name: nameInput.value,
                    email: mailInput.value,
                    phone: phoneInput.value,
                    address: addressInput.value,
                    rank: rankStatus.value,
                };

                try {
                    if (id) {
                        await put(`customers/${id}`, data);
                    } else {
                        await post('customers', {...data, status: 'Active'});
                    }

                    document.querySelector('#modal-toggle').checked = false;
                    location.reload();
                } catch (error) {
                    console.log(error);
                }
            };
        });

        const deleteBtn = document.createElement('span');
        deleteBtn.className = 'action-icon delete';
        deleteBtn.title = 'Delete';
        deleteBtn.innerText = '🗑️';
        deleteBtn.style.cursor = 'pointer';

        deleteBtn.addEventListener('click', async () => {
            const confirm = window.confirm(`Bạn có chắc muốn xóa "${row.name}" không?`);
            if (!confirm) return;

            try {
               const result = await del(`customers/${row.id}`);
               console.log(result)

                location.reload();
            } catch (error) {
                console.log(error);
            }
        });
        actionWrapper.append(editBtn, deleteBtn);
        action.append(actionWrapper)
        tr.append(action);
        tbody.append(tr)

    }

    table.append(thead, tbody)
    div.append(table)

    return div;
}

export {renderTable}