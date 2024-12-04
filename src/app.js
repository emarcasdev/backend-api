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
  res.json(data[0]);
});

// Imprimir todos los usuarios del array
app.get('/users/', (req, res) => {
  res.json(data);
});

// Imprimir usuario segun el ID
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = data.find((u) => u.id === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({Error: "Usuario no encontrado" });
  }
});

// Agregar un nuevo usaurio
app.post('/users/', (req, res) => {
  const {nombre, apellido, telefono} = req.body;

  // Comprobación de los datos
  if (!nombre || !apellido || !telefono) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const nuevoUsurio = {
    id: data.length + 1, // Crear el nuevo id
    nombre,
    apellido,
    telefono,
  };

  data.push(nuevoUsurio); // Añadir usario al array de data
  res.status(201).json(nuevoUsurio); // Respuesta de que se creo
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
