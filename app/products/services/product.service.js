import {API_URL,TOKEN} from "../Config/api.js";

const headers = {
    "Content-Type":"application/json",
    Authorization:`Bearer ${TOKEN}`
};


export async function getProducts(){

    const response = await fetch(
        API_URL,
        {
            headers
        }
    );
    if(response.ok){
        return await response.json();
    }
    const error = await response.text();
    throw new Error(error);
}


export async function addProduct(product){
    const response = await fetch(
        API_URL, {
            method:"POST",
            headers,
            body:JSON.stringify(product)
        }
    );

    return await response.json();

}



export async function updateProduct(id, product){
    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method:"PUT",
            headers,
            body:JSON.stringify(product)
        }
    );

    return await response.json();

}



export async function deleteProduct(id){
    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method:"DELETE",
            headers
        }
    );
    if(!response.ok){
        const error = await response.text();
        console.log(error);
        throw new Error(error);
    }
    return true;
}
