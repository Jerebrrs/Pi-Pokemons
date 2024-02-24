
import {
    GET_BY_NAME, GET_POKEMON, LOADING, SET_PAGE_POKEMONS, GET_ALL_TYPES,
    FILTER_TYPES,
    ASCENDENTE_POKEDEX,
    DESCENDENTE_POKEDEX,
    A_TO_Z,
    Z_TO_A,
    REFRESH,
    EXISTING,
    CREATED,
    MAX_ATTACK,
    MIN_ATTACK,
    MAX_DEFENSE,
    MIN_DEFENSE,
    GET_POKEMON_ID,
    GET_IMG_TYPES,
    CREATE_POKEMON,
} from "./actions-type";

import {
    filterPokemonTypes,
    ascPokedex,
    desPokedex,
    aToZ,
    zToA,
    ascAttack,
    desAttack,
    ascDefense,
    desDefense,
    filterExisted,
    filterCreated,
} from './helpers';


let initialState = {
    allPokemon: [],
    allType: [],
    loading: false,
    pagePokemon: [],
    pokemon: [],
    pokemonsFiltered: [],
    pokeDetail: {},
    imgTypes: [],
}

//definir la function rootreducer

function rootReducer(state = initialState, { type, payload }) {
    // console.log("Estado inicial:", state); 
    switch (type) {
        case GET_POKEMON:
           
            return {
                ...state,
                allPokemon: [...payload],
                pokemon: [...payload],
                pokemonsFiltered: payload,

            };
        case GET_BY_NAME: {
            
            return {
                ...state,
                allPokemon: [...payload],
            };
        }
        case GET_POKEMON_ID:
            return {
                ...state,
                pokeDetail: payload,
            }
        case CREATE_POKEMON: {
            return {
                ...state,
            }
        }
        case LOADING:
            return {
                ...state,
                loading: true,
            };
        case SET_PAGE_POKEMONS: {
            return {
                ...state,
                pagePokemon: state.pokemon.slice(payload.start, payload.end),
            };
        }
        case GET_ALL_TYPES:
            return {
                ...state,
                allType: payload,
            }
        case REFRESH:
            return {
                ...state,
                pokemonsFiltered: state.pokemon,
            }
        case EXISTING:
            const auxFilter = filterExisted(state.allPokemon);
            return {
                ...state,
                pokemon: auxFilter,
                pokemonsFiltered: auxFilter,
            };
        case CREATED:
            const auxFilter1 = filterCreated(state.allPokemon);
            return {
                ...state,
                pokemon: auxFilter1,
                pokemonsFiltered: auxFilter1,
            };
        case FILTER_TYPES: {
            console.log('Filtrando por tipo:', payload); 
            return {
                ...state,
                pokemonsFiltered: filterPokemonTypes(state.pokemon, { type, payload }),
            };
        }
        case ASCENDENTE_POKEDEX: {
            return {
                ...state,
                pokemonsFiltered: ascPokedex(state.pokemonsFiltered),
            };
        }
        case DESCENDENTE_POKEDEX: {
            return {
                ...state,
                pokemonsFiltered: desPokedex(state.pokemonsFiltered),
            };
        }
        case A_TO_Z: {
            return {
                ...state,
                pokemonsFiltered: aToZ(state.pokemonsFiltered),
            };
        }
        case Z_TO_A: {
            return {
                ...state,
                pokemonsFiltered: zToA(state.pokemonsFiltered),
            };
        }
        case MAX_ATTACK: {
            return {
                ...state,
                pokemonsFiltered: ascAttack(state.pokemonsFiltered),
            };
        }
        case MIN_ATTACK: {
            return {
                ...state,
                pokemonsFiltered: desAttack(state.pokemonsFiltered),
            };
        }
        case MAX_DEFENSE: {
            return {
                ...state,
                pokemonsFiltered: ascDefense(state.pokemonsFiltered),
            };
        }
        case MIN_DEFENSE: {
            return {
                ...state,
                pokemonsFiltered: desDefense(state.pokemonsFiltered),
            };
        }
        case GET_IMG_TYPES: {
            return {
                ...state,
                imgTypes: payload,
            }
        }

        default:
            return {
                ...state,
            };

    }
};

export default rootReducer;