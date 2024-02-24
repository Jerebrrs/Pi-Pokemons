const { getPokemon, getPokemonsName, getPokemonsId, pokeCheckName, pokeCreate, getAllPokemons } = require("../controllers/pokeControllers");

const pokeGetHandler = async (req, res) => {

    const { name } = req.query;
    try {
        let pokemons;
        if (name) {
            const allPokemons = await getAllPokemons();
            pokemons = await getPokemonsName(name, allPokemons);
        } else {
            pokemons = await getPokemon();
        }
        res.status(200).json(pokemons);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const handlerPokemonsId = async (req, res) => {

    try {
        const { id } = req.params;
        const pokemonsId = await getPokemonsId(id);
        res.status(200).json(pokemonsId)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const handlerChekName = async (req, res) => {
    try {
        const { name } = req.query;
        const allPokemons = await getAllPokemons();
        const pokemonByName = await getPokemonsName(name, allPokemons);
        res.status(200).json(pokemonByName);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const handlerpokeCreate = async (req, res) => {
    const info = req.body;
    try {
        const createPoke = await pokeCreate(info);
        res.status(200).json(createPoke);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = {
    pokeGetHandler,
    handlerPokemonsId,
    handlerChekName,
    handlerpokeCreate,
}