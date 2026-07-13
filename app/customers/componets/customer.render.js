const TIER_LABEL = {
    gold: "VÀNG",
    silver: "BẠC",
    bronze: "ĐỒNG"
};

function getInitials(name = "") {
    return name
        .trim()
        .split(/\s+/)
        .map(w => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export function renderCustomers(customers) {
    const table = document.getElementById("customerTable");
    table.innerHTML = "";

    if (!customers || customers.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; color:#999; padding:30px;">
                    Không có khách hàng nào
                </td>
            </tr>
        `;
        return;
    }

    customers.forEach(customer => {
        const tier = customer.tier || "bronze";
        const tierLabel = TIER_LABEL[tier] || tier.toUpperCase();
        const initials = getInitials(customer.name);

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <div class="cust-info">
                    <div class="avatar">${initials}</div>
                    <div>
                        <strong>${customer.name || ""}</strong><br>
                        <small>ID: ${customer.id}</small>
                    </div>
                </div>
            </td>
            <td>
                ${customer.email || ""}
                <br>
                <small>${customer.phone || ""}</small>
            </td>
            <td><span class="tier ${tier}">${tierLabel}</span></td>
            <td>${customer.totalOrders || 0}</td>
            <td><strong>${(customer.totalSpent || 0).toLocaleString("vi-VN")}đ</strong></td>
            <td>
    <button class="btn-action btn-edit" data-action="edit" data-id="${customer.id}" title="Sửa">
        <i class="fas fa-user-edit"></i>
    </button>
    <button class="btn-action btn-delete" data-action="delete" data-id="${customer.id}" title="Xóa">
        <i class="fas fa-trash"></i>
    </button>
</td>
        `;
        table.appendChild(row);
    });
}