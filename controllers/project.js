'use strict'


var Project=require('../models/project');
var fs=require('fs');

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

	},

	uploadImage: function(req,res){
		var projectId=req.params.id;
		var fileName='Imagen no subida...';

		if(req.files){
			var filePath=req.files.image.path;
			var fileSplit=filePath.split('\\');//guarda en arreglos los datos separados por 
											   //el parametro propuesto
			var fileName=fileSplit[1];
			var extsplit=fileName.split('\.');
			var fileExt=extsplit[1];


			if(fileExt == 'png' || fileExt == 'jpg'|| fileExt == 'jpeg'|| fileExt == 'gif'){

																     	//Devuelva el ultimo objeto guardado
			Project.findByIdAndUpdate(projectId, {image: fileName},{new: true}, (err, projectUdated)=>{
				if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

				if(!projectUdated) return res.status(404).send({message: 'El projecto no existe y no se ha asignado la imagen'});

				return res.status(200).send({
				project: projectUdated
			});
			});

			}else{
				fs.unlink(filePath,(err)=>{
					return res.status(200).send({message: 'La extension no es valida'});
				});
			}
			

			
		}else{
			return res.status(200).send({
				message: fileName
			});
		}
	}

};

module.exports=controller;