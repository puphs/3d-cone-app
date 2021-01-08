const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/api');

const CLIENT_DIR = './client';
const PORT = process.env.PORT || 80;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, CLIENT_DIR)));
app.use(apiRoutes);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, CLIENT_DIR, 'index.html'));
});

app.listen(PORT, () => {
	console.log('server is running on port:', PORT);
});
