const init = async () => {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")

    if (!accessToken || !refreshToken) {
        window.location.href = "http://127.0.0.1:5501/app/login/index.html"
    }

    try {
        // Gọi API lấy danh sách đơn hàng
        const response = await fetch("https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com/orders", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });
        const orders = await response.json();

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
        // ĐƠN MỚI

        const recent10Orders = orders.slice(0, 10);
        const newOrdersCount = recent10Orders.length;

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
            <td>ORD-#${order.id}</td>
            <td>${order.customer}</td>
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


