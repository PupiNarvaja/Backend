fetch("/cart")
.then(res => res.json())
.then(data => {
    data.forEach(prod => {
        rootCart.innerHTML += `
        <div class="m-10">
            <div class="w-64 h-80 mb-4 flex items-center overflow-hidden">
                <img src=${prod.img}>
            </div>
            <p class="text-center archivo">${prod.title}</p>
            <p class="text-center archivo">$${prod.price}</p>
        </div>`
    })
})
.catch(e => console.log(e))