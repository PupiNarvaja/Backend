console.log("Esta siendo leido el cart.js")
fetch("/api/cart")
.then(res => res.json())
.then(data => {
    if (data.length === 0) {
        rootCart.innerHTML = `<p class="m-10">It seems like your cart is empty.</p>`
        return 
    }
    data.forEach(prod => {
        rootCart.innerHTML += `
        <div class="m-10">
            <div class="w-64 h-80 mb-4 flex items-center overflow-hidden">
                
            </div>
            <p class="text-center archivo">${prod.title}</p>
            <p class="text-center archivo">$${prod.price}</p>
        </div>`
    })
})
.catch(e => console.log(e))
//<img src=${prod.img}>