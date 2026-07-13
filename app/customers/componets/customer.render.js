export function renderCustomers(customers) {

    const table = document.getElementById("customerTable");
    table.innerHTML = "";

    customers.forEach(customer => {

        table.innerHTML += `
        <tr>

            <td>${customer.id}</td>

            <td>
                <strong>${customer.name}</strong>
            </td>

            <td>
                ${customer.email}
                <br>
                <small>${customer.phone}</small>
            </td>

            <td>
                <span class="badge-tier">
                    ${(customer.tier || "").toUpperCase()}
                </span>
            </td>

            <td>
                ${customer.totalOrders || 0}
            </td>

            <td>
                ${(customer.totalSpent || 0).toLocaleString()} VNĐ
            </td>

            <td>

                <button
                    onclick="editCustomer(${customer.id})"
                    style="
                        width:30px;
                        height:30px;
                        border:none;
                        border-radius:8px;
                        background:#edf6ff;
                        cursor:pointer;
                        margin-right:8px;
                    "
                >
                    <i class="fa-solid fa-pen-to-square"
                        style="
                            color:#3498db;
                            font-size:18px;
                        ">
                    </i>
                </button>

                <button
                    onclick="removeCustomer(${customer.id})"
                    style="
                        width:30px;
                        height:30px;
                        border:none;
                        border-radius:8px;
                        background:#fdeeee;
                        cursor:pointer;
                    "
                >
                    <i class="fa-solid fa-trash"
                        style="
                            color:#e74c3c;
                            font-size:18px;
                        ">
                    </i>
                </button>

            </td>

        </tr>
        `;
    });

}