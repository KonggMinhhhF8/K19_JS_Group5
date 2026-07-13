import { get, post, put } from "../../Config/api.js";

// Lấy id từ URL

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");


// Tạo giao diện
const container = document.createElement("div");
container.className = "container";

const main = document.createElement("main");
main.className = "main-content";

const title = document.createElement("h2");
title.innerText = productId ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm";

const form = document.createElement("form");
form.id = "productForm";

// Tên
const nameInput = document.createElement("input");
nameInput.placeholder = "Tên sản phẩm";

// Giá
const priceInput = document.createElement("input");
priceInput.type = "number";
priceInput.placeholder = "Giá";

//SKU
const skuInput = document.createElement("input");
skuInput.placeholder = "SKU";

//Tồn kho
const remainingInput = document.createElement("input");
remainingInput.type = "number";
remainingInput.placeholder = "Tồn kho";

// ===== Category =====
const categorySelect = document.createElement("select");

[
    {
        id: 11,
        name: "Điện Thoại"
    },
    {
        id: 12,
        name: "Quần Áo"
    },
    {
        id: 13,
        name: "Giày Dép"
    }
].forEach(c => {

    const op = document.createElement("option");
    op.value = c.id;
    op.innerText = c.name;

    categorySelect.appendChild(op);

});

//Button

const btnSave = document.createElement("button");
btnSave.type = "submit";
btnSave.innerText = productId ? "Cập nhật" : "Thêm sản phẩm";

const btnCancel = document.createElement("button");
btnCancel.type = "button";
btnCancel.innerText = "Hủy";

btnCancel.onclick = () => {
    location.href = "./index.html";
};

form.append(
    nameInput,
    priceInput,
    skuInput,
    remainingInput,
    categorySelect,
    btnCancel,
    btnSave
);

main.append(title, form);
container.append(main);
document.body.append(container);

// Load dữ liệu nếu sửa

async function loadProduct() {

    if (!productId) return;

    try {
        const product = await get(productId);
        nameInput.value = product.name;
        priceInput.value = product.price;
        skuInput.value = product.sku;
        remainingInput.value = product.remaining;
        categorySelect.value = product.category.id;
    } catch (err) {
        console.log(err);
        alert("Không lấy được sản phẩm");

    }
}

loadProduct();


// Lưu
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const body = {
        name: nameInput.value.trim(),
        price: Number(priceInput.value),
        sku: skuInput.value || ("SKU-" + Date.now()),
        remaining: Number(remainingInput.value),
        categoryId: Number(categorySelect.value),
        imageId: ""
    };

    try {
        if (productId) {
            await put(productId, body);
            alert("Cập nhật thành công");
        } else {
            await post("", body);
            alert("Thêm thành công");
        }
        location.href = "./index.html";
    } catch (err) {
        console.log(err);
        alert(err.message);

    }

});