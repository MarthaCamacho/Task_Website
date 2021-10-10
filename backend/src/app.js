const express = require('express'); //Creacion de servidor
const cors = require('cors') //Cors permite el intercambio de datos entre servidores
const app = express()//Inicializar servidor

// settings
app.set('port', process.env.PORT || 4000)

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/user',require('./routes/user'))
app.use('/api/task',require('./routes/task'))

module.exports = app;