const overlay = document.createElement('div')
overlay.setAttribute('id', 'modal-overlay')

const modalContent = document.createElement('div')
modalContent.setAttribute('id', 'modal')

const modalHeader = document.createElement('div')
modalHeader.className = 'modal-header'

const modalTitle = document.createElement('h3')
modalTitle.innerText = 'Sửa khách hàng'

const closeLabel = document.createElement('label')
closeLabel.setAttribute('for', 'modal-toggle')
closeLabel.className = 'modal-close'
closeLabel.innerHTML = '&times;'

modalHeader.append(modalTitle, closeLabel)

const modalBody = document.createElement('div')
modalBody.className = 'modal-body'

const nameGroup = document.createElement('div')
nameGroup.className = 'form-group'

const nameLabel = document.createElement('label')
nameLabel.innerText = "Tên khách hàng"

const nameInput = document.createElement('input')
nameInput.setAttribute('id', 'name')
nameInput.setAttribute('type', 'text')
nameInput.setAttribute('placeholder', 'Nhập tên khách hàng...')

nameGroup.append(nameLabel, nameInput)

const tellGroup = document.createElement('div')
tellGroup.className = 'form-group'

const phoneLabel = document.createElement('label')
phoneLabel.innerText = "Số điện thoại"

const phoneInput = document.createElement('input')
phoneInput.setAttribute('id', 'phone')
phoneInput.setAttribute('type', 'tel')
phoneInput.setAttribute('placeholder', '0987 654 321')

tellGroup.append(phoneLabel, phoneInput)

const mailGroup = document.createElement('div')
mailGroup.className = 'form-group'

const mailLabel = document.createElement('label')
mailLabel.innerText = "Địa chỉ email"

const mailInput = document.createElement('input')
mailInput.setAttribute('id', 'mail')
mailInput.setAttribute('type', 'mail')
mailInput.setAttribute('placeholder', 'contact@example.com')

mailGroup.append(mailLabel, mailInput)

const addressGroup = document.createElement('div')
addressGroup.className = 'form-group'

const addressLabel = document.createElement('label')
addressLabel.innerText = "Địa chỉ"

const addressInput = document.createElement('input')
addressInput.setAttribute('id', 'address')
addressInput.setAttribute('type', 'text')
addressInput.setAttribute('placeholder', 'HN, VN...')

addressGroup.append(addressLabel, addressInput)

modalBody.append(nameGroup, tellGroup, mailGroup, addressGroup)

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
    nameInput.value = '';
    mailInput.value = '';
    phoneInput.value = '';
    addressInput.value = '';
    saveBtn.dataset.id = '';
}

export {overlay, nameInput, mailInput, phoneInput, addressInput, saveBtn}