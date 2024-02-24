
const { Router } = require("express");

const { pokeGetHandler,
    handlerPokemonsId,
    handlerpokeCreate,
    handlerChekName,
} = require('../handlers/pokeHandlers')

const router = Router();

router.get('/search', handlerChekName); // Ruta para búsqueda por nombre
router.get('/:id', handlerPokemonsId); // Ruta para búsqueda por ID
router.post('/', handlerpokeCreate);   // Ruta para creación de pokemon
router.get('/', pokeGetHandler); 


module.exports = router;