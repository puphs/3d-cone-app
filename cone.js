/* 
    returns an array with length of segmentsCount 
    each element of this array contains triangle - an array of point objects with length of 3
    each point object represents a point in space with properties x, y, and z
*/
const calculateConeTriangles = (height, radius, segmentsCount) => {
	const triangles = [];

	let previousPoint = getPointOnCircleRadius(radius, 0, segmentsCount);

	let i = 1;
	while (i <= segmentsCount) {
		const triangle = [];

		const currentPoint = getPointOnCircleRadius(radius, i, segmentsCount);

		triangle.push({ x: 0, y: 0, z: height });
		triangle.push(previousPoint);
		triangle.push(currentPoint);

		previousPoint = currentPoint;

		triangles.push(triangle);
		i++;
	}
	return triangles;
};

/* 
    returns an object with the x, y, and z coordinates of the point lying on the radius of the circle 
*/
const getPointOnCircleRadius = (radius, segmentIndex, segmentsCount) => {
	return {
		x: radius * Math.cos((2 * Math.PI * segmentIndex) / segmentsCount),
		y: radius * Math.sin((2 * Math.PI * segmentIndex) / segmentsCount),
		z: 0,
	};
};

module.exports = { calculateConeTriangles };
