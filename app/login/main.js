import { login } from "./api.js"

const onLogin = async () => {
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    console.log(email, password)
    const response = await login(email, password)

    const { accessToken, refreshToken } = response

    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
    window.location.href = "http://localhost:63342/K19_JS_Group5/app/index.html?_ijt=hqi2cv0k4o8qakupbq5u5oo0ba&_ij_reload=RELOAD_ON_SAVE"

}


const button = document.querySelector(".btn")
button.addEventListener("click", onLogin)