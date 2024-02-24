const { Router } = require("express");
const { handlerTypesInDb } = require('../handlers/typeHandlers')

const router = Router();

router.get('/', handlerTypesInDb)


module.exports = router;
