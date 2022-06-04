require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const config = require('./config')

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use( express.json() );

const API_URL = config.baseURL

// Base de datos
dbConnection();

app.use(API_URL, require('./routers'));

// Directorio publico
app.use( express.static('public') );

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en purto ' + process.env.PORT );
});