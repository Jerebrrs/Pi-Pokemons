import React from 'react';
import stylos from '../card/Card.module.css';
import { Link } from 'react-router-dom';


const Card = ({ id, name, image, typesImg, types, imgDbPokemon, createdInDb, }) => {


    return (

        <Link className={stylos.linkCard} to={`pokemons/${id}`}>

            <div className={stylos.mainContainer}>
                <h2 className={stylos.pokeName}>{name}</h2>

                <img className={stylos.imgPokemon} src={image} alt={image} />


                <p>Pokedex:{id}</p>
                <p></p>
                <div className={stylos.containerTypes}>

                    {createdInDb
                        ? types?.map((type) => (
                            <div className={stylos.types} key={`${type.name} ${id}`}>
                                {imgDbPokemon[0]?.url ? (
                                    imgDbPokemon[0]?.type === type.name ? (
                                        <img
                                            src={imgDbPokemon[0].url}
                                            alt={imgDbPokemon[0].url}
                                        />
                                    ) : (
                                        <img
                                            src={imgDbPokemon[1].url}
                                            alt={imgDbPokemon[1].url}
                                        />
                                    )
                                ) : null}
                                <p>{type.name}</p>
                            </div>
                        ))
                        : types?.map((type) => (
                            <div className={stylos.types} key={`${type} ${id}`}>
                                {typesImg[0]?.type === type ? (
                                    <img src={typesImg[0].url} alt={typesImg[0].url} />
                                ) : null}
                                {typesImg[1]?.type === type ? (
                                    <img src={typesImg[1].url} alt={typesImg[1].url} />
                                ) : null}
                                <p className={stylos.types} key={`${name} ${type}`}>
                                    {type}
                                </p>
                            </div>
                        ))}
                </div>
            </div>

        </Link>

    );
};

export default Card;
