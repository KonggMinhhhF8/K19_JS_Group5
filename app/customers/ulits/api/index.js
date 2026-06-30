const API_URL = "https://corsproxy.io/?https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com/customers"
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJrMTgtc3RvcmUiLCJzdWIiOiIxIiwiZXhwIjoxNzgyNzg4NTM5LCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzgyNzg3OTM5LCJlbWFpbCI6ImJhbmd0eEB0ZXN0LmNvbSJ9.vm6-jWnCySP14s0t9pNHd4-HfP9n2b6mkhQz6-MrGdM'

const post = async (endpoint, body) => {
    try {
        const response = await fetch(
            `${API_URL}/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${TOKEN}`
                },
                body : JSON.stringify(body)
            }
        )
        return await response.json()
    } catch (error) {
        alert ('post data failed')
    }
}
const get = async (endpoint) => {
    try {
        const response = await fetch(
            `${API_URL}/${endpoint}`, {
                headers: {
                    "Authorization": `Bearer ${TOKEN}`
                }
            }
        )
        return await response.json()
    } catch (error) {
        alert ('get data failed')
    }
}

const put = async (endpoint, body) => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },
            body: JSON.stringify(body)
        })

        return await response.json()
    } catch (error) {
        alert("patch data failed")
    }
}

const del = async (endpoint) => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: "DELETE",
            headers: {
            "Authorization": `Bearer ${TOKEN}`
            }
        })

        return await response.json()
    } catch (error) {
        alert("delete data failed")
    }
}

export { get, post, put, del, API_URL, TOKEN }