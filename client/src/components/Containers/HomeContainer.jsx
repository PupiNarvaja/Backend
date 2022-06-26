import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";

const HomeContainer = ({ props }) => {    
    return (
        <>
            <header className="w-full h-16 m-auto border-b-2 flex">
                <div className="w-[70%] m-auto flex justify-between items-center">
                    <h2>LOGO</h2>
                    <nav className="w-72">
                        <ul className="flex justify-between">
                            <li>LINK 1</li>
                            <li>LINK 2</li>
                            <li>LINK 3</li>
                            <li><Link to="/cart"><img src="https://img.icons8.com/external-jumpicon-glyph-ayub-irawan/32/undefined/external-cart-e-commerce-jumpicon-glyph-jumpicon-glyph-ayub-irawan-3.png"/></Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
            { props }
        </>
    )
}

export default HomeContainer