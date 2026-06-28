let customers = [];
let currentId = null;
    const modal = document.getElementById("modal");
    const btnAddCustomer = document.getElementById("btnAddCustomer");
    const btnSaveCustomer = document.getElementById("btnSaveCustomer");

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const tierInput = document.getElementById("tier");
    btnAddCustomer.addEventListener("click", () => {
        modal.style.display = "flex";
    })
        btnSaveCustomer.addEventListener("click", async ()=>{
            if(currentId){
                await updateCustomer();
            }else{
                await addCustomer();
            }
        })




const API_URL = "https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com/customers";
    const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJrMTgtc3RvcmUiLCJzdWIiOiIxIiwiZXhwIjoxNzgyNjY2OTEwLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzgyNjY2MzEwLCJlbWFpbCI6ImJhbmd0eEB0ZXN0LmNvbSJ9.hoME657iKau53HclQVx7k_AUyJ4aefB9LgExGGT2ha0"
     const customerTable = document.getElementById("customerTable");
    async function getCustomers() {
        try {
            const response = await fetch(API_URL, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            });
            customers = await response.json();
            console.log(customers);
            renderCustomer(customers);
        } catch (err) {
            console.log(err);
        }
    }
    getCustomers();


     function renderCustomer(customers) {
         const table = document.getElementById("customerTable");
         table.innerHTML = "";
         customers.forEach(customer => {
             table.innerHTML += `
             <tr>
<td>${customer.name}</td>

<td>
${customer.email}<br>
${customer.phone}
</td>

<td>${customer.tier || '-'}</td>

<td>${customer.orders || 0}</td>

<td>${customer.totalSpent || 0}đ</td>

<td>
<button class="btn-action"
onclick="editCustomer(${customer.id})">

<i class="fa-solid fa-pen-to-square"
style="color:#3498db"></i>

</button>

<button class="btn-action"
onclick="deleteCustomer(${customer.id})">

<i class="fa-solid fa-trash"
style="color:red"></i>

</button>

</td>

</tr>
             
             `;
         })
     }

function editCustomer(id){

    currentId = id;

    const customer = customers.find(
        customer => customer.id === id
    );

    nameInput.value = customer.name;
    emailInput.value = customer.email;
    phoneInput.value = customer.phone;

    modal.style.display = "flex";

}



     function closeModal() {
         modal.style.display = "none";
     }

     async function addCustomer() {
         const customer = {
             name:nameInput.value,
             email:emailInput.value,
             phone:phoneInput.value,
             tier:tierInput.value,
         };
         console.log(customer);
         const response = await fetch(API_URL, {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
                 Authorization: `Bearer ${TOKEN}`
             },
             body: JSON.stringify(customer)
         });
         console.log(response.status);
         const data = await response.json();
         console.log(data);
         getCustomers();
         closeModal();
     }

    function searchCustomer(){

    }


async function updateCustomer(){

    const customer = {

        name: nameInput.value,

        email: emailInput.value,

        phone: phoneInput.value,

        tier: tierInput.value

    };

    const response = await fetch(
        `${API_URL}/${currentId}`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${TOKEN}`
            },
            body:JSON.stringify(customer)
        }
    );
    const data = await response.json();
    console.log(data);
    currentId = null;
    getCustomers();
    closeModal();
}


async function deleteCustomer(id){

    const ok = confirm("Bạn có chắc muốn xóa?");
    if(!ok) return;

    const response = await fetch(`${API_URL}/${id}`,{
        method:"DELETE",
        headers:{
            Authorization:`Bearer ${TOKEN}`
        }
    });

    console.log(response.status);

    getCustomers();
}
