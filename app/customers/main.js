import {
    getCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
}
    from "./services/customer.service.js";

import {
    renderCustomers
}
    from "./componets/customer.render.js";

let customers = [];
let currentId = null;

const modal = document.getElementById("modal");
const btnSaveCustomer =
    document.getElementById("btnSaveCustomer");
const nameInput =
    document.getElementById("name");
const emailInput =
    document.getElementById("email");
const phoneInput =
    document.getElementById("phone");
const tierInput =
    document.getElementById("tier");
btnSaveCustomer.addEventListener(
    "click",
    saveCustomer
);

const btnCancel =
    document.getElementById(
        "btnCancel"
    );

const btnAddCustomer =
    document.getElementById(
        "btnAddCustomer"
    );

btnAddCustomer.addEventListener(
    "click",
    () => {
        currentId = null;
        nameInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
        tierInput.value = "gold";

        modal.style.display = "flex";
    }
);
btnCancel.addEventListener(
    "click",
    closeModal
);


async function loadCustomers(){
    customers = await getCustomers();
    renderCustomers(customers);
}
loadCustomers();

async function saveCustomer(){
    if(currentId){
        await editCustomerData();
    }
    else{
        await createCustomer();
    }
}


async function createCustomer(){
    const customer = {
        name:nameInput.value,
        email:emailInput.value,
        phone:phoneInput.value,
        tier:tierInput.value
    };


    await addCustomer(customer);
    await loadCustomers();
    closeModal();

}


async function editCustomerData(){
    const customer = {
        name:nameInput.value,
        email:emailInput.value,
        phone:phoneInput.value,
        tier:tierInput.value

    };

    await updateCustomer(currentId, customer);
    currentId = null;
    await loadCustomers();
    closeModal();
}


window.editCustomer = function(id){

    currentId = id;

    const customer = customers.find(c => c.id === id);
    if(!customer) return;
    nameInput.value = customer.name;
    emailInput.value = customer.email;
    phoneInput.value = customer.phone;
    tierInput.value = customer.tier;
    modal.style.display = "flex";

};

window.removeCustomer = async function(id){
    const ok = confirm("Bạn có chắc muốn xóa?");
    if(!ok) return;
    await deleteCustomer(id);
    await loadCustomers();
};
function closeModal(){
    modal.style.display = "none";
}
