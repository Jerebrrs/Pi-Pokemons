import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllImgTypes, getPokemonId } from '../../redux/actions';
import { Link, useParams } from 'react-router-dom';
import stylo from './Details.module.css'
import attack from '../../Imagenes/attack.webp'
import defense from '../../Imagenes/defense.jpg'
import sped from '../../Imagenes/speed.webp'
import altura from '../../Imagenes/altura.png'
import hpImg from '../../Imagenes/hpPoke.png'
import kilos from '../../Imagenes/kg.png'

function Details() {
  const dispatch = useDispatch();
  const pokeDetail = useSelector((state) => state.pokeDetail);
  const imgTypes = useSelector((state) => state.imgTypes);

  const { id } = useParams();

console.log(pokeDetail);
  useEffect(() => {
    dispatch(getPokemonId(id));
    dispatch(getAllImgTypes());
  }, [dispatch, id])



  const images = pokeDetail.createInDb ? pokeDetail.Types?.map((type) => imgTypes.find((imgType) => imgType.type === type.name)) :
    pokeDetail.types?.map((type) => imgTypes.find((imgType) => imgType.type === type));



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
            {pokeDetail.createInDb
              ? pokeDetail.Types?.map((type) => (
                <div
                  className={stylo.types}
                  key={`${type.name} ${pokeDetail.id}`}>
                  <img src={images.find((element) => element.type === type.name).url} alt={type.name} />
                  <h3>{type.name}</h3>
                </div>)) : pokeDetail.types?.map((type) => (
                  <div className={stylo.types}
                    key={`${type} ${pokeDetail.id}`}>
                    <img src={images.find((element) => element.type === type).url} alt={type.name} />
                    <h3 className={stylo.types}
                      key={`${pokeDetail.name}`}>
                      {type}
                    </h3>
                  </div>
                ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details