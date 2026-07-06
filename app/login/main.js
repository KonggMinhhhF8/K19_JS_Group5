import { login } from "./api.js"

const onLogin = async () => {
    const username = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    console.log(username, password)
    const response = await login(username, password)

    const { accessToken, refreshToken } = response

    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
    window.location.href = "http://127.0.0.1:5501/app/index.html"

}


const button = document.querySelector(".btn")
button.addEventListener("click", onLogin)