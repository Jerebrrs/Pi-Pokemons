import React, { useEffect, useState } from 'react';
import stylos from './Create.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon, getAllTypes } from '../../redux/actions'



function Create() {
    const [newPokemon, setNewPokemon] = useState({  // useState manega el estado del nuevo pokemon creado y constiene sus prop
        name: '', hp: 0, attack: 0, defense: 0, speed: 0, height: 0, weight: 0, image: '', type: [],
    });

    // Dispatch para enviar acciones al store de Redux
    const dispatch = useDispatch();

    // Selector para obtener todos los tipos de Pokémon del store de Redux
    const allTypes = useSelector((state) => state.allType)

    // Efecto que se ejecuta al cargar el componente para obtener todos los tipos de Pokémon
    useEffect(() => {
        dispatch(getAllTypes());
    }, []);

    // Manejador de cambio de los campos del formulario
    const handlerChange = (event) => {
        const nameProp = event.target.name;
        let valueProp = event.target.value;
        if (nameProp !== 'name' && nameProp !== 'image')
            valueProp = parseInt(valueProp);// Convertir a entero los campos numéricos
        setNewPokemon({ ...newPokemon, [nameProp]: valueProp })
    };
    // Manejador de cambio de la selección de tipos de Pokémon

    const handlerChangeSelect = (event) => {
        const valueProp = event.target.value;
        if (newPokemon?.type?.length < 2) {
            if (newPokemon.type.includes(valueProp)) {
                alert('No se pueden agregar dos tipos iguales');
                return;
            }
            setNewPokemon({
                ...newPokemon,
                type: [...newPokemon.type, valueProp],
            });
        } else {
            alert('No se puede agregar más de dos tipos');
        }
    };

    // Manejador de envío del formulario de creación de Pokémon
    const handlerSubmit = (event) => {
        event.preventDefault();
        dispatch(createPokemon(newPokemon));// Enviar acción para crear el Pokémon
        console.log(newPokemon);

        alert('Created Pokemon')

        // Resetear el estado para limpiar el formulario
        setNewPokemon({
            name: '', hp: 0, attack: 0, defense: 0, speed: 0, height: 0, weight: 0, image: '', type: [],
        });
    };
    // Manejador para eliminar un tipo de Pokémon de la lista de tipos seleccionados
    const onClose = (event) => {
        const typeClose = event.targer.value;
        const filterTypes = newPokemon?.type?.filter(
            (nameType) => nameType !== typeClose
        );
        setNewPokemon({
            ...newPokemon,
            type: filterTypes,
        })
    };

    // Función utilitaria para capitalizar la primera letra de una palabra
    function capitalize(word) {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
    return (
        <div>
            <h2>Create Pokemon</h2>
            <form onSubmit={handlerSubmit}>
                <div>
                    <label>Name: </label>
                    <input
                        type='text'
                        name='name'
                        onChange={handlerChange}
                        value={newPokemon.name} />
                </div>
                <div>
                    <label>HP: </label>
                    <input
                        type='number'
                        name='hp'
                        onChange={handlerChange}
                        value={newPokemon.hp} />
                </div>
                <div>
                    <label>Attack: </label>
                    <input
                        type='number'
                        name='attack'
                        onChange={handlerChange}
                        value={newPokemon.attack} />
                </div>
                <div>
                    <label>Defense: </label>
                    <input
                        type='number'
                        name='defense'
                        onChange={handlerChange}
                        value={newPokemon.defense} />
                </div>
                <div>
                    <label>Spped: </label>
                    <input
                        type='number'
                        name='speed'
                        onChange={handlerChange}
                        value={newPokemon.speed} />
                </div>
                <div>
                    <label>Height: </label>
                    <input
                        type='number'
                        name='height'
                        onChange={handlerChange}
                        value={newPokemon.height} />
                </div>
                <div>
                    <label>Weight: </label>
                    <input
                        type='number'
                        name='weight'
                        onChange={handlerChange}
                        value={newPokemon.weight} />
                </div>
                <div>
                    <label>Image: </label>
                    <input
                        type='text'
                        name='image'
                        onChange={handlerChange}
                        value={newPokemon.image} />
                </div>
                <div>
                    <select
                        defaultValue={'defaul'}
                        name={'type'}
                        id={'type'}
                        onChange={handlerChange}>
                        <option disabled={true} value='defaul'>
                            Select The Type
                        </option>
                        {allTypes?.map((type) => (
                            <option key={type.id} value={type.name}>
                                {capitalize(type.name)}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={stylos.typeContainerMain}>
                    {Array.isArray(newPokemon.type) && newPokemon.type.map((nameType) => (
                        <div>
                            <p className={stylos.pType}>{nameType}</p>
                            <button
                                value={nameType}
                                className={stylos.buttonX}
                                onClick={onClose}>
                                x
                            </button>
                        </div>
                    ))}
                </div>
                <button type='submit'>
                    Create Pokemon
                </button>
            </form >
        </div >
    )
}

export default Create;