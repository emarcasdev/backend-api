const express = require('express');
// const morgan = require('morgan');
// const helmet = require('helmet');
// const cors = require('cors');
const { MongoClient } = require('mongodb');

// require('dotenv').config();

// const middlewares = require('./middlewares');
// const api = require('./api');

const app = express();

// Conexión a MongoDB
const uri = "mongodb+srv://emarcasdev:Lgv5EiO0N1RAxRiX@emarcasdev.hlq6d.mongodb.net/?retryWrites=true&w=majority&appName=emarcasdev";
let database; 

MongoClient.connect(uri)
  .then(client => {
    database = client.db('express_back'); 
    console.log('Conectado a MongoDB');
  })
  .catch(err => {
    console.error('Error no se puedo conectar a MongoDB:', err);
  });

// app.use(morgan('dev'));
// app.use(helmet());
// app.use(cors());
app.use(express.json());

// ✅ Obtener todos los usuarios
app.get('/users', async (req, res) => {
  try {
    // Seleccionamos la coleccion que necesitamos
    const collection = database.collection('users');
    // Consulta para devolver todos los usarios de la coleccion (en un array)
    const users = await collection.find().toArray(); 
    res.json(users); // Devolver todos los usuarios
  } catch (error) { // Mostrar errores
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// ✅ Obtener el primer usuario
app.get('/users/user1/', async (req, res) => {
  try {
    // Seleccionamos la coleccion que necesitamos
    const collection = database.collection('users'); 
    // Consulta para recuperar el primer usuario
    const users = await collection.findOne({ id: 1 }); 
    res.json(users); // Devolver el usuario encontrada
  } catch (error) { // Mostrar errores
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// ✅ Obtener un usuario específico por ID
app.get('/users/:id', async (req, res) => {
  // Recuperamos el id del front para filtrar
  const id_search = req.params.id;
  try {
    // Seleccionamos la coleccion que necesitamos
    const usersCollection = database.collection('users');
    // Consulta para sacar el usuario con el id recuperado del front
    const user = await usersCollection.findOne({ id: parseInt(id_search) }); 
    if (user) {
      res.json(user); // Devolver el usuario
    } else {
      res.status(404).json({ error: 'Usuario no encontrado o no existe' }); // Devolver que no se encuentra o no existe
    }
  } catch (error) { // Mostrar errores
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});

// ✅ Agregar un nuevo usuario
app.post('/users', async (req, res) => {
  // Recuperamos los datos necesarios del front
  const { nombre, apellido, telefono } = req.body;
  // Seleccionamos la coleccion que necesitamos
  const collection = database.collection('users'); 

  try {
    // Consulta para contar la cantidad de documentos que tenemos en la coleccion
    const userCount = await collection.countDocuments(); 
    // Creamos el nuevo usuario para agregarlo a la coleccion
    const newUser = {
      id: userCount + 1,
      nombre,
      apellido,
      telefono
    };
    // Consulta para insertar un documento a la coleccion
    const result = await collection.insertOne(newUser); 
    res.status(201).json(result.insertedId); 
  } catch (error) { // Mostrar errores
    console.error('Error al agregar el usuario:', error);
    res.status(500).json({ error: 'Error al agregar el usuario' });
  }
});

// app.use('/api/v1', api);

// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

module.exports = app;
