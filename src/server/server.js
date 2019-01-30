const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const Controller = require('./Controller');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(8080, () => console.log(`Listening at http://localhost:8080`));
app.use(express.static(path.join(__dirname, '../../dist/')));

app.post('/api/calculate', Controller.calculate)