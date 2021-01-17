const validateNumber = require('./validateNumber');

module.exports = [
	validateNumber('height', 0, 10000),
	validateNumber('radius', 0, 10000),
	validateNumber('segmentsCount', 2, 10000),
];
