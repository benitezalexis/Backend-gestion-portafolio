'use strict'


var Project=require('../models/project');

var controller= {
	home: function(req, res){
		return res.status(200).send({
			message: 'Soy la home'
		});
	},
	test: function(req, res){
		return res.status(200).send({
			message: 'Soy el metodo o accion test del controlador de project'
		});
	},

	saveProject: function(req,res){
		var project=new Project();

		var params= req.body;
		project.name=params.name;
		project.description=params.description;
		project.year=params.year;
		project.langs=params.langs;
		project.image=null;


		//Guardar los datos en la bd
		project.save((err, projectStored)=>{
			if(err)return res.status(500).send({message: 'Error al guardar'});

			if(!projectStored) return res.status(404).send({message: 'No se a podido guarda el proyecto'});

			return res.status(200).send({project: projectStored});
		});
	},

	getProject: function(req,res){
		var projectId=req.params.id;

		if (projectId==null) return res.status(404).send({message: 'El documento o proyecto no existe'}); 
		

		Project.findById(projectId,(err, projects)=>{
			if(err)return res.status(500).send({message: 'Error al devolver los datos'});

			if(!projects) return res.status(404).send({message: 'El documento o proyecto no existe'});

			return res.status(200).send({projects});
		});

	},

	getProjects: function(req,res){
		Project.find({}).sort('-year').exec((err, projectss)=>{
			if(err) return res.status(500).send({message: 'Error al devolver los datos'});

			if(!projectss) return res.status(404).send({message: 'No hay proyectos para mostrar'});

			return res.status(200).send({projectss});
		});
	},
	updateProject: function(req,res){
		var projectId=req.params.id;
		var update=req.body;

		Project.findByIdAndUpdate(projectId, update, {new:true}, (err,projectUpdated)=>{
			if(err) return res.status(500).send({message: 'Error al actualizar'});

			if(!projectUpdated) return res.status(404).send({message: 'No existe le proyecto a actualizar'});

			return res.status(200).send({
				project: projectUpdated
			})

		} );


	},

	deleteProject: function(req,res){
		var projectId=req.params.id;

		Project.findByIdAndRemove(projectId, (err,projectDelete)=>{
			if(err)return res.status(500).send({message: 'No se ha popido borrar el documento'});

			if(!projectDelete) return res.status(404).send({message: 'No se puede eliminar ese proyecto'});

			return res.status(200).send({
				project: projectDelete
			});
		});

	}

};

module.exports=controller;