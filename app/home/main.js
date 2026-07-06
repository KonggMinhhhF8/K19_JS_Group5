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
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            console.error("Token không hợp lệ hoặc đã hết hạn.");
            return;
        }

        const orders = await response.json();

        // =========================================================
        // TÍNH TỔNG DOANH THU
        const totalRevenue = orders.reduce((sum, order) => {
            const amount = order.amount || 0;
            const price = (order.product && order.product.price) || 0;
            return sum + (amount * price);
        }, 0);

        // Render
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

        // Render
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
            <td>#${order.id}</td>
            <td>${order.customer ? order.customer.name : 'Không rõ'}</td>
            <td>${formatStatus(order.status)}</td>
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


function formatStatus(status) {
    switch (status) {
        case 'delivered':
        case 'success':
            return `<span class="status success">Thành công</span>`;
        case 'delivering':
            return `<span class="status delivering">Đang giao</span>`;
        case 'pending':
            return `<span class="status pending">Chờ xử lý</span>`;
        default:
            return `<span class="status">${status}</span>`;
    }
}