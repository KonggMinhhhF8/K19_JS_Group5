const API_URL = "https://corsproxy.io/?https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com/customers"
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJrMTgtc3RvcmUiLCJzdWIiOiIxIiwiZXhwIjoxNzgyOTA2MjQ5LCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzgyOTA1NjQ5LCJlbWFpbCI6ImJhbmd0eEB0ZXN0LmNvbSJ9.OHIbDyPiZOr6URy8q2Ft5iuP4m7j667jBDkwX9x74AY'

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
        alert("put data failed")
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