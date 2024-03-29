import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../card/Card'
import stylos from '../cards/Cards.module.css'

import { getAllImgTypes, getPokemon } from '../../redux/actions';


const Cards = ({ allPokemon }) => {
  // const dispatch = useDispatch();
  // const allPokemon = useSelector((state) => state.allPokemon);

  // useEffect(() => {
  //   dispatch(getPokemon());
  // }, [dispatch]);
  const loading = useSelector((state) => state.loading)


  const dispatch = useDispatch();
  const imgTypes = useSelector((state) => state.imgTypes);


  useEffect(() => {
    dispatch(getAllImgTypes());
  }, []);


  return (
    <div className={stylos.cardss}>

      {
        allPokemon?.map((info) => (
          <Card
            key={info.id}
            id={info.id}
            pokedex={info.pokedex}
            attack={info.attack}
            defense={info.defense}
            name={info.name}
            types={info.types}
            image={info.image}
            typesImg={info.types?.map((type) => {
              let img = imgTypes?.find((imgTypes) => imgTypes.type === type);
              return img;
            })}
            imgDbPokemon={
              info?.createdInDb
                ? info.types?.map((type) => {
                  let img = imgTypes?.find(
                    (imgtype) => imgtype.type === type.name
                  );
                  return img;
                })
                : undefined
            }
            createdInDb={info.createdInDb}
          />
        ))
      }

    </div>
  );
}

export default Cards;