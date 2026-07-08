import {del} from "../api"

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

            if (header.key === 'name') {
                td.innerHTML = `<b>${row.name}</b><br>SKU: ${row.sku || ''}`
            } else if (header.key === 'price') {
                td.innerText = (row.price ?? 0).toLocaleString('vi-VN') + ' đ'
            } else if (header.key === 'remaining') {
                td.innerText = row.remaining
                if (Number(row.remaining) <= 10) {
                    td.setAttribute('style', 'color: red; font-weight: bold')
                    td.innerText = row.remaining + ' (Cảnh báo)'
                }
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

        // editBtn.addEventListener('click', () => {
        //     document.querySelector('#modal-toggle').checked = true;
        //     saveBtn.dataset.id = row.id;
        //     // saveBtn.dataset.customerId = row.customerId;
        //     // saveBtn.dataset.productId = row.productId;
        //
        //     // idInput.value = row.id;
        //     priceInput.value = row.price;
        //     amountInput.value = row.amount;
        //     orderDateInput.value = row.date;
        //     // proInput.value = row.productName;
        //     // orderTotalInput.value = row.total;
        //     orderStatus.value = row.status;
        //
        //     saveBtn.onclick = async () => {
        //         const id = saveBtn.dataset.id;
        //         const data = {
        //             customerId: Number(saveBtn.dataset.customerId),
        //             productId: Number(saveBtn.dataset.productId),
        //             date: orderDateInput.value,
        //             // price: priceInput.value,
        //             amount: Number(amountInput.value),
        //             status: orderStatus.value,
        //         };
        //         console.log(data)
        //
        //         try {
        //             if (id) {
        //                 const result = await put(`${id}`, data);
        //                 console.log(result)
        //             } else {
        //                 await post('', {...data, status: 'Active'});
        //             }
        //
        //             document.querySelector('#modal-toggle').checked = false;
        //             location.reload();
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     };
        // });

        editBtn.addEventListener('click', () => {
            window.location.href = `./create.html?id=${row.id}`
        })

        const deleteBtn = document.createElement('span');
        deleteBtn.className = 'action-icon delete';
        deleteBtn.title = 'Delete';
        deleteBtn.innerText = '🗑️';
        deleteBtn.style.cursor = 'pointer';

        deleteBtn.addEventListener('click', async () => {
            const confirm = window.confirm(`Bạn có chắc muốn xóa "${row.name}" không?`);
            if (!confirm) return;

            try {
                const result = await del(`${row.id}`)

                if (result?.error || result?.message) {
                    alert(result.message || 'Không thể xóa sản phẩm này');
                    return;
                }

                location.reload();
            } catch (error) {
                console.log('Lỗi', error);
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