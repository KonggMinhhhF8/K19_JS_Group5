import { addressInput, mailInput, nameInput, phoneInput, saveBtn, taxInput } from "../edit/edit.js"
import { put, post, del } from "../api/api.js"

const renderTable = async (headers, rows, className = null) => {

    const div = document.createElement('div');

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
    actionC.innerText = 'Action'
    headerRow.append(actionC);
    thead.append(headerRow)


    for (const row of rows) {
        const tr = document.createElement('tr');

        for (const header of headers) {
            const td = document.createElement('td')
            td.innerText = row[header.key]

            tr.append(td)
        }

         const action = document.createElement('td');
        action.setAttribute('style', 'display:flex; gap:10px')

        const editBtn = document.createElement('span');
        editBtn.setAttribute('style', '')
        editBtn.title = 'Edit';
        editBtn.innerText = '✏️';

            editBtn.addEventListener('click', () => {
                document.querySelector('#modal').checked = true;
                saveBtn.dataset.id = row.id;

                nameInput.value = row.companyName;
                mailInput.value = row.email;
                phoneInput.value = row.phone;
                addressInput.value = row.address;
                taxInput.value = row.taxId;

                saveBtn.onclick = async () => {
                    const id = saveBtn.dataset.id;
                    const data = {
                        companyName: nameInput.value,
                        email: mailInput.value,
                        phone: phoneInput.value,
                        address: addressInput.value,
                        taxId: taxInput.value,
                    };

                    try {
                        if (id) {
                            await put(`customers/${id}`, data);
                        } else {
                            await post('customers', {...data, status: 'Active'});
                        }

                        document.querySelector('#popup-toggle').checked = false;
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
                    await del(`customers/${row.id}`);

                    location.reload();
                } catch (error) {
                    console.log(error);
                }
            });
            action.append(editBtn, deleteBtn);
            tr.append(action);
        tbody.append(tr)

    }

    table.append(thead, tbody)
    div.append(table)

    return div;
}

export {renderTable}