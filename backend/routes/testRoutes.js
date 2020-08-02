const express = require('express');
const controller = require('../services/testsServices');

const testsRouter = express.Router();

testsRouter.get('/:user', controller.readAll);
testsRouter.get('/:user/:category', controller.read);
testsRouter.post('/:user', controller.create);
testsRouter.put('/:user/:category', controller.update);

module.exports = testsRouter;
