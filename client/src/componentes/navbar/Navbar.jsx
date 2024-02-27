import React from 'react'
import stylos from '../navbar/Navbar.module.css'
import { Link } from "react-router-dom"
import logo from '../../Imagenes/Logo.png'
import Searchbar from '../searchbar/Searchbar'
function Navbar({ paginado }) {


    return (
        <div className={stylos.body}>
            <div className={stylos.logo}>
                <Link to='/'>
                    <img className={stylos.logo} src={logo} alt='logo' />
                </Link>

            </div>
            <div className={stylos.links}>
                <Link className={stylos.button} to="/">LANDING</Link>
                <Link className={stylos.button} to={"/create"}>CREAR</Link>
                <Link className={stylos.button} to={"/about"}>ABOUT</Link>
            </div>
            <div>
                <Searchbar paginado={paginado} />
            </div>
        </div>
    )
}

export default Navbar;