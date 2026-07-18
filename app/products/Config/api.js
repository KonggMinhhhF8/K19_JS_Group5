const BASE_URL = "https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com/products";
const AUTH_URL = "https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com/auth";

const getToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
    }
};

if (!getToken()) {
    localStorage.setItem("accessToken", "ACCESS_TOKEN_MOI");
    localStorage.setItem("refreshToken", "REFRESH_TOKEN_MOI");
}

async function safeParseJSON(response) {
    const text = await response.text();
    if (!text) return {};
    try {
        return JSON.parse(text);
    } catch {
        return {};
    }
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

    let data = await safeParseJSON(response);
    console.log("Status:", response.status);
    console.log("Response:", data);

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

        data = await safeParseJSON(response);
    }

    if (!response.ok) {
        throw new Error(data.message);
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