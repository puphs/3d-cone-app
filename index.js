const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/api');
const { calculateConeTriangles } = require('./cone');

const CLIENT_DIR = './client';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, FRONTEND_DIR)));
app.use(apiRoutes);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, FRONTEND_DIR, 'index.html'));
});

app.listen(3000, () => {
	console.log('server is running on port:', 3000);
});
