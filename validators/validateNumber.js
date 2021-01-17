const { check } = require('express-validator');

const validateNumber = (name, moreThan, lessThan) => {
	return check(name)
		.not()
		.isEmpty()
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

module.exports = validateNumber;
