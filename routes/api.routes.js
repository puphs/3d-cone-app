const { Router } = require('express');
const coneTrianglesValidator = require('../validators/cone-triangles.validator');
const coneTrianglesController = require('../controllers/cone-triangles.controller');

const router = new Router();

router.post(
	'/cone-triangles',
	// ...coneTrianglesValidator,
	coneTrianglesController.standard
);
router.post(
	'/cone-triangles-optimized',
	// ...coneTrianglesValidator,
	coneTrianglesController.optimized
);

module.exports = { router };
