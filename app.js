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

 //rutas
app.use('/api',project_routes);



 // exportar
 module.exports=app;