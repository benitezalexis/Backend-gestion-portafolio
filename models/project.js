'use strict'

var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var ProjectSchema=Schema({
	name: String,
	description: String,
	categoria: String,
	langs: String ,
	year: Number,
	image:String
});

module.exports =mongoose.model('Project',ProjectSchema);
//projects --> gurada los documentos en la coleccion

