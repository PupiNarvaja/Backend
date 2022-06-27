console.log("Esta siendo leido el bundle index.js")

function cookieParser() {
  return (document.cookie || "").split("; ").reduce((obj, cookie) => {
    const [name, value] = cookie.split("=");
    obj[name] = decodeURI(value);
    return obj;
  }, {});
}

const root = document.getElementById("root")

const objCookies = cookieParser()

// console.log(objCookies)

const addToCart = async (prodId)  => {
    const res = await fetch(`/api/cart/${prodId}`, {
        method: 'POST'
    })

    if (res.status !== 200) {
        return
    }

    // Funct to update cart counter.
}

fetch("/api/products", {
    headers: { authorization: `Bearer ${objCookies.token}` }
})
.then(res => res.json())
.then(data => {
    if (!root) {
        return
    }
    data.forEach(prod => {
        root.innerHTML += `
        <div class="m-10">
            <div class="w-64 h-80 mb-4 flex items-center overflow-hidden">
                <img src=${prod.img}>
            </div>
            <p class="text-center archivo">${prod.title}</p>
            <p class="text-center archivo">$${prod.price}</p>
            <button onclick="addToCart('${prod._id}')" class="py-2 px-4 mx-auto block cursor-pointer hover:underline hover:underline-offset-2 archivo">Add to cart</button>
        </div>`
    })
})
.catch(e => console.log(e))