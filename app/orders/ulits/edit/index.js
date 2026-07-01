const overlay = document.createElement('div')
overlay.setAttribute('id', 'modal-overlay')

const modalContent = document.createElement('div')
modalContent.setAttribute('id', 'modal')

const modalHeader = document.createElement('div')
modalHeader.className = 'modal-header'

const modalTitle = document.createElement('h3')
modalTitle.innerText = 'Sửa đơn hàng'

const closeLabel = document.createElement('label')
closeLabel.setAttribute('for', 'modal-toggle')
closeLabel.className = 'modal-close'
closeLabel.innerHTML = '&times;'

modalHeader.append(modalTitle, closeLabel)

const modalBody = document.createElement('div')
modalBody.className = 'modal-body'

// const idGroup = document.createElement('div')
// idGroup.className = 'form-group'
//
// const idLabel = document.createElement('label')
// idLabel.innerText = "Mã đơn"
//
// const idInput = document.createElement('input')
// idInput.setAttribute('id', 'id')
// idInput.setAttribute('type', 'number')
// idInput.setAttribute('placeholder', 'Nhập mã đơn hàng')
//
// idGroup.append(idLabel, idInput)

// const nameGroup = document.createElement('div')
// nameGroup.className = 'form-group'
//
// const nameLabel = document.createElement('label')
// nameLabel.innerText = "Tên khách hàng"
//
// const nameInput = document.createElement('input')
// nameInput.setAttribute('id', 'name')
// nameInput.setAttribute('type', 'text')
// nameInput.setAttribute('placeholder', 'Nhập tên khách hàng...')
//
// nameGroup.append(nameLabel, nameInput)

// const tellGroup = document.createElement('div')
// tellGroup.className = 'form-group'
//
// const phoneLabel = document.createElement('label')
// phoneLabel.innerText = "Số điện thoại"
//
// const phoneInput = document.createElement('input')
// phoneInput.setAttribute('id', 'phone')
// phoneInput.setAttribute('type', 'tel')
// phoneInput.setAttribute('placeholder', '0987 654 321')
//
// tellGroup.append(phoneLabel, phoneInput)

const orderDate = document.createElement('div')
orderDate.className = 'form-group'

const orderDateLabel = document.createElement('label')
orderDateLabel.innerText = "Ngày đặt"

const orderDateInput = document.createElement('input')
orderDateInput.setAttribute('id', 'order-date')
orderDateInput.setAttribute('type', 'date')
orderDateInput.setAttribute('placeholder', '2026-03-03')
// orderDateInput.setAttribute('readonly', true)
// orderDateInput.setAttribute('style', 'background:#f0f0f0; cursor:not-allowed')

orderDate.append(orderDateLabel, orderDateInput)

// const proGroup = document.createElement('div')
// proGroup.className = 'form-group'
//
// const proLabel = document.createElement('label')
// proLabel.innerText = "Sản phẩm"
//
// const proInput = document.createElement('input')
// proInput.setAttribute('id', 'product-name')
// proInput.setAttribute('type', 'text')
// proInput.setAttribute('placeholder', 'Iphone 17 pro')
//
// proGroup.append(proLabel, proInput)

const priceGroup = document.createElement('div')
priceGroup.className = 'form-group'

const priceLabel = document.createElement('label')
priceLabel.innerText = "Đơn giá"

const priceInput = document.createElement('input')
priceInput.setAttribute('id', 'order-price')
priceInput.setAttribute('type', 'number')
priceInput.setAttribute('placeholder', '20.000đ')
priceInput.setAttribute('readonly', true)
priceInput.setAttribute('style', 'background:#f0f0f0; cursor:not-allowed')

priceGroup.append(priceLabel, priceInput)

const amountGroup = document.createElement('div')
amountGroup.className = 'form-group'

const amountLabel = document.createElement('label')
amountLabel.innerText = "Số lượng"

const amountInput = document.createElement('input')
amountInput.setAttribute('id', 'order-amount')
amountInput.setAttribute('type', 'number')
amountInput.setAttribute('placeholder', '3')

amountGroup.append(amountLabel, amountInput)

// const orderTotal = document.createElement('div')
// orderTotal.className = 'form-group'
//
// const orderTotalLabel = document.createElement('label')
// orderTotalLabel.innerText = "Tổng tiền"
//
// const orderTotalInput = document.createElement('input')
// orderTotalInput.setAttribute('id', 'order-total')
// orderTotalInput.setAttribute('type', 'number')
// orderTotalInput.setAttribute('placeholder', '200.000đ')
//
// orderTotal.append(orderTotalLabel, orderTotalInput)

const statusGroup = document.createElement('div')
statusGroup.className = 'form-group'

const statusLabel = document.createElement('label')
statusLabel.innerText = 'Trạng thái'

const orderStatus = document.createElement('select')
orderStatus.id = 'order-status'

const statusOptions = [
    { value: 'pending', text: 'PENDING' },
    { value: 'delivering', text: 'DELIVERING' },
    { value: 'done', text: 'DONE' },
    { value: 'cancel', text: 'CANCEL' }
]

statusOptions.forEach(status => {
    const option = document.createElement('option')
    option.value = status.value
    option.innerText = status.text
    orderStatus.append(option)
})

statusGroup.append(statusLabel, orderStatus)

modalBody.append(orderDate, priceGroup, amountGroup, statusGroup)

const modalFooter = document.createElement('div')
modalFooter.className = 'modal-footer'

const cancelLabel = document.createElement('label')
cancelLabel.className = 'btn-cancel'
cancelLabel.innerText = "Huỷ"
cancelLabel.setAttribute('for', 'modal-toggle')

const saveBtn = document.createElement('button')
saveBtn.className = 'btn-save'
saveBtn.setAttribute('id', 'save-btn')
saveBtn.innerText = "Lưu"
saveBtn.setAttribute('type', 'button')

modalFooter.append(saveBtn, cancelLabel)


modalContent.append(modalHeader, modalBody, modalFooter)
overlay.append(modalContent)

const checkbox = document.getElementById('modal-toggle') // lấy checkbox từ HTML
document.body.append(overlay)

export const resetForm = () => {
    priceInput.value = '';
    amountInput.value = '';
    orderDateInput.value = '';
    // proInput.value = '';
    // orderTotalInput.value = '';
    orderStatus.value = '';
    saveBtn.dataset.id = '';
}

export {overlay, orderDateInput, orderStatus, priceInput, amountInput, saveBtn}