const express = require('express');
const connectDB = require('./src/config/db');

const userRoutes = require('./src/routes/user.routes');
const sessionsRoutes = require('./src/routes/sessions.routes');

const passport = require('./src/config/passport');

const app = express();

// Conectarse con la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use(passport.initialize());

// Ruta de test
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

module.exports = app;