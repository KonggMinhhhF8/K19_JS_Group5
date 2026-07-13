import { get, post, put, del } from "../Config/api.js";

export async function getCustomers() {
    return await get("");
}

export async function addCustomer(customer) {
    return await post("", customer);
}

export async function updateCustomer(id, customer) {
    return await put(id, customer);
}

export async function deleteCustomer(id) {
    return await del(id);
}