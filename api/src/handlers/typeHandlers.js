const { typesInDb, getTypes } = require('../controllers/typeContoller');

const handlerGetPokemon = async (req, res) => {
    try {
        const getTy = await getTypes();
        res.status(200).json(getTy);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const handlerTypesInDb = async (req, res) => {
    try {
        const typesDb = await typesInDb();
        res.status(200).json(typesDb);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    handlerGetPokemon,
    handlerTypesInDb
}