const BASE_URL = "https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com/customers";
const AUTH_URL = "https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com/auth";

const getToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
    }
};

// ================== AUTH ==================
export async function login(email, password) {
    const response = await fetch(`${AUTH_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || "Email hoặc mật khẩu không đúng");
    }

    return data; // { accessToken, refreshToken }
}

async function refreshAccessToken() {
    const response = await fetch(`${AUTH_URL}/refresh-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            refreshToken: getRefreshToken()
        })
    });

    if (!response.ok) {
        localStorage.clear();
        throw new Error("Phiên đăng nhập hết hạn");
    }

    const data = await response.json();
    setTokens(data.accessToken, data.refreshToken);
    return data.accessToken;
}

async function request(endpoint = "", options = {}) {
    let token = getToken();

    let response = await fetch(`${BASE_URL}/${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...options.headers
        }
    });

    let data = await response.json().catch(() => ({}));

    if (response.status === 401 || data.message === "token expired") {
        token = await refreshAccessToken();
        response = await fetch(`${BASE_URL}/${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...options.headers
            }
        });
        data = await response.json().catch(() => ({}));
    }

    if (!response.ok) {
        throw new Error(data.message || "Đã có lỗi xảy ra");
    }

    return data;
}

export const get = (endpoint = "") => request(endpoint);

export const post = (endpoint = "", body) =>
    request(endpoint, {
        method: "POST",
        body: JSON.stringify(body)
    });

export const put = (endpoint, body) =>
    request(endpoint, {
        method: "PUT",
        body: JSON.stringify(body)
    });

export const del = (endpoint) =>
    request(endpoint, {
        method: "DELETE"
    });