import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import stylos from './Searchbar.module.css'
import { getPokemonName } from '../../redux/actions.js'

function Searchbar({ paginado }) {
    const dispatch = useDispatch();

    const [name, setName] = useState('');

    function handleChange(event) {
        console.log("handleChange", event.target.value)
        setName(event.target.value);
    };

    function handleSubmit(event) {
        console.log("handleSubmit", name);
        
        event.preventDefault();
        dispatch(getPokemonName(name));
        setName('')
        paginado(1);
    };

    return (
        <div>
            <form className={stylos.searchbar} onSubmit={handleSubmit}>
                <input
                    className={stylos.input}
                    type='text'
                    name='pokemon'
                    placeholder='Search...'
                    value={name}
                    onChange={handleChange}
                />
                <button
                    className={stylos.boton}
                    type='submit'
                    onClick={handleSubmit}>
                    🔍︎
                </button>
            </form>
        </div>
    )
}

export default Searchbar;