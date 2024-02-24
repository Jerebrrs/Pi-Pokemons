import React from 'react';
import stylos from '../card/Card.module.css';
import { Link } from 'react-router-dom';


const Card = ({ id, name, image, typesImg, }) => {


    return (

        <Link className={stylos.linkCard} to={`pokemons/${id}`}>

            <div className={stylos.mainContainer}>
                <h2 className={stylos.pokeName}>{name}</h2>

                <img className={stylos.imgPokemon} src={image} alt={image} />


                <p>Pokedex:{id}</p>
                <div className={stylos.containerTypes}>

                    {/* {typesImg.map((typeImg, index) => (
                        <div key={index} className={stylos.typeContainer}>
                            <img
                                src={typeImg.url}
                                alt={typeImg.type}
                                className={stylos.typeLogo}
                            />
                            <p className={stylos.typeName}>{typeImg.type}</p>
                        </div>
                    ))} */}
                    {typesImg.map((typeImg, index) => (
                        <div key={index} className={stylos.typeContainer}>
                            {typeImg && (
                                <>
                                    <img
                                        src={typeImg.url}
                                        alt={typeImg.type}
                                        className={stylos.typeLogo}
                                    />
                                    <p className={stylos.typeName}>{typeImg.type}</p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </Link>

    );
};

export default Card;