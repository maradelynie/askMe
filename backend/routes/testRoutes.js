const express = require('express');
const controller = require('../services/testsServices');

const testsRouter = express.Router();

testsRouter.get('/:user', controller.readAll);
testsRouter.get('/:user/:category', controller.read);
testsRouter.post('/', controller.create);
testsRouter.put('/:id', controller.update);

module.exports = testsRouter;
