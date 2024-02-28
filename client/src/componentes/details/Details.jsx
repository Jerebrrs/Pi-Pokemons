import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllImgTypes, getPokemonId } from '../../redux/actions';
import { Link, useParams } from 'react-router-dom';
import stylo from './Details.module.css'
import attack from '../../Imagenes/attack.webp'
import defense from '../../Imagenes/defensa.png'
import sped from '../../Imagenes/sped.png'
import altura from '../../Imagenes/height.png'
import hpImg from '../../Imagenes/vida.png'
import kilos from '../../Imagenes/Kilos.png'

function Details() {
  const dispatch = useDispatch();
  const pokeDetail = useSelector((state) => state.pokeDetail);
  const imgTypes = useSelector((state) => state.imgTypes);

  const { id } = useParams();



  useEffect(() => {
    dispatch(getPokemonId(id));
    dispatch(getAllImgTypes());
  }, [dispatch, id])



  const images = pokeDetail
    ? pokeDetail.type?.map((type) => {
      const typeName = typeof type === 'string' ? type : type.name;
      return imgTypes.find((imgType) => imgType.type === typeName);
    })
    : pokeDetail.type?.map((type) => {
      const typeName = typeof type === 'string' ? type : type.name;
      return imgTypes.find((imgType) => imgType.type === typeName);
    });



  return (
    <div className={stylo.mainContainer}>

      <div className={stylo.infoContainer}>
        <Link to={'/home'}>
          <button className={stylo.button}>Home</button>
        </Link>
        <h1>Details Pokemons</h1>

        <h2 className={stylo.pokeName}>{pokeDetail.name}</h2>
        <div className={stylo.statsContainer}>
          <img src={hpImg} alt='hpImg' />
          <h3>HP: {pokeDetail.hp}</h3>
        </div>
        <div className={stylo.statsContainer}>
          <img src={attack} alt='attack' />
          <h3>Attack: {pokeDetail.attack}</h3>
        </div>
        <div className={stylo.statsContainer}>
          <img src={defense} alt='defense' />
          <h3>Defense: {pokeDetail.defense}</h3>
        </div>
        <div>
          <img className={stylo.imgPokemon} src={pokeDetail.image} alt={pokeDetail.image} />
        </div>
        <div className={stylo.statsContainer}>
          <div className={stylo.stats}>
            <img src={altura} alt='altura' />
            <h3>height:{pokeDetail.height}</h3>
          </div>
          <div className={stylo.stats}>
            <img src={kilos} alt='kilos' />
            <h3>Wheight:{pokeDetail.weight}</h3>
          </div>
          <div className={stylo.stats}>
            <img src={sped} alt='sped' />
            <h3>Speed:{pokeDetail.speed}</h3>
          </div>

          <div>

            {pokeDetail.type?.map((type) => {
              const foundImage = images && images.find((element) => element && (element.type === type.name || element.type === type));
              if (foundImage) {
                return (
                  <div className={stylo.types} key={`${type.name} ${pokeDetail.id}`}>
                    <img src={foundImage.url} alt={type.name} />
                    <h3 >{type.name}</h3>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details;