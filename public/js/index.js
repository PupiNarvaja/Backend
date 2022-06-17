console.log("Esta siendo leido el script index.js")

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

fetch("/api/products", {
    headers: { authorization: `Bearer ${objCookies.token}` }
})
.then(res => res.json())
.then(data => {
    data.forEach(prod => {
        root.innerHTML += `
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