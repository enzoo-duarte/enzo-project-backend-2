const express = require('express');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/user.routes');

const app = express();

// Conectarse con la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);

// Ruta de test
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

module.exports = app;