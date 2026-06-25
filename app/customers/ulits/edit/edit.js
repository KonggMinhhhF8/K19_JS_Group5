const overlay = document.createElement('div')
overlay.setAttribute('class', 'popup-overlay');

const label = document.createElement('label')
label.className = 'popup-backdrop'
label.setAttribute('for', 'popup-toggle')

const popupContent = document.createElement('div')
popupContent.className = 'panel popup-content'

const panelHeader = document.createElement('div')
panelHeader.className = 'panel-header'
panelHeader.setAttribute('style', 'border-bottom: none; padding-bottom: 0;')

const panelTitle = document.createElement('h2')
panelTitle.className = 'panel-title'
panelTitle.innerText = "Customer Details"

panelHeader.append(panelTitle)

const popupBody = document.createElement('div')
popupBody.className = 'popup-body'

const formGrid = document.createElement('div')
formGrid.className = 'form-grid'

const nameGroup = document.createElement('div')
nameGroup.className = 'form-group full-width'

const nameLabel = document.createElement('label')
nameLabel.className = 'form-label'
nameLabel.innerText = "Company Name *"

const nameInput = document.createElement('input')
nameInput.className = 'form-input'
nameInput.setAttribute('type', 'text')
nameInput.setAttribute('placeholder', 'e.g. Cty TNHH F8')

nameGroup.append(nameLabel, nameInput)

const mailGroup = document.createElement('div')
mailGroup.className = 'form-group'

const mailLabel = document.createElement('label')
mailLabel.className = 'form-label'
mailLabel.innerText = "Email Address"

const mailInput = document.createElement('input')
mailInput.className = 'form-input'
mailInput.setAttribute('type', 'mail')
mailInput.setAttribute('placeholder', 'contact@example.com')

mailGroup.append(mailLabel, mailInput)

const tellGroup = document.createElement('div')
tellGroup.className = 'form-group'

const phoneLabel = document.createElement('label')
phoneLabel.className = 'form-label'
phoneLabel.innerText = "Phone Number"

const phoneInput = document.createElement('input')
phoneInput.className = 'form-input'
phoneInput.setAttribute('type', 'tel')
phoneInput.setAttribute('placeholder', '0987 654 321')

tellGroup.append(phoneLabel, phoneInput)

const addressGroup = document.createElement('div')
addressGroup.className = 'form-group'

const addressLabel = document.createElement('label')
addressLabel.className = 'form-label'
addressLabel.innerText = "Address"

const addressInput = document.createElement('input')
addressInput.className = 'form-input'
addressInput.setAttribute('type', 'tel')
addressInput.setAttribute('placeholder', 'HN, VN...')

addressGroup.append(addressLabel, addressInput)

const taxGroup = document.createElement('div')
taxGroup.className = 'form-group full-width'

const taxLabel = document.createElement('label')
taxLabel.className = 'form-label'
taxLabel.innerText = "Tax ID (Mã số thuế)"

const taxInput = document.createElement('input')
taxInput.className = 'form-input'
taxInput.setAttribute('type', 'text')
taxInput.setAttribute('placeholder', '018381123412')

taxGroup.append(taxLabel, taxInput)
formGrid.append(nameGroup, mailGroup, addressGroup, tellGroup, taxGroup)
popupBody.append(formGrid)

const popupFooter = document.createElement('div')
popupFooter.className = 'popup-footer'

const cancelLabel = document.createElement('label')
cancelLabel.className = 'btn btn-cancel'
cancelLabel.innerText = "Cancel"
cancelLabel.setAttribute('for', 'popup-toggle')

const saveBtn = document.createElement('button')
saveBtn.className = 'btn btn-save'
saveBtn.innerText = "Save Customer"
saveBtn.setAttribute('type', 'button')

popupFooter.append(saveBtn, cancelLabel)


popupContent.append(panelHeader, popupBody, popupFooter)
overlay.append(label, popupContent)
document.body.append(overlay)

export const resetForm = () => {
    nameInput.value = '';
    mailInput.value = '';
    phoneInput.value = '';
    addressInput.value = '';
    taxInput.value = '';
    saveBtn.dataset.id = '';
}

export {overlay, nameInput, mailInput, phoneInput, addressInput, taxInput, saveBtn}