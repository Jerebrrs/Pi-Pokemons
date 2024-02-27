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
    FILTER_POKEMON
} from "./actions-type";

let initialState = {
    allPokemon: [],
    allType: [],
    pokemonsFiltered: [],
    pokeDetail: {},
    imgTypes: [],
    createdPokemon: [],
}

//definir la function rootreducer

function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        // case GET_POKEMON:
        //     console.log("GET_POKEMON action dispatched.");
        //     return {
        //         ...state,
        //         allPokemon: [...payload],
        //         pokemon: [...payload],
        //         pokemonsFiltered: payload,
        //     };

        case GET_POKEMON: {
            // Combinar pokemons de la API con los pokemons creados localmente
            const combinedPokemons = [...state.createdPokemon, ...payload];

            return {
                ...state,
                allPokemon: combinedPokemons,
                pokemonsFiltered: combinedPokemons,
            };
        }
        case GET_BY_NAME: {
            console.log("GET_BY_NAME action dispatched.");
            console.log("Payload received:", payload);
            return {
                ...state,
                allPokemon: [...payload],
                pokemonsFiltered: [...payload],
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
                createdPokemon: [...state.createdPokemon, payload], // Se agrega el nuevo Pokémon al array de createdPokemon
            }
        }
        case GET_ALL_TYPES:
            return {
                ...state,
                allType: payload,
            }

        case FILTER_TYPES: {
            // Filtrar los Pokémon por tipo
            const pokemonsFiltered = state.allPokemon.filter(pokemon =>
                pokemon.types.includes(payload)
            );
            return {
                ...state,
                pokemonsFiltered: pokemonsFiltered,
            };
        }
        case GET_IMG_TYPES: {
            return {
                ...state,
                imgTypes: payload,
            }
        }
        case SORT_BY_NAME:
            const sortPokemonsName = payload === "asc"
                ? state.allPokemon.sort((a, b) => a.name.localeCompare(b.name))
                : state.allPokemon.sort((a, b) => b.name.localeCompare(a.name))
            return {
                ...state,
                allPokemon: [...sortPokemonsName],
                pokemonsFiltered: [...sortPokemonsName],
            }

        case SORT_BY_ATTACK: {

            const sortedPokemon = [...state.pokemonsFiltered]; // Hacer una copia del array

            const filterAttack = payload === "asc"
                ? sortedPokemon.sort((a, b) => Number(a.attack) - Number(b.attack)) // Orden ascendente
                : sortedPokemon.sort((a, b) => Number(b.attack) - Number(a.attack)); // Orden descendente

            return {
                ...state,
                pokemonsFiltered: [...filterAttack],
            };
        }
        case FILTER_POKEMON:


            let backUpFilter = [...state.allPokemon]
            let PokesFiltered = []

            if (payload === "AllPokemons") {
                PokesFiltered = backUpFilter
            }
            else if (payload === "PokesFromApi") {
                PokesFiltered = backUpFilter.filter((pokemon) => !isNaN(pokemon.id))
                console.log(PokesFiltered)
            }
            else if (payload === "PokesFromBD") {
                PokesFiltered = backUpFilter.filter((pokemon) => isNaN(pokemon.id))
                console.log(PokesFiltered)
            }
            return {
                ...state,
                pokemonsFiltered: PokesFiltered
            }

        default:
            return {
                ...state,
            };

    }
};

export default rootReducer;