import React from 'react'
import { Link } from "react-router-dom";
import stylos from "../landing/Landing.module.css"
import pika from '../../Imagenes/pika.png'


function Landing() {
    return (

        <div className={stylos.container}>

            <div className={stylos.infoContainer}>

                <div >
                    <img className={stylos.img} src={pika} alt='pika' />
                </div>

                <h2>Tu camino como</h2>
                <h2>Entrenador Pokemons</h2>
                <Link to='/home'>
                    <button className={stylos.butn}>Comienza</button>
                </Link>

            </div>

        </div>
    )
}

export default Landing;