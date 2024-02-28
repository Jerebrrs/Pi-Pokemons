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

                <h2>Your path like</h2>
                <h2>Pokemon Trainer</h2>
                <Link to='/home'>
                    <button className={stylos.butn}>Starts</button>
                </Link>

            </div>

        </div>
    )
}

export default Landing;