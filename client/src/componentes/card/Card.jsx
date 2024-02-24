import React from 'react';
import stylos from '../card/Card.module.css';
import { Link } from 'react-router-dom';


const Card = ({ id, name, image, typesImg, types, imgDbPokemon, crateInDb, }) => {


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
                    {/* {typesImg.map((typeImg, index) => (
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
                    ))} */}
                    {crateInDb
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

// {
//     crateInDb
//         ? Types?.map((type) => (
//             <div className={style.types} key={`${type.name} ${id}`}>
//                 {imgDbPokemon[0]?.url ? (
//                     imgDbPokemon[0]?.type === type.name ? (
//                         <img
//                             src={imgDbPokemon[0].url}
//                             alt={imgDbPokemon[0].url}
//                         />
//                     ) : (
//                         <img
//                             src={imgDbPokemon[1].url}
//                             alt={imgDbPokemon[1].url}
//                         />
//                     )
//                 ) : null}
//                 <p>{type.name}</p>
//             </div>
//         ))
//         : types?.map((type) => (
//             <div className={style.types} key={`${type} ${id}`}>
//                 {typesImg[0]?.type === type ? (
//                     <img src={typesImg[0].url} alt={typesImg[0].url} />
//                 ) : null}
//                 {typesImg[1]?.type === type ? (
//                     <img src={typesImg[1].url} alt={typesImg[1].url} />
//                 ) : null}
//                 <p className={style.types} key={`${name} ${type}`}>
//                     {type}
//                 </p>
//             </div>
//         ))
// }