import {
    get,
    post,
    put,
    del
} from "../Config/api.js";

export async function getProducts() {
    return await get("");
}

export async function addProduct(product) {
    return await post("", product);
}

export async function updateProduct(id, product) {
    return await put(id, product);
}

export async function deleteProduct(id) {
    return await del(id);
}