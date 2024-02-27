const { Pokemon, Type } = require("../db");
const axios = require('axios');
require('dotenv').config();
const{API_KEY}= process.env;


const getPokemon = async () => {
    const pokemonApiSol = await axios.get(`${API_KEY}?limit=100`);               //hacemos la solicitud get a la api 
    const arrayPromesa = await pokemonApiSol?.data.results.map(async (element) => {               //mapeamos para crear un array de la solicitud
        const pokemonData = await axios.get(element.url);
        return pokemonData.data;
    });

    const promiseData = await Promise.all(arrayPromesa);          //usamos promise para esperar que toda las solicitudes sean un array



    const pokeInfoFiltered = promiseData?.map((element, index) => {             //mapeamos la info que queremos

        const stats = element.stats.reduce((acc, stat) => {          //utilizo el reduce sobre el array para crear unm {} de los valores
            acc[stat.stat.name] = stat.base_stat;
            return acc;
        }, {});



        return {
            id: element.id,
            name: element.name,
            image: element.sprites.front_default,
            imgShiny: element.sprites.other.home.front_shiny,
            pokedex: index + 1,
            hp: stats['hp'],
            attack: stats['attack'],
            defense: stats['defense'],
            speed: stats['speed'],
            height: element.height,
            weight: element.weight,
            types: element.types.map((element) => element.type.name)
        };
    });

    return pokeInfoFiltered;
}



const getPokemonsName = async (name, info) => {

    const pokemonFind = info?.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(name.toLowerCase())
    );
    if (!pokemonFind.length) throw new Error(`No se enecontro un pokemon con el Nombre ${name}`);
    return pokemonFind;
}


// const getpokemonsDB = async () => {
//     const pokeInfoDB = await Pokemon.findAll({
//         include: [{
//             model: Type,
//             attributes: ['name'],
//             through: {
//                 attributes: [],
//             },
//         },]
//     });

//     const pokemonDataFromDB = pokeInfoDB.map(pokemon => ({
//         id: pokemon.id,
//         name: pokemon.name,
//         image: pokemon.image,
//         pokedex: pokemon.pokedex,
//         hp: pokemon.hp,
//         attack: pokemon.attack,
//         defense: pokemon.defense,
//         speed: pokemon.speed,
//         height: pokemon.height,
//         weight: pokemon.weight,
//         types: pokemon.Types.map(type => type.name)
//     }));

//     console.log(pokemonDataFromDB);
//     return pokemonDataFromDB;
// }
const getpokemonsDB = async () => {
    const pokeInfoDB = await Pokemon.findAll({

        include: [{
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },]
    });
    return pokeInfoDB;
}
const getAllPokemons = async () => {
    const apiInfo = await getPokemon();
    const dbinfo = await getpokemonsDB();
    const allInfo = [...apiInfo, ...dbinfo];
    return allInfo;
}


const getPokemonsId = async (id) => {
    // Suponiendo que getAllPokemons() es una función que devuelve un array de objetos de Pokémon
    const pokeInfo = await getAllPokemons();

    // Buscar el Pokémon por su ID
    const foundPokemon = pokeInfo.find((pokemon) => pokemon.id.toString() === id);

    // Si el Pokémon no se encuentra, lanzar un error
    if (!foundPokemon) {
        throw new Error(`El Pokémon con el ID ${id} no fue encontrado`);
    }

    return foundPokemon;
}


const pokeCheckName = async (name) => {
    const allPokemons = await getAllPokemons();
    const pokemonFind = allPokemons?.find(
        (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
    );

    if (pokemonFind) throw new Error(`No se pueden crear el pokemon ${name} debido a que ya existe un pokemon con ese nombre`)

};
let pokedex = 101;

const pokeCreate = async (body) => {
    const { name, hp, attack, defense, speed, height, weight, image, type } = body;
    if ((!name, !hp, !type.length)) throw new Error('Faltan datos');

    await pokeCheckName(name);

    let newPokemon = await Pokemon.create({
        name: name.toLowerCase(),
        pokedex: pokedex++,
        hp: parseInt(hp),
        attack: parseInt(attack),
        defense: parseInt(defense),
        speed: parseInt(speed),
        height: parseInt(height),
        weight: parseInt(weight),
        image: image
            ? image
            : 'https://assets.pokemon.com/static2/_ui/img/og-default-image.jpeg',
    });

    const pokeType = await Type.findAll({
        where: {
            name: type,
        },
    });

    let typesDb;
    if (type.length === 2) {
        if (pokeType[0].dataValues.name !== type[0]) {
            typesDb = [pokeType[0], pokeType[1]] = [pokeType[1], pokeType[0]];
        } else {
            typesDb = pokeType;
        }
    } else {
        typesDb = pokeType;
    }

    await newPokemon.addType(typesDb);

    return await Pokemon.findByPk(newPokemon.id, {
        include: [{
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },]
    });
};


module.exports = {
    getPokemon,
    getPokemonsName,
    getpokemonsDB,
    getAllPokemons,
    getPokemonsId,
    pokeCheckName,
    pokeCreate,
}