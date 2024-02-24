//actions creadoras
import axios from 'axios';
import {
    GET_POKEMON, LOADING, SET_PAGE_POKEMONS, GET_BY_NAME, GET_ALL_TYPES,
    FILTER_TYPES,
    ASCENDENTE_POKEDEX,
    DESCENDENTE_POKEDEX,
    A_TO_Z,
    Z_TO_A,
    REFRESH,
    MAX_ATTACK,
    MIN_ATTACK,
    MAX_DEFENSE,
    MIN_DEFENSE,
    EXISTING,
    CREATED,
    GET_POKEMON_ID,
    GET_IMG_TYPES, CREATE_POKEMON,
} from './actions-type';

export function createPokemon(state) {
    return async function (dispatch) {
        try {
            await axios.post("http://localhost:3001/pokemons", state)
            dispatch({
                type: CREATE_POKEMON
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

            dispatch({
                type: GET_POKEMON,                 //ESPECIFICACION DE LA INFO
                payload: response.data,        //info que guardo en el estado global
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function loading() {
    return {
        type: LOADING,
    };
};

export const setPagePokemon = (start, end) => {
    return {
        type: SET_PAGE_POKEMONS,
        payload: { start, end },
    };
};

export const getPokemonName = (name) => async (dispatch) => {
    try {
        const infoName = await axios.get(`http://localhost:3001/pokemons/search?name=${name}`)
        console.log("Data received from API:", infoName.data);
        
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
export const filterTypes = (type) => async (dispatch) => {
    console.log('filtro por type', type)

    return dispatch({
        type: FILTER_TYPES,
        payload: type,
    });
};

export function pokemonFilter(filter) {
    return async function (dispatch) {
        switch (filter) {
            case 'ALL':
                dispatch(
                    getPokemon()
                )
                break;
            case 'Existing':
                await dispatch(getPokemon());
                dispatch({ type: EXISTING })
                break;
            case 'Created':
                await dispatch(getPokemon());
                dispatch({ type: CREATED })
                break;
            default:
                break;
        }
    }
}

export const orderFilter = (order) => async (dispatch) => {
    console.log('filtro por order', order)
    switch (order) {
        case 'Ascending pokedex':
            dispatch({
                type: ASCENDENTE_POKEDEX
            })
            break;
        case 'Desending pokedex':
            dispatch({
                type: DESCENDENTE_POKEDEX
            })
            break;
        case 'A to Z':
            dispatch({
                type: A_TO_Z
            })
            break;
        case 'Z to A':
            dispatch({
                type: Z_TO_A
            })
            break;
        case 'Max Attack':
            dispatch({
                type: MAX_ATTACK
            })
            break;
        case 'Min Atttack':
            dispatch({
                type: MIN_ATTACK
            })
            break;
        case 'Max deffense':
            dispatch({
                type: MAX_DEFENSE
            })
            break;
        case 'Min Deffense':
            dispatch({
                type: MIN_DEFENSE
            })
            break;

        default:
            break;
    }
}



export const getAllTypes = () => async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/types`)
    return dispatch({
        type: GET_ALL_TYPES,
        payload: response.data,
    });
};

export const refresh = () => async () => {
    return dispatch({
        type: REFRESH,
    })
}


export const getAllImgTypes = () => async (dispatch) => {
    const imgTypes = [{
        type: 'normal',
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg',
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
        url: 'hhttps://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg/2048px-Pok%C3%A9mon_Fairy_Type_Icon.svg.png',
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