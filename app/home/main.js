import { get } from "../login/api.js"
const init = async () => {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")

    if (!accessToken || !refreshToken) {
        window.location.href = "./login/index.html"
    }

    try {
        // API lấy danh sách đơn hàng
        const orders = await get("orders")
        console.log(orders)

        // =========================================================
        // TÍNH TỔNG DOANH THU
        const totalRevenue = orders.reduce((sum, order) => {
            const amount = order.amount || 0;
            const price = (order.product && order.product.price) || 0;
            return sum + (amount * price);
        }, 0);

        const revenueEl = document.querySelector("#stat-revenue");
        if (revenueEl) {
            revenueEl.innerText = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(totalRevenue);
        }
        // =========================================================
        // ĐƠN MỚI HÔM NAY

        // Lấy ra chuỗi ngày hôm nay định dạng YYYY-MM-DD
        const todayStr = new Date().toLocaleDateString('en-CA');

        const todayOrders = orders.filter(order => order.date === todayStr);

        const newOrdersCount = todayOrders.length;

        const newOrdersEl = document.querySelector("#stat-new-orders");
        if (newOrdersEl) {
            newOrdersEl.innerText = newOrdersCount;
        }

        // =========================================================
        // ĐƠN HÀNG GẦN ĐÂY
        const tableBody = document.querySelector("#recent-orders-table");
        if (tableBody) {
            const htmlRows = orders.map(order => {
                const amount = order.amount || 0;
                const price = (order.product && order.product.price) || 0;
                const totalMoney = amount * price;

                const formattedMoney = new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                }).format(totalMoney);

                return `
          <tr>
            <td>${order.date}</td>
            <td>ORD-#${order.id}</td>
            <td>${order.customer.name}</td>
            <td><span class="status">${order.status}</span></td>
            <td>${formattedMoney}</td>
          </tr>
        `;
            }).join("");

            tableBody.innerHTML = htmlRows;
        }

    } catch (error) {
        console.error("Lỗi khi xử lý dữ liệu Dashboard:", error);
    }
}
init()

const onLogout = () => {

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    window.location.href = "./login/index.html"
}

const logoutButton = document.querySelector(".logout");
if (logoutButton) {
    logoutButton.addEventListener("click", onLogout);
}


