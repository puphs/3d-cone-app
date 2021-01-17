const { validationResult } = require('express-validator');
const { calculateConeGeometry, calculateConeTriangles } = require('../cone');

const RESULT_CODE = {
	OK: 0,
	ERROR: 1,
};

const createAnswer = (resultCode = resultCode.OK, messages = [], data = null) => ({
	resultCode,
	messages,
	data,
});

const handleErrors = (req, res) => {
	const errorMessages = validationResult(req)
		.array()
		.map((error) => error.msg);

	if (errorMessages.length) {
		return res.status(400).send(createAnswer(RESULT_CODE.ERROR, errorMessages, req.body));
	}
};

const parseConeParams = (req) => {
	const { height, radius, segmentsCount } = req.body;
	return {
		height: parseFloat(height),
		radius: parseFloat(radius),
		segmentsCount: parseFloat(segmentsCount),
	};
};

const standard = (req, res) => {
	handleErrors(req, res);

	const { height, radius, segmentsCount } = parseConeParams(req);
	const triangles = calculateConeTriangles(height, radius, segmentsCount);

	res.send(createAnswer(RESULT_CODE.OK, null, triangles));
};

const optimized = (req, res) => {
	handleErrors(req, res);

	const { height, radius, segmentsCount } = parseConeParams(req);
	const triangles = calculateConeGeometry(height, radius, segmentsCount);

	res.send(createAnswer(RESULT_CODE.OK, null, triangles));
};

module.exports = { standard, optimized };
