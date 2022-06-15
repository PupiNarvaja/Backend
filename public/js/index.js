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

console.log(objCookies)

fetch("/api/products", {
    headers: { authorization: `Bearer ${objCookies.token}` }
})
.then(res => res.json())
.then(data => {
    data.forEach(prod => {
        root.innerHTML += `
        <div>
            <div>${prod.title}</div>
            <div>${prod.price}</div>
            <div>${prod.description}</div>
        </div>`
    })
})
.catch(e => console.log(e))