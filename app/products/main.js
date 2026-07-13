

import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
}
    from "./services/product.service.js";
import {
    renderProducts
}
    from "./componets/product.render.js";

let products = [];
let currentId = null;



const modal = document.getElementById("productModal");
function openModal() {
    currentId = null;
    modal.style.display = "flex";
}


const btnAddProduct =
    document.getElementById("btnAddProduct");
btnAddProduct.addEventListener("click", () => {
    window.location.href = "create.html";
    }
    );


const nameInput = document.getElementById("name");

const categoryInput = document.getElementById("category");

const priceInput = document.getElementById("price");

const stockInput = document.getElementById("stock");

const imageInput = document.getElementById("image");
const btnSave =
    document.getElementById("btnSave");

btnSave.addEventListener(
    "click",
    saveProduct
);

async function loadProducts() {
    products =
        await getProducts();

    renderProducts(

        products
    );
}


loadProducts();
async function saveProduct() {
    console.log("Đã bấm lưu");

    if (currentId !== null) {
        await editProductData();
    } else {
        await createProduct();
    }
}
async function createProduct() {

    const product = {
        categoryId:
            Number(categoryInput.value),
        imageId: "",
        name:
            nameInput.value.trim(),
        sku:
            "SKU-" + Date.now(),
        price:
            Number(priceInput.value),
        remaining:
            Number(stockInput.value)

    };

    console.log(product);

    try {

        await addProduct(product);
        await loadProducts();
        closeModal();

    }

    catch (error) {
        console.log(error);
        alert(error.message);

    }

}

async function editProductData() {

    const product = {

        categoryId:
            Number(categoryInput.value),
        imageId: "",
        name:
            nameInput.value.trim(),
        sku:
            "SKU-" + Date.now(),
        price:
            Number(priceInput.value),
        remaining:
            Number(stockInput.value)

    };
    await updateProduct(currentId, product);
    currentId = null;

    await loadProducts();
    closeModal();

}


window.editProduct = function (id) {
    currentId = id;

    const product = products.find(
        p => p.id == id
    );

    if (!product) return;
    nameInput.value =
        product.name;
    categoryInput.value =
        product.category?.id || "";
    priceInput.value =
        product.price;
    stockInput.value =
        product.remaining || 0;
    modal.style.display =
        "flex";

}

window.removeProduct = async function (id) {
    const ok = confirm("Bạn có chắc muốn xóa sản phẩm này?");
    if (!ok) return;
    try {
        await deleteProduct(id);
        await loadProducts();
        alert("Xóa thành công");
    }
    catch (error) {
        alert(
            "Không thể xóa sản phẩm vì sản phẩm đang tồn tại trong đơn hàng."
        );
        console.error(error);
    }

};


window.closeModal = function () {
    modal.style.display = "none";
}

window.openModal = function () {
    currentId = null;
    modal.style.display = "flex";

};
import { headers, renderTable, get } from './ulits/index.js'

const init = async () => {
    const products = await get('')
    console.log(products)

    const rows = products.map(product => ({
        id: product.id,
        name: product.name,
        categoryId: product.category?.id,
        categoryName: product.category?.name,
        price: product.price,
        remaining: product.remaining,
        sku: product.sku
    }))

    await renderTable(headers, rows)
}
init()
