//actions creadoras
import axios from 'axios';
import {
    GET_POKEMON_ID,
    GET_POKEMON,
    GET_BY_NAME,
    GET_ALL_TYPES,
    FILTER_TYPES,
    GET_IMG_TYPES,
    CREATE_POKEMON,
    SORT_BY_NAME,
    SORT_BY_ATTACK,
    FILTER_POKEMON,
} from './actions-type';


export function createPokemon(payload) {
    return async function (dispatch) {
        try {
            const pokeNuevo = await axios.post("http://localhost:3001/pokemons", payload)
            dispatch({
                type: CREATE_POKEMON,
                payload: pokeNuevo.data,
            })
        } catch (error) {
            console.log(error);
        }
    }
}


export function getPokemon() {
    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:3001/pokemons")

            // Agregar la propiedad isCreatedInDb a cada Pokémon en la respuesta
            const pokemonsWithDbInfo = response.data.map(pokemon => {
                return {
                    ...pokemon,
                    isCreatedInDb: pokemon.createdInDb !== undefined && pokemon.createdInDb === true
                };
            });
            console.log('pokemonsWithDbInfo:::', pokemonsWithDbInfo)
            dispatch({
                type: GET_POKEMON,
                payload: pokemonsWithDbInfo, // Usar la respuesta modificada con la información de la base de datos
            });
        } catch (error) {
            console.log(error);
        }
    }
}


export const getPokemonName = (name) => async (dispatch) => {
    try {
        const infoName = await axios.get(`http://localhost:3001/pokemons/search?name=${name}`)
        console.log('InfoName:', infoName.data);
        return dispatch({
            type: GET_BY_NAME,
            payload: infoName.data,
        })
    } catch (error) {
        alert(error.message)
    }
}

export const getPokemonId = (id) => async (dispatch) => {
    try {
        const infoID = await axios.get(`http://localhost:3001/pokemons/${id}`)
        dispatch({
            type: GET_POKEMON_ID,
            payload: infoID.data,
        })
    } catch (error) {

        alert(error.message)
    }
}
export const filterTypes = (type) => {
    console.log('filtro por type', type)

    return {
        type: FILTER_TYPES,
        payload: type,
    };
};


export const sortByName = (payload) => {
    return {
        type: SORT_BY_NAME,
        payload: payload,
    };
};

export const sortByAttack = (isAscending) => {

    console.log("sortByAttack action dispatched with payload:", isAscending);


    return {
        type: SORT_BY_ATTACK,
        payload: isAscending,
    };
};

export const FilterPokemon = (payload) => {
    return async (dispatch) => {
        try {
            return dispatch({ type: FILTER_POKEMON, payload: payload })
        } catch (error) {
            console.log(error);
        }
    }
}
//////////////


export const getAllTypes = () => async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/types`)
    return dispatch({
        type: GET_ALL_TYPES,
        payload: response.data,
    });
};


export const getAllImgTypes = () => async (dispatch) => {
    const imgTypes = [{
        type: 'normal',
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg',
        color: '#919aa2',
    },
    {
        type: 'fighting',
        url: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg',
    },
    {
        type: 'flying',
        url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfgbe7l-11fab1a7-31db-4b4d-9226-205f87db5b84.png/v1/fill/w_1280,h_1280/flying_type_symbol_pasio_by_jormxdos_dfgbe7l-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZnYmU3bC0xMWZhYjFhNy0zMWRiLTRiNGQtOTIyNi0yMDVmODdkYjViODQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9hKS8lZFzyaukUSdN_WNToDCt-MwK85zFUPfl_B4mYE',
    },
    {
        type: 'poison',
        url: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg',
    },
    {
        type: 'ground',
        url: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg',
    },
    {
        type: 'rock',
        url: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg',
    },
    {
        type: 'bug',
        url: 'https://o.quizlet.com/LanybWitFqK1oIvil0ZuzQ_b.jpg',
    },
    {
        type: 'ghost',
        url: 'https://static.wikia.nocookie.net/pokemon-_gotta_catch_them_all/images/0/0a/Ghost_Type_Symbol_Pokemon_Badge_Pin_1200x.jpg/revision/latest?cb=20200516221305',
    },
    {
        type: 'steel',
        url: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg',
    },
    {
        type: 'fire',
        url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl1m-a992d76d-bfa4-41cd-bff6-7546b47f2184.png/v1/fill/w_1280,h_1280/fire_type_symbol_galar_by_jormxdos_dffvl1m-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmwxbS1hOTkyZDc2ZC1iZmE0LTQxY2QtYmZmNi03NTQ2YjQ3ZjIxODQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.DBmvPsi4hX6q3f8XHGcinkRbtbV2zsh5nB-_s9wse_4',
    },
    {
        type: 'water',
        url: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg',
    },
    {
        type: 'grass',
        url: 'https://tiermaker.com/images/templates/grass-type-pokemon-1661707/16617071690068413.png',
    },
    {
        type: 'electric',
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg',
    },
    {
        type: 'psychic',
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg',
    },
    {
        type: 'ice',
        url: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg',
    },
    {
        type: 'dragon',
        url: 'https://www.pokebeach.com/news/1211/pokemon-tcg-dragon-type-symbol.png',
    },
    {
        type: 'dark',
        url: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg',
    },
    {
        type: 'fairy',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg/2048px-Pok%C3%A9mon_Fairy_Type_Icon.svg.png',
    },
    {
        type: 'unknown',
        url: 'Not image',
    },
    {
        type: 'shadow',
        url: 'Not image',
    },]
    return dispatch({
        type: GET_IMG_TYPES,
        payload: imgTypes,
    });
}