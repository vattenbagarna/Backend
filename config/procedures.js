//Get Projects
getAllProjects = {
	_id: "getAllProjects",
	value: function(){
		return db.Projects.find({}, {data: 0});
	}
}

getProject = {
	_id: "getProject",
	value: function(id){
		if (id == undefined) return "id not defined";
		return db.Projects.findOne({_id: ObjectId(id)});
	}
}

getProjectData = {
	_id: "getProjectData",
	value: function(id){
		if (id == undefined) return "id not defined";
		return db.Projects.findOne({_id: ObjectId(id)}, {data: 1});
	}
}

getProjectBasic = {
	_id: "getProjectInfo",
	value: function(id){
		if (id == undefined) return "id not defined";
		return db.Projects.findOne({_id: ObjectId(id)}, {data: 0});
	}
}

//Insert project
insertProject = {
	_id: "insertProject",
	value: function(name, version){
		if (name == undefined) return "name not defined";
		if (version == undefined) return "version not defined";
		return db.Projects.insertOne({"name": name, "version": version, "data":[]});
	}
}

//Update project

updateProject = {
	_id: "updateProject",
	value: function(id, name, version){
		if (id == undefined) return "id not defined";
		if (name == undefined) return "name not defined";
		if (version == undefined) return "version not defined";
		return db.Projects.updateOne({_id: ObjectId(id)},{$set:{"name": name, "version": version}});
	}
}

updateProjectData = {
	_id: "updateProjectData",
	value: function(id, data){
		if (id == undefined) return "id not defined";
		if (version == undefined) return "version not defined";
		return db.Projects.updateOne({_id: ObjectId(id)},{$set:{"data": data}});
	}
}

//Delete project
deleteProject = {
	_id: "deleteProject",
	value: function(id){
		if (id == undefined) return "id not defined";
		return db.Projects.deleteOne({_id: ObjectId(id)});
	}
}


//Get Objects
getAllObjects = {
	_id: "getAllObjects",
	value: function(){
		return db.Objects.find({});
	}
}

getAllObjectsByType = {
	_id: "getAllObjectsByType",
	value: function(type){
		if (type == undefined) return "Type is undefined";
		return db.Objects.find({Namn: type});
	}
}

//Insert objects


//Update objects
updateObject = {
	_id: "updateObject",
	value: function(id, update){
		if(id == undefined) return "id not defined";
		if(update == undefined) return "update not defined";
		db.Objects.updateOne({_id: ObjectId(id)}, {$set: update});
	}
}

//Delete objects
deleteObjectById = {
	_id: "deleteObjectById",
	value: function(id){
		if(id == undefined) return "id not defined";
		db.Objects.deleteOne({_id: ObjectId(id)});
	}
}

pumpKurva = {
	_id: "getPumpFromValues",
	value: function(lps, height){
		if (lps == undefined) return "lps not defined";
		if (height == undefined) return "height not defined";

		let pumpar = db.Objects.find({"Namn": "Pump"});
		let retPumpar = {"Pumpar": []};
		for (let i = 0; i < pumpar.length(); i++){
			let kurva = pumpar[i].PumpKurva;
			let kurva_lps = kurva.lps;
			let kurva_height = kurva.lyft;

			for (let j = 0; j < kurva_lps.length; j++){
				if(lps >= kurva_lps[j]){
					if(height <= kurva_height[j]){
						retPumpar.Pumpar.push(pumpar[i]);
					}
					break;
				}
			}
		}
		return retPumpar;
	}
}

getPumpFromLedningInlopp = {
	_id: "getPumpFromPipeInlet",
	value: function(outerDiam){
		if (outerDiam == undefined) return "outerDiam not defined";
		return db.Objects.find({"Namn": "Pumpstation", "Inlopp.O": outerDiam});
	}
}

getPumpFromLedningUtlopp = {
	_id: "getPumpFromPipeOutlet",
	value: function(outerDiam){
		if (outerDiam == undefined) return "outer not defined";
		return db.Objects.find({"Namn": "Pumpstation", "Utlopp.G": outerDiam});
	}
}


//save scripts
db.system.js.save(getAllProjects);
db.system.js.save(getProject);
db.system.js.save(getProjectData);
db.system.js.save(getProjectBasic);
db.system.js.save(getAllObjects);
db.system.js.save(getAllObjectsByType);
db.system.js.save(insertProject);
db.system.js.save(updateProjectData);
db.system.js.save(deleteProject);
db.system.js.save(updateProject);
db.system.js.save(deleteObjectById);
db.system.js.save(updateObject);
db.system.js.save(pumpKurva);
db.system.js.save(getPumpFromLedningUtlopp);
db.system.js.save(getPumpFromLedningInlopp);

//load scripts
db.loadServerScripts();
