import React, { useEffect, useState } from 'react';
import Cards from '../cards/Cards.jsx';
import stylos from '../home/Home.module.css';
import Navbar from '../navbar/Navbar.jsx';
import Filterd from '../filtros/Filterd.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTypes, getPokemon, } from '../../redux/actions.js';
import Pages from '../pages/Pages.jsx';

function Home() {
    const dispatch = useDispatch();
    const pokemonsFiltered = useSelector(state => state.pokemonsFiltered);

    const [currentPage, setCurrentPage] = useState(1);
    const [maxPokemonsPage, setMaxPokemonsPage] = useState(12);

    useEffect(() => {
        dispatch(getAllTypes());
        dispatch(getPokemon());
    }, [dispatch]);

    // Función para manejar el cambio de página
    const paginado = (page) => {
        setCurrentPage(page);
    };

    // Calcular los índices para la paginación
    const lastPokemon = currentPage * maxPokemonsPage;
    const firstPokemon = lastPokemon - maxPokemonsPage;

    // Obtener los Pokémon para la página actual
    const pokePerPage = pokemonsFiltered.slice(firstPokemon, lastPokemon);

    return (
        <div className={stylos.container}>
           <Navbar paginado={paginado} /> 

            <Filterd />

            <Cards allPokemon={pokePerPage} />


            {pokemonsFiltered.length > maxPokemonsPage && (
                <Pages
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    maxPokemonsPage={maxPokemonsPage}
                    totalPokemons={pokemonsFiltered.length}
                    paginado={paginado}
                />
            )}
        </div>
    );
}

export default Home;