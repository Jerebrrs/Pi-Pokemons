import React from 'react'
import { Link } from "react-router-dom";
import stylos from "../landing/Landing.module.css"
import fondo from '../../Imagenes/pokemonBanner.jpeg'


function Landing() {
    return (
        
        <div className={stylos.container}>
           
            <div className={stylos.right}>
                <h2>Preparados para la aventura??</h2>
                <Link to='/home'>
                    <button className={stylos.butn}>Comenzemos</button>
                </Link>

            </div>

        </div>
    )
}

export default Landing;