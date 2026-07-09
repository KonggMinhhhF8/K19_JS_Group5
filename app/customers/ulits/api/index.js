const BASE_URL = "https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com/customers"
const AUTH_URL = "https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com/auth"

const API_URL = BASE_URL

const getToken = () => localStorage.getItem('accessToken')
const getRefreshToken = () => localStorage.getItem('refreshToken')

const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken)
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
}

if (!getToken()) {
    localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJrMTgtc3RvcmUiLCJzdWIiOiIxIiwiZXhwIjoxNzgzNjE1NTgwLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzgzNjE0OTgwLCJlbWFpbCI6ImJhbmd0eEB0ZXN0LmNvbSJ9.l6DfHQFYhRYl1kHl2mkcZHwaKV9JPereC6E7SAKbQtE')
    localStorage.setItem('refreshToken', 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJrMTgtc3RvcmUiLCJzdWIiOiIxIiwiZXhwIjoxNzg0MjE5NzgwLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc4MzYxNDk4MH0.5kwZ8OaQnlBu8fC8ZaKcyHtsC7wFcDC2qyhf0Qu61LQ')
}

const refreshAccessToken = async () => {
    try {
        const res = await fetch(`${AUTH_URL}/refresh-token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: getRefreshToken() })
        })

        if (!res.ok) {
            localStorage.clear()
            alert('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại')
            return null
        }

        const data = await res.json()
        setTokens(data.accessToken, data.refreshToken)
        return data.accessToken
    } catch (error) {
        console.log('Refresh error:', error)
        return null
    }
}

const request = async (endpoint, options = {}) => {
    let token = getToken()

    let response = await fetch(`${API_URL}/${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
            "Authorization": `Bearer ${token}`
        }
    })

    let data = await response.json()

    if (response.status === 401 || data?.message === 'token expired') {
        token = await refreshAccessToken()
        if (!token) return null

        response = await fetch(`${API_URL}/${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
                "Authorization": `Bearer ${token}`
            }
        })

        return await response.json()

    }

    return data

}


const post = (endpoint, body) => request(endpoint, { method: "POST", body: JSON.stringify(body) })
const get = (endpoint) => request(endpoint)
const put = (endpoint, body) => request(endpoint, { method: "PUT", body: JSON.stringify(body) })
const del = (endpoint) => request(endpoint, { method: "DELETE" })

export { get, post, put, del, API_URL, setTokens }