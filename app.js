const express = require('express');
const connectDB = require('./src/config/db');

// Passport
const passport = require('./src/config/passport');

const userRoutes = require('./src/routes/user.routes');
const sessionsRoutes = require('./src/routes/sessions.routes');
const productRoutes = require('./src/routes/products.routes');
const cartRoutes = require('./src/routes/carts.routes');

const app = express();

// Conexión
connectDB();

// Middlewares
app.use(express.json());
app.use(passport.initialize()); 

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use('/api/products', productRoutes);  
app.use('/api/carts', cartRoutes);         

// Ruta de test
app.get('/', (req, res) => res.send('Hello from the server!'));

module.exports = app;
