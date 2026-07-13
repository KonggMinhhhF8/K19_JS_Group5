import {
    getCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
} from "./services/customer.service.js";
import { renderCustomers } from "./componets/customer.render.js";

let customers = [];
let currentId = null;

// ================== DOM ==================
const modalOverlay = document.getElementById("modal-overlay");
const modalTitle = document.getElementById("modalTitle");

const btnAddCustomer = document.getElementById("btnAddCustomer");
const btnSaveCustomer = document.getElementById("btnSaveCustomer");
const btnCancel = document.getElementById("btnCancel");
const btnCloseModal = document.getElementById("btnCloseModal");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const tierInput = document.getElementById("tier");

const searchInput = document.getElementById("search");
const filterTier = document.getElementById("filterTier");
const customerTableBody = document.getElementById("customerTable");

const statTotal = document.getElementById("statTotal");
const statNew = document.getElementById("statNew");
const statReturn = document.getElementById("statReturn");

// ================== LOAD ==================
async function loadCustomers() {
    try {
        customers = await getCustomers();
        applyFilters();
        updateStats();
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

function updateStats() {
    if (!statTotal) return;
    statTotal.textContent = customers.length;

    const now = new Date();
    const newThisMonth = customers.filter(c => {
        if (!c.createdAt) return false;
        const d = new Date(c.createdAt);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    statNew.textContent = newThisMonth;

    const returning = customers.filter(c => (c.totalOrders || 0) > 1).length;
    const rate = customers.length ? Math.round((returning / customers.length) * 100) : 0;
    statReturn.textContent = `${rate}%`;
}

// ================== FILTER / SEARCH ==================
function applyFilters() {
    const keyword = (searchInput?.value || "").toLowerCase().trim();
    const tier = filterTier?.value || "";

    const filtered = customers.filter(c => {
        const matchesKeyword =
            !keyword ||
            (c.name || "").toLowerCase().includes(keyword) ||
            (c.email || "").toLowerCase().includes(keyword) ||
            (c.phone || "").toLowerCase().includes(keyword);

        const matchesTier = !tier || c.tier === tier;

        return matchesKeyword && matchesTier;
    });

    renderCustomers(filtered);
}

searchInput?.addEventListener("keyup", applyFilters);
filterTier?.addEventListener("change", applyFilters);

// ================== MODAL ==================
function openModal() {
    modalOverlay.classList.add("active");
}

function closeModal() {
    modalOverlay.classList.remove("active");
    currentId = null;
}

// Close on backdrop click (but not when clicking inside the modal box)
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) closeModal();
});

btnCancel.addEventListener("click", closeModal);
btnCloseModal.addEventListener("click", closeModal);

// ================== ADD ==================
btnAddCustomer.addEventListener("click", () => {
    currentId = null;
    modalTitle.textContent = "Thêm khách hàng";
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    tierInput.value = "gold";
    openModal();
});

// ================== SAVE (ADD or UPDATE) ==================
btnSaveCustomer.addEventListener("click", saveCustomer);

async function saveCustomer() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const tier = tierInput.value;

    if (!name || !email || !phone) {
        alert("Vui lòng nhập đầy đủ Tên, Email và Số điện thoại");
        return;
    }

    const customer = { name, email, phone, tier };

    btnSaveCustomer.disabled = true;
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
    } finally {
        btnSaveCustomer.disabled = false;
    }
}

// ================== EDIT / DELETE (event delegation) ==================
customerTableBody.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;

    const id = btn.dataset.id;
    const action = btn.dataset.action;

    if (action === "edit") {
        editCustomer(id);
    } else if (action === "delete") {
        removeCustomer(id);
    }
});

function editCustomer(id) {
    const customer = customers.find(c => String(c.id) === String(id));
    if (!customer) return;

    currentId = id;
    modalTitle.textContent = "Sửa khách hàng";
    nameInput.value = customer.name || "";
    emailInput.value = customer.email || "";
    phoneInput.value = customer.phone || "";
    tierInput.value = customer.tier || "gold";
    openModal();
}

async function removeCustomer(id) {
    if (!confirm("Bạn có chắc muốn xóa khách hàng này?")) {
        return;
    }
    try {
        await deleteCustomer(id);
        await loadCustomers();
    } catch (error) {
        alert(error.message);
    }
}

// ================== INIT ==================
loadCustomers();