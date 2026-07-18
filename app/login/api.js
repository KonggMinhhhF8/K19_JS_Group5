const API_URL = 'https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com'
// const API_URL = 'https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com/auth/signin'


const getNewAccessToken = async () => {
    const storedRefreshToken = localStorage.getItem('refreshToken')
    if (!storedRefreshToken) {
        throw new Error('No refresh token found');
    }

    try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refreshToken: storedRefreshToken
            })
        })
        if (!response.ok) {
            throw new Error('Refresh token expired or invalid');
        }

        const data = await response.json()

        const { accessToken, refreshToken: newRefreshToken } = data
        if (accessToken && newRefreshToken) {
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', newRefreshToken)
            return accessToken
        }
    } catch (error) {
        console.error("Xử lý refresh token thất bại:", error);
        // Thực tế: Thường sẽ clear localStorage và đá người dùng về trang login ở đây
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        throw error;
    }
}

const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Đăng nhập thất bại');
        }

        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.error("Lỗi đăng nhập:", error.message);
        throw error; // Ném lỗi ra ngoài để UI nhận biết và hiển thị cho user
    }
}

const post = async (endpoint, body) => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
        throw new Error('Chưa đăng nhập hoặc thiếu accessToken');
    }
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(body)
        }
        )

        if (response.status === 401) {
            await getNewAccessToken()
            return await post(endpoint, body)
        }

        return await response.json()
    } catch (error) {
        console.error(`Lỗi khi gọi API tại [POST] ${endpoint}:`, error.message);
        throw error;
    }
}

const get = async (endpoint) => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
        throw new Error('Chưa đăng nhập hoặc thiếu accessToken');
    }

    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        if (response.status === 401) {
            await getNewAccessToken()
            return await get(endpoint)
        }

        return await response.json()
    } catch (error) {
        console.error(`Lỗi khi gọi API tại [GET] ${endpoint}:`, error.message);
        throw error;
    }
}

const put = async (endpoint, body) => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
        alert('put data failed')
        return
    }

    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(body)
        }
        )

        // if (response.status === 401) {
        //     await getNewAccessToken()
        //     return await post(endpoint, body)
        // }

        return await response.json()
    } catch {
        alert('get data failed')
    }
}

const del = async (endpoint, body) => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
        alert('delete data failed')
        return
    }

    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(body)
        }
        )

        // if (response.status === 401) {
        //     await getNewAccessToken()
        //     return await post(endpoint, body)
        // }

        return await response.json()
    } catch {
        alert('get data failed')
    }
}



export {
    get, post, login, put, del
}