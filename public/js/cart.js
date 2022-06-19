console.log("Esta siendo leido el cart.js")

const deleteProduct = async (prodId) => {
    const res = await fetch(`/api/cart/${prodId}`, {
        method: 'DELETE'
    })

    if (res.status !== 200) {
        return
    }

    const product = document.getElementById(prodId)
    product.parentNode.removeChild(product)

    // Funct to update cart counter.
}

fetch("/api/cart")
.then(res => res.json())
.then(data => {
    if (data.length === 0) {
        rootCart.innerHTML = `<p class="m-10">It seems like your cart is empty.</p>`
        return 
    }
    data.forEach(prod => {
        rootCart.innerHTML += `
        <tr id="${prod.id}">
            <td class="p-2">
                <div class="w-36 h-40 mb-4 flex items-center overflow-hidden">
                    <img src=${prod.img} class="max-w-16">
                </div>
            </td>
            <td class="p-2">
                <div class="font-medium text-gray-800">
                    <h4>${prod.title}</h4> <br>
                    <p class="max-w-[25rem] text-gray-400 font-extralight">${prod.description}</p>
                </div>
            </td>
            <td class="p-2">
                <div class="text-left">
                    <button type="button" class="text-xl leading-[0px] w-6 h-6 rounded-full hover:text-blue-600 hover:bg-gray-100">-</button>
                    ${prod.quantity}
                    <button type="button" class="text-xl leading-[0px] w-6 h-6 rounded-full hover:text-blue-600 hover:bg-gray-100">+</button>
                </div>
            </td>
            <td class="p-2">
                <div class="text-left font-medium text-green-500">
                    $${prod.quantity * prod.price}
                </div>
            </td>
            <td class="p-2">
                <div class="flex justify-center">
                    <button type="button" onclick="deleteProduct('${prod.id}')">
                        <svg class="w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                            </path>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>`
    })
})
.catch(e => console.log(e))