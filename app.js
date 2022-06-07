require('dotenv').config();

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

// Directorio publico
app.use( express.static('public') );

app.use(API_URL, require('./routers'));


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});