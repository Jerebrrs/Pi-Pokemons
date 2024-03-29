import React from 'react'
import { sortByName, sortByAttack, filterTypes, FilterPokemon } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import stylos from './Filterd.module.css'

function Filterd() {
    const dispatch = useDispatch();

    const allTypes = useSelector(state => state.allType);

    const handleChange = (event) => {
        const valorSeleccionado = event.target.value;
        dispatch(FilterPokemon(valorSeleccionado));
    };


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


    return (
        <div className={stylos.container}>
            <header>
                <div>
                    <select className={stylos.select}
                        onChange={(event) => handleSortByName(event)}>
                        <option className={stylos.option}> Order By Name</option>
                        <option className={stylos.option} value="asc">A-Z</option>
                        <option className={stylos.option} value="desc">Z-A</option>
                    </select>
                    <select className={stylos.select}
                        onChange={(event) => handleSortByAttack(event)}
                    >
                        <option> Order by Attack </option>
                        <option value="asc"> Ascendente </option>
                        <option value="desc"> Descendente </option>
                    </select>

                    <select className={stylos.select}
                        onChange={(event) => handleFilterByType(event)}>
                        <option value="All">All Types</option>
                        {allTypes.map((type, index) => (
                            <option key={index} value={type.name}>{type.name}</option>
                        ))}
                    </select>

                    <select className={stylos.select}
                        onChange={handleChange}>
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