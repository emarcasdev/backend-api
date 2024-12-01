const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const res = require('express/lib/response');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Respuesta del endpoint
let data = [
  {id: 1, nombre: "Eder", apellido: "Martínez", tlfn: 698138152},
  {id: 2, nombre: "Agustín", apellido: "Alonoso", tlfn: 698345687},
  {id: 3, nombre: "David", apellido: "Priego", tlfn: 698094323},
  {id: 4, nombre: "Diego", apellido: "Perez", tlfn: 698342345},
];

// Imprimer el primer usuario del array
app.get('/users/user1/', (req, res) => {
  res.json(data[0])
});

// Imprimir todos los usuarios del array
app.get('/users/', (req, res) => {
  res.json(data)
});

// Imprimir usuario segun el ID
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = data.find((u) => u.id === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({Error: "Usuario no encontrado"});
  }
});

app.post('/users/', (req, res) => {
  const user = req.body;
  user.id = user.lenght + 1;
  user.push(user);
  res.json(user)
})

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
