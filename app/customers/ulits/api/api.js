const API_URL = "https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com/customers"

const post = async (endpoint, body) => {
    try {
        const response = await fetch(
            `${API_URL}/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
            `${API_URL}/${endpoint}`
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
            method: "DELETE"
        })

        return await response.json()
    } catch (error) {
        alert("delete data failed")
    }
}

export { get, post, put, del, API_URL }