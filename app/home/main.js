const init = async () => {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")

    if (!accessToken || !refreshToken) {
        window.location.href = "http://127.0.0.1:5501/app/login/index.html"
    }


}
init()

// Hàm xử lý hiển thị trạng thái phù hợp với CSS Dashboard của bạn
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

// Hàm render bảng đơn hàng gần đây từ API (Yêu cầu accessToken)
async function renderRecentOrders() {
    try {
        // 1. Lấy accessToken từ localStorage
        const token = localStorage.getItem("accessToken");

        // Nếu chưa có token (chưa đăng nhập), có thể chuyển hướng về trang login hoặc dừng hàm
        if (!token) {
            console.error("Không tìm thấy accessToken. Vui lòng đăng nhập lại!");
            // window.location.href = "/login/index.html"; // Mở dòng này nếu muốn ép chuyển hướng
            return;
        }

        // 2. Gọi API lấy danh sách đơn hàng kèm theo Header Authorization
        const response = await fetch("https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com/orders", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Gửi token lên server ở đây
            }
        });

        // Kiểm tra nếu token hết hạn hoặc không hợp lệ (Mã 401 Unauthorized)
        if (response.status === 401) {
            console.error("Token không hợp lệ hoặc đã hết hạn.");
            return;
        }

        const orders = await response.json();

        // 3. Lấy thẻ tbody dựa vào ID đã thêm ở HTML
        const tableBody = document.querySelector("#recent-orders-table");
        if (!tableBody) return;

        // 4. Duyệt mảng dữ liệu và tạo chuỗi các dòng <tr>
        const htmlRows = orders.map(order => {
            // Tính toán tổng tiền an toàn
            const amount = order.amount || 0;
            const price = (order.product && order.product.price) || 0;
            const totalMoney = amount * price;

            // Định dạng tiền tệ VND (Ví dụ: 40.000.000 ₫)
            const formattedMoney = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(totalMoney);

            // Trả về cấu trúc <tr> đúng hệt như HTML mẫu của bạn
            return `
        <tr>
          <td>#${order.id}</td>
          <td>${order.customer ? order.customer.name : 'Không rõ'}</td>
          <td>${formatStatus(order.status)}</td>
          <td>${formattedMoney}</td>
        </tr>
      `;
        }).join("");

        // 5. Gán chuỗi HTML vào trong tbody để hiển thị lên màn hình
        tableBody.innerHTML = htmlRows;

    } catch (error) {
        console.error("Lỗi khi render bảng đơn hàng:", error);
    }
}
// renderRecentOrders()
// Kích hoạt hàm chạy khi trang web tải xong cấu trúc HTML
// document.addEventListener("DOMContentLoaded", renderRecentOrders);


async function renderDashboardStatsAndOrders() {
    try {
        // 1. Lấy token từ localStorage
        const token = localStorage.getItem("accessToken");
        if (!token) {
            console.error("Không tìm thấy accessToken. Vui lòng đăng nhập lại!");
            return;
        }

        // 2. Gọi API lấy danh sách đơn hàng
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

        const orders = await response.json(); // Đây là mảng chứa tất cả đơn hàng từ API

        // =========================================================
        // LÓGIC 1: TÍNH TỔNG DOANH THU (Cộng dồn toàn bộ đơn hàng)
        // =========================================================
        const totalRevenue = orders.reduce((sum, order) => {
            const amount = order.amount || 0;
            const price = (order.product && order.product.price) || 0;
            return sum + (amount * price);
        }, 0);

        // Render Doanh thu lên giao diện (Định dạng VND: 40.000.000 ₫)
        const revenueEl = document.querySelector("#stat-revenue");
        if (revenueEl) {
            revenueEl.innerText = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(totalRevenue);
        }

        // =========================================================
        // LÓGIC 2: ĐẾM ĐƠN MỚI (Lấy số lượng từ tối đa 10 đơn mới nhất)
        // =========================================================
        // Trích xuất tối đa 10 đơn hàng đầu tiên (mới nhất) trong mảng
        const recent10Orders = orders.slice(0, 10);
        const newOrdersCount = recent10Orders.length;

        // Render số lượng Đơn mới lên giao diện
        const newOrdersEl = document.querySelector("#stat-new-orders");
        if (newOrdersEl) {
            newOrdersEl.innerText = newOrdersCount;
        }

        // =========================================================
        // LÓGIC 3: RENDER BẢNG ĐƠN HÀNG GẦN ĐÂY (Giữ nguyên từ bài trước)
        // =========================================================
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
renderDashboardStatsAndOrders()