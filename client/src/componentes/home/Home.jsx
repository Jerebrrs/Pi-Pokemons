import React, { useEffect, useState } from 'react'
import Cards from '../cards/Cards.jsx'
import stylos from '../home/Home.module.css';
import Navbar from '../navbar/Navbar.jsx'

import Filter from '../filter/Filter.jsx';
import FilterTabs from '../tabsFilter/tabsFilter.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTypes, getPokemon, orderFilter } from '../../redux/actions.js';
import Pages from '../pages/Pages.jsx';



function Home() {
  const allTypes = useSelector((state) => state.allType)
  const dispatch = useDispatch();

  const pokemons = useSelector((state) => state.allPokemon);
  const [order, setOrder] = useState('');
  const [activated, setActivated] = useState({
    1: true,
  })

  const [activatedTabs, setActivatedTabs] = useState({
    All: true,
  });

  //PAGINADO
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPokemonsPage, setMaxPokemonsPage] = useState(12);
  const lastPokemon = currentPage * maxPokemonsPage;
  const firstPokemon = lastPokemon - maxPokemonsPage;

  const pokePerPage = pokemons.slice(firstPokemon, lastPokemon);

  const paginado = (page) => {
    setCurrentPage(page);
  }

  const paginadoActivated = (value = 1) => {
    //Hover pagina
    const clicked = value;
    setActivated({
      [clicked]: true,
    });
  }
  const ordenado = (value) => {
    setOrder(`Ordenado ${value}`);
  }

  const tabsActivated = (clicked) => {
    setActivatedTabs({
      [clicked]: true,
    });
  };

  const handleClick = (event) => {
    paginado(1);
    paginadoActivated(1);
    tabsActivated('All');
    dispatch(refresh());
    dispatch(orderFilter('Ascending pokedex'));
  };

  useEffect(() => {
    dispatch(getAllTypes());
    dispatch(getPokemon());
  }, []);

  useEffect(() => {
    // console.log("Pokemons:", pokemons); Verifica aquí si los datos están llegando correctamente
  }, [pokemons]);
  return (
    <div className={stylos.container}>
      <Navbar paginado={paginado} />

      <div className={stylos.filterContainer}>
        <FilterTabs
          paginado={paginado}
          activated={activatedTabs}
          fnActivated={tabsActivated}
          paginadoActivated={paginadoActivated} />

        <Filter
          defaultOption={'Select Type'}
          name={'types'}
          all={'All Types'}
          opciones={allTypes.map((type) => type.name)}
          paginado={paginado}
          ordenado={ordenado}
          paginadoActivated={paginadoActivated}
        />

        <Filter
          defaultOption={'Select Filter'}
          name={'Order'}
          all={'Ascending pokedex'}
          opciones={['Desending pokedex', 'A to Z', 'Z to A']}
          paginado={paginado}
          ordenado={ordenado}
          paginadoActivated={paginadoActivated}
        />
        <Filter
          defaultOption={'Select Filter'}
          name={'attack'}
          all={'Max Attack'}
          opciones={['Min Attack', 'Max Defense', 'Min Defense']}
          paginado={paginado}
          ordenado={ordenado}
          paginadoActivated={paginadoActivated}
        />
      </div>

      <Cards allPokemon={pokePerPage} />
      {pokemons.length <= 12 ? undefined : (
        <Pages
          activated={activated}
          paginadoActivated={paginadoActivated}
          maxPokemonsPage={maxPokemonsPage}
          pokemons={pokemons.length}
          paginado={paginado} />
      )}

    </div >
  )
}

export default Home