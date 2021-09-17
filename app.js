'use strict'

//CONFIGURACION DE EXPRESS Y BODYPARSER

var express= require('express');
var bodyParser = require('body-parser');

var app=express();

// cargar archivos rutas
var project_routes=require('./routes/project');

//middlewares : son metodos que se ejecutan una capa antes del controlador

 app.use(bodyParser.urlencoded({extended: false})); //configuracion de bodyParser
 app.use(bodyParser.json()); //convierte en json todo lo q se enviar y recibe por los metodo http

 //CORS
 // Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


 //rutas
app.use('/api',project_routes);



 // exportar
 module.exports=app;