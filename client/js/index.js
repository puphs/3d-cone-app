import Toast from './Toast.js';
import Cone3dView from './Cone3dView.js';

const CONE_TRIANGLES_API_URL = document.location.origin + '/api/cone-triangles';

const API_RESULT_CODE = {
	OK: 0,
	ERROR: 1,
};

const parseForm = (form) => {
	const formData = new FormData(form);
	const formBody = {};
	for (let [key, value] of formData) {
		formBody[key] = value;
	}
	return formBody;
};

const drawConeAndHandleErrors = (height, radius, segmentsCount) => {
	fetchConeTriangles(height, radius, segmentsCount)
		.then((response) => {
			if (response.resultCode == API_RESULT_CODE.OK) {
				cone3dView.drawCone(response.data);
			} else {
				errorToast.setMessage(response.messages[0]);
				errorToast.show();
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

const fetchConeTriangles = (height, radius, segmentsCount) => {
	const body = { height, radius, segmentsCount };
	return fetch(CONE_TRIANGLES_API_URL, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify(body),
	}).then((data) => data.json());
};

const errorToast = new Toast(Toast.DURATION_SHORT);
const cone3dView = new Cone3dView('.view-3d');
const coneSetupForm = document.querySelector('.cone-setup-form');

// draw cone with default values when user enters the page
drawConeAndHandleErrors(2, 1, 6);

coneSetupForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const { height, radius, segmentsCount } = parseForm(coneSetupForm);
	drawConeAndHandleErrors(height, radius, segmentsCount);

	return false;
});
