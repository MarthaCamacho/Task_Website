const express = require('express');
const morgan = require('morgan');
const path = require('path')

const { mongoose } = require('./database')
const app = express(); //app es el servidor

// Settings
app.set('port', process.env.PORT || 3000) //puerto servicio de la nube

// Middlewares -- Funciones que se ejecutan antes de que lleguen a las rutas
app.use(morgan('dev'));
app.use(express.json()) //Comprobar que se le envian datos json

// Routes
app.use('/api/task',require('./routes/task.route'))

// Static files
  app.use(express.static(path.join(__dirname, 'public'))) //Encontrar html en carpeta public

// Starting server
app.listen(app.get('port'),"192.168.0.4",() =>{
    console.log(`Server on port ${app.get('port')}`);
})

