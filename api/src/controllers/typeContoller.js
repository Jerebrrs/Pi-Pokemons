const { Type } = require("../db");
const axios = require('axios');

//solicita y sube a base de datos
const typesInDb = async () => {
    const apiTypes = await axios.get(`https://pokeapi.co/api/v2/type`);

    const pokeInfo = await apiTypes.data.results.map((type) => {
        return {
            name: type.name,
        }
    });
    pokeInfo.forEach(async (type) => {
        const existingType = await Type.findOne({ where: { name: type.name } });
        if (!existingType) {
            await Type.create(type);
        }
    });

    const dbTypes = await Type.findAll();
    return dbTypes;
}
//solicitamos a base de datos los type
const getTypes = async () => {
    const dbTypes = await Type.findAll();
    if (!dbTypes.length) throw new Error('No se encontraron tipos');
    return dbTypes;
}

module.exports = {
    typesInDb,
    getTypes,
}