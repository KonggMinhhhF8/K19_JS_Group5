// import {API_URL,TOKEN} from "../config/api.js";

// const headers = {

//     "Content-Type":"application/json",

//     Authorization:`Bearer ${TOKEN}`

// };

// export async function getCustomers(){
//     const response = await fetch(
//         API_URL,
//         {
//             headers
//         }
//     );
//     return await response.json();

// }


// export async function addCustomer(customer){

//     const response = await fetch(

//         API_URL,

//         {

//             method:"POST",

//             headers,

//             body:JSON.stringify(customer)

//         }

//     );

//     return await response.json();

// }



// export async function updateCustomer(id, customer){

//     const response = await fetch(
//         `${API_URL}/${id}`,
//         {
//             method:"PUT",
//             headers,
//             body:JSON.stringify(customer)
//         }
//     );
//     return await response.json();

// }


// export async function deleteCustomer(id){

//     console.log("Delete ID:",id);
//     const response = await fetch(
//         `${API_URL}/${id}`,
//         {
//             method:"DELETE",
//             headers:{
//                 Authorization:`Bearer ${TOKEN}`
//             }
//         }
//     );
//     console.log(response.status);

// }


