import React, { useEffect, useState } from 'react'
import { sortByName, sortByAttack, filterByPokemonDb, pokemonFilter, filterTypes, filterCreated, filterExisted, createdFilterd, filterCreatedInDb ,FilterPokemon} from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'




function Filterd() {
    const dispatch = useDispatch();

    const allTypes = useSelector(state => state.allType);
    const createdPokemon = useSelector(state => state.createdPokemon)
    const allPokemon = useSelector(state => state.allPokemon);
    const createdInDbPokemon = allPokemon.filter(pokemon => pokemon.createdInDb === true);


    const handleClick = (filter) => {
        dispatch(pokemonFilter(filter));
    };


    const handleChange = (event) => {
        const valorSeleccionado = event.target.value;
        dispatch(FilterPokemon(valorSeleccionado));
    };

    //////////
    function handleSortByName(event) {
        dispatch(sortByName(event.target.value));
    }

    function handleSortByAttack(event) {
        const direction = event.target.value; // El valor 'asc' o 'desc' se envía directamente
        dispatch(sortByAttack(direction)); // Aquí se envía el valor directamente al dispatch
    }

    function handleFilterByType(event) {
        const selectedType = event.target.value;
        console.log(filterTypes(selectedType))
        dispatch(filterTypes(selectedType)); // Despachar la acción con el tipo seleccionado
    }

    /////////////
    return (
        <div>
            <header>
                <div>
                    <select onChange={(event) => handleSortByName(event)}>
                        <option> Order By Name</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                    <select
                        onChange={(event) => handleSortByAttack(event)}
                    >
                        <option> Order by Attack </option>
                        <option value="asc"> Ascendente </option>
                        <option value="desc"> Descendente </option>
                    </select>

                    <select onChange={(event) => handleFilterByType(event)}>
                        <option value="All">All Types</option>
                        {allTypes.map((type, index) => (
                            <option key={index} value={type.name}>{type.name}</option>
                        ))}
                    </select>

                    {/* <button onClick={() => handleClick('All')}>All Pokemons</button>
                    <button onClick={() => handleClick('Existing')}>Existing Pokemons</button>
                    <button onClick={() => handleClick('Created')}>Created Pokemons</button> */}
                    <select onChange={handleChange}>
                        <option value="AllPokemons">All Pokemons</option>
                        <option value="PokesFromApi">Original Pokemons</option>
                        <option value="PokesFromBD">Created Pokemons</option>
                    </select>
                </div>
            </header >
        </div >
    )
}

export default Filterd;