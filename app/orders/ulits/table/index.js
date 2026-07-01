import { orderDateInput, priceInput, amountInput, orderStatus, saveBtn } from "../edit"
import { get, put, post, del } from "../api"

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

            if (header.key === 'status') {
                const span = document.createElement('span')
                const statusMap = {
                    pending: 'pending',
                    delivering: 'shipping',
                    done: 'completed',
                    cancel: 'cancelled'
                }
                span.className = `badge ${statusMap[row.status] || ''}`
                span.innerText = row.status
                td.append(span)
            } else if (header.key === 'total') {
                td.innerText = (row.total ?? 0).toLocaleString('vi-VN') + ' đ'
            } else if (header.key === 'price') {
                td.innerText = (row.price ?? 0).toLocaleString('vi-VN') + ' đ'
            } else if (header.key === 'name') {
                td.innerHTML = `${row.name}<br><small>${row.phone || ''}</small>`
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
                saveBtn.dataset.customerId = row.customerId;
                saveBtn.dataset.productId = row.productId;

                // idInput.value = row.id;
                priceInput.value = row.price;
                amountInput.value = row.amount;
                orderDateInput.value = row.date;
                // proInput.value = row.productName;
                // orderTotalInput.value = row.total;
                orderStatus.value = row.status;

                saveBtn.onclick = async () => {
                    const id = saveBtn.dataset.id;
                    const data = {
                        customerId: Number(saveBtn.dataset.customerId),
                        productId: Number(saveBtn.dataset.productId),
                        date: orderDateInput.value,
                        // price: priceInput.value,
                        amount: Number(amountInput.value),
                        status: orderStatus.value,
                    };
                    console.log(data)

                    try {
                        if (id) {
                            const result = await put(`${id}`, data);
                            console.log( result)
                        } else {
                            await post('', {...data, status: 'Active'});
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
                    await del(`${row.id}`);

                    location.reload();
                } catch (error) {
                    console.log('Lỗi khi lưu', error);
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