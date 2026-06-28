const API_URL =
    "https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com/customers";
const TOKEN =
    localStorage.getItem("token");
const headers = {
    Authorization:`Bearer ${TOKEN}`,
    "Content-Type":"application/json"
};

export const customerService={
    async getAll(){
        const res = await fetch(
            API_URL,
            {headers}
        );
        return await res.json();

    },


    async create(data){
        const res = await fetch(
            API_URL,
            {
                method:"POST",
                headers,
                body:JSON.stringify(data)
            }
        );
        return await res.json();
    },

    async update(id,data){
        const res = await fetch(
            `${API_URL}/${id}`,
            {
                method:"PUT",
                headers,
                body:JSON.stringify(data)
            }
        );
        return await res.json();
    },

    async delete(id){
        const res = await fetch(
            API_URL,
            {
                method:"DELETE",
                headers,
                body:JSON.stringify({
                    id
                })
            }
        );
        return await res.json();
    }
};