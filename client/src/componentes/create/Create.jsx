import React, { useEffect, useState } from 'react';
import stylos from './Create.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon, getAllTypes, getAllImgTypes } from '../../redux/actions'
import { Link } from 'react-router-dom';
import { capitalize, findInImgTypes } from '../../redux/helpers';

export function validate(newPokemon) {
    let error = {};

    if (!newPokemon.name) {
        error.name = "Name is required";
    } else if (newPokemon.name.length > 20 || newPokemon.name.length < 3) {
        error.name = "Name must be between 3 and 20 characters long";
    } else if (!/^[a-zA-Z\s]*$/.test(newPokemon.name)) {
        error.name = "Name must contain only letters and spaces";
    }

    if (!newPokemon.hp) {
        error.hp = "HP is required";
    } else if (newPokemon.hp < 1 || newPokemon.hp > 100) {
        error.hp = "HP must be between 1 and 100";
    }

    if (!newPokemon.attack) {
        error.attack = "Attack is required";
    } else if (newPokemon.attack < 1 || newPokemon.attack > 100) {
        error.attack = "Attack must be between 1 and 100";
    }

    if (!newPokemon.defense) {
        error.defense = "Defense is required";
    } else if (newPokemon.defense < 1 || newPokemon.defense > 100) {
        error.defense = "Defense must be between 1 and 100";
    }

    if (!newPokemon.height) {
        error.height = "Height is required";
    } else if (newPokemon.height < 1 || newPokemon.height > 100) {
        error.height = "Height must be between 1 and 100";
    }

    if (!newPokemon.weight) {
        error.weight = "Weight is required";
    } else if (newPokemon.weight < 1 || newPokemon.weight > 100) {
        error.weight = "Weight must be between 1 and 100";
    }

    if (!newPokemon.image) {
        error.image = "Image URL is required";
    } else if (!/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(newPokemon.image)) {
        error.image = "Please enter a valid image URL (ending with .gif, .jpeg, .jpg, .png, .webp, or .bmp)";
    }

    if (!newPokemon.type) {
        error.type = "Please select at least one type";
    }

    return error;
}



function Create() {


    const imgTypes = useSelector((state) => state.imgTypes)

    const [newPokemon, setNewPokemon] = useState({  // useState manega el estado del nuevo pokemon creado y constiene sus prop
        name: '', hp: '', attack: '', defense: '', speed: '', height: '', weight: '', image: '', type: [],
    });

    const [error, setError] = useState({});


    // Dispatch para enviar acciones al store de Redux
    const dispatch = useDispatch();

    // Selector para obtener todos los tipos de Pokémon del store de Redux
    const allTypes = useSelector((state) => state.allType);

    // Efecto que se ejecuta al cargar el componente para obtener todos los tipos de Pokémon
    useEffect(() => {
        dispatch(getAllTypes());
        dispatch(getAllImgTypes());
    }, []);

    // Manejador de cambio de los campos del formulario
    const handlerChange = (event) => {
        const nameProp = event.target.name;
        let valueProp = event.target.value;

        // setNewPokemon({ ...newPokemon, [nameProp]: valueProp })
        setNewPokemon({
            ...newPokemon,
            [nameProp]: valueProp
        })

        setError(
            validate({
                ...newPokemon,
                [nameProp]: valueProp.toUpperCase(),
            })
        );
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
            name: '', hp: '', attack: '', defense: '', speed: '', height: '', weight: '', image: '', type: [],
        });
    };


    // Manejador para eliminar un tipo de Pokémon de la lista de tipos seleccionados
    const onClose = (event) => {
        const typeClose = event.target.value;
        const filterTypes = newPokemon?.type?.filter(
            (nameType) => nameType !== typeClose
        );
        setNewPokemon({
            ...newPokemon,
            type: filterTypes,
        })
    };

    return (
        <div className={stylos.mainContainer}>
            <div className={stylos.infoContainer}>

                <Link to={'/home'} >
                    <button className={stylos.button}>Home</button>
                </Link>

                <h2>Create Pokemon</h2>

                <form onSubmit={handlerSubmit}>
                    <div>
                        <label>Name: </label>
                        <input

                            type='text'
                            className={stylos.formField}
                            placeholder='name...'
                            onChange={handlerChange}
                            value={newPokemon.name}
                            name='name'
                            id='name'
                            autoComplete='off'
                            required

                        />
                        {error.name && <a>{error.name}</a>}
                    </div>
                    <div>
                        <label>HP: </label>
                        <input
                            type='number'
                            placeholder='Hp...'
                            className={stylos.formField}
                            name='hp'
                            onChange={handlerChange}
                            value={newPokemon.hp}
                            id='hp'
                            required
                        />
                        {error.hp && <a>{error.hp}</a>}
                    </div>
                    <div>
                        <label>Attack: </label>
                        <input
                            type='number'
                            className={stylos.formField}
                            placeholder='Attack'
                            onChange={handlerChange}
                            value={newPokemon.attack}
                            name='attack'
                            id='attack'
                            required
                        />
                        {error.attack && <a>{error.attack}</a>}
                    </div>
                    <div>
                        <label>Defense: </label>
                        <input
                            type='number'
                            className={stylos.formField}
                            placeholder='Defense'
                            onChange={handlerChange}
                            value={newPokemon.defense}
                            name='defense'
                            id='defense'
                            required />
                        {error.defense && <a>{error.defense}</a>}
                    </div>
                    <div>
                        <label>Spped: </label>
                        <input
                            type='number'
                            className={stylos.formField}
                            placeholder='Speed'
                            onChange={handlerChange}
                            value={newPokemon.speed}
                            name='speed'
                            id='speed'
                            required />
                        {error.spped && <a>{error.spped}</a>}
                    </div>
                    <div>
                        <label>Height: </label>
                        <input
                            type='number'
                            className={stylos.formField}
                            name='height'
                            onChange={handlerChange}
                            value={newPokemon.height}
                            placeholder='Height' />
                        {error.height && <a>{error.height}</a>}
                    </div>
                    <div>
                        <label>Weight: </label>
                        <input
                            type='number'
                            name='weight'
                            className={stylos.formField}
                            placeholder='Weight'
                            onChange={handlerChange}
                            value={newPokemon.weight}
                        />
                        {error.weight && <a>{error.weight}</a>}
                    </div>
                    <div>
                        <label>Image: </label>
                        <input
                            type='text'
                            name='image'
                            className={stylos.formField}
                            onChange={handlerChange}
                            value={newPokemon.image}
                            placeholder='URL image .. '
                        />
                        {error.image && <a>{error.image}</a>}

                    </div>
                    <div>
                        <select
                            className={stylos.customSelect}
                            defaultValue={'default'}
                            name={'type'}
                            id={'type'}
                            onChange={handlerChangeSelect}>

                            <option className={stylos.selectOptions}
                                hidden={true}
                                value='default'>
                                Select The Type
                            </option>

                            {allTypes?.map((type) => (
                                <option key={type.id} value={type.name}>
                                    {capitalize(type.name)}
                                </option>
                            ))}
                        </select>
                        {error.type && <a>{error.type}</a>}
                    </div>

                    <div className={stylos.typeContainerMain}>

                        {newPokemon?.type?.map((nameType) => (
                            <div className={stylos.imageContainer}
                                key={nameType}

                            >
                                {nameType === 'unknow' || nameType === 'shadow' ? null : (<div>
                                    <img src={findInImgTypes(nameType, imgTypes).url} alt={`image ${nameType}`} />
                                </div>)}
                                <button
                                    value={nameType}
                                    className={stylos.buttonX}
                                    onClick={onClose}
                                >
                                    x
                                </button>
                            </div>
                        ))

                        }
                    </div>
                    <button type='submit'
                        disabled={error.name || error.hp || error.image || error.type || error.attack}
                    >
                        Create Pokemon
                    </button>
                </form >
            </div >
        </div >
    )
}

export default Create;