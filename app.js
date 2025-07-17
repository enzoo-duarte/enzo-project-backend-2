const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Ruta solo de ejemplo
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

module.exports = app;