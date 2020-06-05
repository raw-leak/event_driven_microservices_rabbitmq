const express = require('express');
const app = express();
const morgan = require('morgan');
const router = require('./routes/user');
const bodyParser = require('body-parser');

app.listen(3000, () => {
  console.log('El servidor está inicializado en el puerto 3000');
});

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);
