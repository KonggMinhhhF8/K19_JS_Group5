const init = async () => {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")

    if (!accessToken || !refreshToken) {
        window.location.href = "http://127.0.0.1:5501/app/login/index.html"
    }


}
init()