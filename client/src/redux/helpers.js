export const filterPokemonTypes = (array, payload) =>
    array?.filter((pokemon) =>
        pokemon.types
            ? pokemon.types.includes(payload)
            : pokemon.types.map((typeDb) => typeDb.name).includes(payload)
    );

export const ascPokedex = (array) =>
    array.sort((a, b) => a.pokedex - b.pokedex);

export const desPokedex = (array) =>
    array.sort((a, b) => b.pokedex - a.pokedex);

export const aToZ = (array) =>
    array.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
    });

export const zToA = (array) =>
    array.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
    });


export const ascAttack = (array) => array.sort((a, b) => a.attack - b.attack);

export const desAttack = (array) => array.sort((a, b) => b.attack - a.attack);

export const ascDefense = (array) => array.sort((a, b) => b.defense - a.defense);

export const desDefense = (array) => array.sort((a, b) => a.defense - b.defense);


export const filterExisted = (array) => array.filter((pokemon) => pokemon.createInDb === true);
export const filterCreated = (array) => array.filter((pokemon) => pokemon.createInDb === undefined);


export const capitalize = (word) =>
    word[0].toUpperCase() + word.slice(1).toLowerCase();

export const findInImgTypes = (type, array) =>
    array?.find((element) => element.type === type);