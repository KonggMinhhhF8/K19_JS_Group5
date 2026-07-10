// export function renderCustomers(customers){
//
//     const table =
//
//         document.getElementById(
//
//             "customerTable"
//
//         );
//
//     table.innerHTML="";
//
//
//     customers.forEach(customer=>{
//
//         table.innerHTML += `
//
// <tr>
//
// <td>${customer.name}</td>
//
// <td> ${customer.email}
//  <br>
//  <small>${customer.phone}</small></td>
//
// <td>${customer.tier||''}</td>
//
// <td> ${customer.totalOrders || 0}</td>
//
// <td> ${customer.totalSpent || 0} VNĐ</td>
//
// <td>
// <button onclick="editCustomer(${customer.id})"
//                     style="
//                         width:25px;
//                         height:25px;
//                         border:none;
//                         border-radius:8px;
//                         background:#edf6ff;
//                         cursor:pointer;
//                         margin-right:8px;">
//                     <i
//                         class="fa-solid fa-pen-to-square"
//                         style="
//                             color:#3498db;
//                             font-size:18px;
//                         "
//                     ></i>
//                 </button>
//
//                 <button onclick="removeCustomer(${customer.id})"
//                     style="
//                         width:25px;
//                         height:25px;
//                         border:none;
//                         border-radius:8px;
//                         background:#fdeeee;
//                         cursor:pointer;
//                     "
//                 >
//                     <i
//                         class="fa-solid fa-trash"
//                         style="
//                             color:#e74c3c;
//                             font-size:18px;
//                         "
//                     ></i>
//                 </button>
// </td>
//
// </tr>
//
// `;
//
//     });
//
//
// }