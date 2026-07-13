import {
    getCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
} from "./services/customer.service.js";

import {
    renderCustomers
} from "./componets/customer.render.js";

let customers = [];
let currentId = null;

// ================== DOM ==================

const modal = document.getElementById("modal-overlay");

const btnAddCustomer = document.getElementById("btnAddCustomer");
const btnSaveCustomer = document.getElementById("btnSaveCustomer");
const btnCancel = document.getElementById("btnCancel");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const tierInput = document.getElementById("tier");

// ================== LOAD ==================

async function loadCustomers() {
    try {
        customers = await getCustomers();
        renderCustomers(customers);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

loadCustomers();

// ================== MODAL ==================

function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

window.closeModal = closeModal;

// ================== BUTTON ==================

btnAddCustomer.addEventListener("click", () => {

    currentId = null;

    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    tierInput.value = "gold";

    openModal();
});

btnCancel.addEventListener("click", closeModal);

btnSaveCustomer.addEventListener("click", saveCustomer);

// ================== SAVE ==================

async function saveCustomer() {

    const customer = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        tier: tierInput.value
    };

    try {

        if (currentId == null) {

            await addCustomer(customer);

        } else {

            await updateCustomer(currentId, customer);

        }

        closeModal();

        await loadCustomers();

    } catch (error) {

        alert(error.message);

    }

}

// ================== EDIT ==================

window.editCustomer = function (id) {

    const customer = customers.find(c => c.id == id);

    if (!customer) return;

    currentId = id;

    nameInput.value = customer.name || "";
    emailInput.value = customer.email || "";
    phoneInput.value = customer.phone || "";
    tierInput.value = customer.tier || "gold";

    openModal();

};

// ================== DELETE ==================

window.removeCustomer = async function (id) {

    if (!confirm("Bạn có chắc muốn xóa khách hàng này?")) {
        return;
    }

    try {

        await deleteCustomer(id);

        await loadCustomers();

    } catch (error) {

        alert(error.message);

    }

};