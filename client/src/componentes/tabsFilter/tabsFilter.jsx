import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { pokemonFilter } from '../../redux/actions'
import stylos from '../tabsFilter/tabsFilter.module.css'

function FilterTabs({ paginado }) {
    const [activated, setActivated] = useState({});
    const dispatch = useDispatch();

    const handlerClick = (event) => {
        const cliked = event.target.name;

        console.log(cliked)

        activated[cliked]
            ? setActivated({
                [cliked]: false,
            })
            : setActivated({
                [cliked]: true,
            })
        dispatch(pokemonFilter(cliked));
        paginado(1);
    }
    
    // console.log('activated:', activated);
    return (
        <div>
            <button
                name='All'
                onClick={handlerClick}
                className={`${stylos.buttonIzq} ${activated.All ? stylos.active : stylos.buttonClass}`}>
                ALL Pokemons
            </button>

            <button
                name='Existing'
                onClick={handlerClick}
                className={`${activated.Existing ? stylos.active : stylos.buttonClass}`}
            >
                Existing
            </button>

            <button
                name='Created'
                onClick={handlerClick}
                className={`${activated.Created ? stylos.active : stylos.buttonClass}`}
            >
                Created
            </button>
        </div>
    )
}

export default FilterTabs;