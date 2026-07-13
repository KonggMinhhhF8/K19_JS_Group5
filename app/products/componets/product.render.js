export function renderProducts(products){

    const table =
        document.getElementById("productTableBody");
    table.innerHTML = "";
    products.forEach(product=>{
        table.innerHTML += `
<tr>

<td>
<img
src="${product.imageUrl || 'https://picsum.photos/50'}"
class="img-thumb"></td>
<td><strong>${product.name}</strong>
<br>
<small>
SKU :
${product.sku || ''}
</small>
</td

<td>${product.category?.name || product.category || ''}</td>
<td>${Number(product.price).toLocaleString()}
đ
</td>
<td>${product.remaining ?? 0}</td>

<td>

<button onclick="window.location.href='create.html?id=${product.id}'"
                    style="
                        width:25px;
                        height:25px;
                        border:none;
                        border-radius:8px;
                        background:#edf6ff;
                        cursor:pointer;
                        margin-right:8px;">
                    <i class="fa-solid fa-pen-to-square"
                        style="
                            color:#3498db;
                            font-size:18px;
                        "
                    ></i>
                </button>

                <button onclick="removeProduct('${product.id}')"
                    style="
                        width:25px;
                        height:25px;
                        border:none;
                        border-radius:8px;
                        background:#fdeeee;
                        cursor:pointer;">
                        
                    <i class="fa-solid fa-trash"
                        style="color:#e74c3c;
                            font-size:18px;"></i>
                </button>
</td>
</tr>
`;
    });
}