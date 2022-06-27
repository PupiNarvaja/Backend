import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import "./HomeContainer.css"

const HomeContainer = ({ props }) => {
    const [menu, setMenu] = useState(false)

    const handleToggle = () => {
        setMenu(prev => !prev)
    }

    return (
        <>
            <header className="header" id='header'>
                <button id='menuBtn' className={`${menu ? "is-open" : ""}`} onClick={handleToggle} aria-label='open or close menu'><span></span></button>
                <div className={`${menu ? "showMenu" : ""} nav--container`}>
                    <nav id='navbar'>
                        <ul className="nav__ul">
                            <li><Link to="/estudio" onClick={handleToggle}>El Estudio</Link></li>
                            <li><Link to="/servicios" onClick={handleToggle}>Servicios</Link></li>
                            <li><Link to="/equipo" onClick={handleToggle}>El Equipo</Link></li>
                            <li><Link to="/clientes" onClick={handleToggle}>Clientes</Link></li>
                            <li><Link to="/contacto" onClick={handleToggle}>Contacto</Link></li>
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