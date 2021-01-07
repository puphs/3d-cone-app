const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const { calculateConeTriangles } = require('../cone');

const router = new Router();

const RESULT_CODE = {
	OK: 0,
	ERROR: 1,
};

const validateNumber = (name, moreThan, lessThan) => {
	return check(name)
		.exists()
		.withMessage(`${name} should not be empty`)
		.bail()
		.isNumeric()
		.withMessage(`${name} should be a number`)
		.bail()
		.custom((value) => value > moreThan)
		.withMessage(`${name} should be more than ${moreThan}`)
		.bail()
		.custom((value) => value < lessThan)
		.withMessage(`${name} should be less than ${lessThan}`);
};

const createAnswer = (resultCode = resultCode.OK, messages = [], data = null) => ({
	resultCode,
	messages,
	data,
});

router.post(
	'/api/cone-triangles',
	validateNumber('height', 0, 10000),
	validateNumber('radius', 0, 10000),
	validateNumber('segmentsCount', 0, 10000),

	(req, res) => {
		console.log('new req');
		const errors = validationResult(req)
			.array()
			.map((error) => error.msg);

		if (errors.length) {
			res.status(400).send(createAnswer(RESULT_CODE.ERROR, errors));
		} else {
			const { height, radius, segmentsCount } = req.body;
			res.send(
				createAnswer(RESULT_CODE.OK, null, calculateConeTriangles(height, radius, segmentsCount))
			);
		}
	}
);

module.exports = router;
