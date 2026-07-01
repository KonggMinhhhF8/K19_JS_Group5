const API_URL = "https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com/orders"
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJrMTgtc3RvcmUiLCJzdWIiOiIxIiwiZXhwIjoxNzgyOTA0NDI4LCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzgyOTAzODI4LCJlbWFpbCI6ImJhbmd0eEB0ZXN0LmNvbSJ9.pP5wLi-2aKe5JxsjhMtKzZY5Tx5-WliaZlGrzLMHk_A'

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