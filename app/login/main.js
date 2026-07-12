import { login } from "./api.js"

const onLogin = async () => {
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    if (!email || !password) {
        alert("Enter Email and Password")
        return
    }
    try {
        const data = await login(email, password)

        if (!data || !data.accessToken || !data.refreshToken) {
            alert("Đăng nhập thất bại! Không nhận được mã xác thực từ hệ thống.");
            return;
        }
        const { accessToken, refreshToken } = data
        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("refreshToken", refreshToken)

        window.location.href = "../index.html"

    } catch (error) {
        console.error("Lỗi hệ thống khi đăng nhập:", error.message);
        alert("Đăng nhập thất bại: " + error.message);
    }
}


const button = document.querySelector(".btn")
button.addEventListener("click", onLogin)