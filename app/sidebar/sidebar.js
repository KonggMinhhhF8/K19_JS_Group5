// /sidebar/sidebar.js

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('sidebar-container');

    if (container) {
        // Sử dụng đường dẫn tuyệt đối bắt đầu bằng dấu /app/ (tính từ gốc Server của bạn)
        fetch('/app/sidebar/sidebar.html')
            .then(response => {
                if (!response.ok) throw new Error('Không thể tìm thấy file sidebar.html');
                return response.text();
            })
            .then(data => {
                container.innerHTML = data;

                // Xử lý active menu tự động dựa trên URL hiện tại
                const currentUrl = window.location.href;
                const links = container.querySelectorAll('.nav-link');

                links.forEach(link => {
                    const targetPage = link.getAttribute('href');

                    // Kiểm tra xem URL thanh địa chỉ có chứa đoạn href hay không
                    if (currentUrl.includes(targetPage)) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            })
            .catch(error => console.error('Lỗi khi nạp sidebar:', error));
    }
});