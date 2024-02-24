const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const pokemonsRouter = require('./pokemonRoute');
const typeRouter = require('./typeRoute');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemonsRouter);
router.use('/types', typeRouter);

module.exports = router;
