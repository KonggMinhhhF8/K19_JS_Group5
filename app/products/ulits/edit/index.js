import {put, get} from "../../../login/api.js"

const container = document.createElement('div')
container.className = 'container'

const sidebar = document.createElement('aside')
sidebar.className = 'sidebar'
sidebar.innerHTML = `
    <h2>ShopAdmin</h2>
    <ul>
        <li><i class="fas fa-home"></i> Tổng quan</li>
        <li class="active"><i class="fas fa-box"></i> Sản phẩm</li>
        <li><i class="fas fa-shopping-cart"></i> Đơn hàng</li>
        <li><i class="fas fa-users"></i> Khách hàng</li>
        <li><i class="fas fa-chart-line"></i> Báo cáo</li>
    </ul>
`

const main = document.createElement('main')
main.className = 'main-content'

const headerActions = document.createElement('div')
headerActions.className = 'header-actions'

const backLink = document.createElement('a')
backLink.href = '#'
backLink.className = 'btn-back'
backLink.innerHTML = '<i class="fas fa-arrow-left"></i> Quay lại danh sách'
backLink.addEventListener('click', () => {
    window.location.href = './index.html'
})

const pageTitle = document.createElement('h2')
pageTitle.innerText = 'Chỉnh sửa sản phẩm'

headerActions.append(backLink, pageTitle)

const productForm = document.createElement('form')
productForm.id = 'productForm'

const productGrid = document.createElement('div')
productGrid.className = 'product-grid'

const leftCol = document.createElement('div')
leftCol.className = 'left-col'

const infoCard = document.createElement('div')
infoCard.className = 'card'

const infoTitle = document.createElement('h3')
infoTitle.innerText = 'Thông tin chung'

const nameGroup = document.createElement('div')
nameGroup.className = 'form-group'
const nameLabel = document.createElement('label')
nameLabel.innerText = 'Tên sản phẩm'
const nameInput = document.createElement('input')
nameInput.type = 'text'
nameInput.placeholder = 'Ví dụ: iPhone 15 Pro Max'
nameGroup.append(nameLabel, nameInput)

const descGroup = document.createElement('div')
descGroup.className = 'form-group'
const descLabel = document.createElement('label')
descLabel.innerText = 'Mô tả sản phẩm'
const descInput = document.createElement('textarea')
descInput.rows = 5
descInput.placeholder = 'Nhập đặc điểm nổi bật...'
descInput.setAttribute('readonly', true)
descInput.setAttribute('style', 'background:#f0f0f0; cursor:not-allowed')

descGroup.append(descLabel, descInput)

infoCard.append(infoTitle, nameGroup, descGroup)

const priceCard = document.createElement('div')
priceCard.className = 'card'

const priceTitle = document.createElement('h3')
priceTitle.innerText = 'Giá cả & Kho hàng'

const priceRow1 = document.createElement('div')
priceRow1.setAttribute('style', 'display: grid; grid-template-columns: 1fr 1fr; gap: 20px;')

const priceGroup = document.createElement('div')
priceGroup.className = 'form-group'
const priceLabel = document.createElement('label')
priceLabel.innerText = 'Giá bán (VNĐ)'
const priceInput = document.createElement('input')
priceInput.type = 'number'
priceGroup.append(priceLabel, priceInput)

priceRow1.append(priceGroup)

const priceRow2 = document.createElement('div')
priceRow2.setAttribute('style', 'display: grid; grid-template-columns: 1fr 1fr; gap: 20px;')

const skuGroup = document.createElement('div')
skuGroup.className = 'form-group'
const skuLabel = document.createElement('label')
skuLabel.innerText = 'Mã SKU'
const skuInput = document.createElement('input')
skuInput.type = 'text'
skuGroup.append(skuLabel, skuInput)

const remainingGroup = document.createElement('div')
remainingGroup.className = 'form-group'
const remainingLabel = document.createElement('label')
remainingLabel.innerText = 'Số lượng tồn kho'
const remainingInput = document.createElement('input')
remainingInput.type = 'number'
remainingGroup.append(remainingLabel, remainingInput)

priceRow2.append(skuGroup, remainingGroup)

priceCard.append(priceTitle, priceRow1, priceRow2)

leftCol.append(infoCard, priceCard)

const rightCol = document.createElement('div')
rightCol.className = 'right-col'

const imageCard = document.createElement('div')
imageCard.className = 'card'

const imageTitle = document.createElement('h3')
imageTitle.innerText = 'Hình ảnh sản phẩm'

const imageUpload = document.createElement('div')
imageUpload.className = 'image-upload'
imageUpload.setAttribute('readonly', true)
imageUpload.setAttribute('style', 'background:#f0f0f0; cursor:not-allowed')

const uploadIcon = document.createElement('i')
uploadIcon.className = 'fas fa-cloud-upload-alt'

const uploadText = document.createElement('p')
uploadText.innerText = 'Nhấp để tải ảnh lên'

const fileInput = document.createElement('input')
fileInput.type = 'file'
fileInput.id = 'fileInput'
fileInput.hidden = true

const imgPreview = document.createElement('img')
imgPreview.id = 'imgPreview'
imgPreview.className = 'preview-img'
imgPreview.src = '#'
imgPreview.alt = 'Preview'

imageUpload.addEventListener('click', () => fileInput.click())
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]
    if (file) {
        imgPreview.src = URL.createObjectURL(file)
    }
})

imageUpload.append(uploadIcon, uploadText, fileInput, imgPreview)
imageCard.append(imageTitle, imageUpload)

const classifyCard = document.createElement('div')
classifyCard.className = 'card'

const classifyTitle = document.createElement('h3')
classifyTitle.innerText = 'Phân loại'

const categoryGroup = document.createElement('div')
categoryGroup.className = 'form-group'
const categoryLabel = document.createElement('label')
categoryLabel.innerText = 'Danh mục'
const categorySelect = document.createElement('select')

const categoryOptions = [
    {value: '11', text: 'Điện Thoại'},
    {value: '12', text: 'Quần Áo'},
    {value: '13', text: 'Giày Dép'}
]
categoryOptions.forEach(cat => {
    const option = document.createElement('option')
    option.value = cat.value
    option.innerText = cat.text
    categorySelect.append(option)
})
categoryGroup.append(categoryLabel, categorySelect)

classifyCard.append(classifyTitle, categoryGroup)

rightCol.append(imageCard, classifyCard)

productGrid.append(leftCol, rightCol)


const formFooter = document.createElement('div')
formFooter.className = 'form-footer'

const cancelBtn = document.createElement('button')
cancelBtn.type = 'button'
cancelBtn.className = 'btn btn-cancel'
cancelBtn.innerText = 'Hủy bỏ'

const saveBtn = document.createElement('button')
saveBtn.type = 'submit'
saveBtn.className = 'btn btn-save'
saveBtn.innerText = 'Lưu thay đổi'

formFooter.append(cancelBtn, saveBtn)

productForm.append(productGrid, formFooter)
main.append(headerActions, productForm)

container.append(sidebar, main)
document.body.append(container)

const fillForm = (product) => {
    nameInput.value = product.name
    priceInput.value = product.price
    skuInput.value = product.sku
    remainingInput.value = product.remaining
    categorySelect.value = product.category?.id
    descInput.value = null
    saveBtn.dataset.id = product.id
}



const params = new URLSearchParams(window.location.search)
const productId = params.get('id')
console.log('productId:', productId)

const init = async () => {
    if (!productId) return

    const product = await get(`products/${productId}`)
    fillForm(product)
}

init()

productForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const data = {
        name: nameInput.value,
        price: Number(priceInput.value),
        sku: skuInput.value,
        remaining: Number(remainingInput.value),
        categoryId: Number(categorySelect.value),
        productId: productId,
    }

    try {
        await put(`products/${saveBtn.dataset.id}`, data)
        alert('Cập nhật thành công!')
        window.location.href = `./index.html`
    } catch (error) {
        console.log(error)
        alert('Cập nhật thất bại')
    }
})


cancelBtn.addEventListener('click', () => {
    window.location.href = './index.html'
})

export {
    nameInput, descInput, priceInput, skuInput,
    remainingInput, categorySelect,
    saveBtn, cancelBtn, fillForm
}