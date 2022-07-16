import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useUserContext } from "../../Contexts/UserContext"
import "./HomeContainer.css"

const HomeContainer = ({ props }) => {
    const [menu, setMenu] = useState(false)

    const handleToggle = () => {
        setMenu(prev => !prev)
    }

    const { token } = useUserContext()

    const getProducts = () => {
        if (!token) {
            return
        }
        console.log("Desde homeContainer saludo.")
        axios.get("http://localhost:8080/api/products", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    useEffect(getProducts, [token])

    return (
        <>
            <header className="header" id='header'>
                <button id='menuBtn' className={`${menu ? "is-open" : ""}`} onClick={handleToggle} aria-label='open or close menu'><span></span></button>
                <div className={`${menu ? "showMenu" : ""} nav--container`}>
                    <nav id='navbar'>
                        <ul className="nav__ul">
                            <li><Link to="/" onClick={handleToggle}>Shirts</Link></li>
                            <li><Link to="/" onClick={handleToggle}>Jackets</Link></li>
                            <li><Link to="/profile" onClick={handleToggle}>My profile</Link></li>
                            <li><a href="/admin" onClick={handleToggle}>Admin</a></li> {/* Se utiliza <a> para que recargue la pagina y asi verifique si es admin o no. */}
                            <form action="/logout" method="POST">
                                <button type="submit" className="px-6 py-2 text-sm font-semibold rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200">Log out</button>
                            </form>
                        </ul>
                    </nav>
                    <div className='social--container'>
                    <a href='https://www.instagram.com/swypecreativo/' target="_blank" rel='noreferrer noopener' aria-label='Instagram'>
                        Instagran
                    </a>
                    <a href='https://www.facebook.com/swypeestudiocreativo/' target="_blank" rel='noreferrer noopener' aria-label='Facebook'>
                        feibu
                    </a>
                    </div>
                </div>
                <Link to="/" className="logo-link z-40">
                    LOGO
                </Link>
                <div className="flex items-center"><Link to="/cart"><img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/28/000000/external-shopping-bag-interface-kiranshastry-lineal-kiranshastry.png"/></Link></div>
            </header>
            { props }
        </>
    )
}

export default HomeContainer