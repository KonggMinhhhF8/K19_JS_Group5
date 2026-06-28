export function renderCustomers(
    customers,
    table
){
    table.innerHTML="";
    customers.forEach(customer=>{
        table.innerHTML += `
<tr>
<td>${customer.name}</td>
<td>${customer.email}</td>
<td>${customer.phone}</td>
<td>${customer.tier || ""}</td>
<td>
<button
class="edit"
onclick="editCustomer(${customer.id})"
>
<i class="fa-solid fa-pen"></i>
</button>

<button
class="delete"
onclick="deleteCustomer(${customer.id})"
>
<i class="fa-solid fa-trash"></i>
</button>
</td>
</tr>
`;
    });
}