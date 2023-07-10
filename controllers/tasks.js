const tasksModel = require("../models/tasks.js");

// Get all Tasks from the database
exports.getTasks = function(req, res) {
    tasksModel.getTaskResults(function(error, results){
        if (error)
            res.status(400).send({ 
            error:true, 
            message: 'No tasks was provided' 
        });
        else res.send(results);
    });
};

// Get a Task from the database
exports.getTask = function(req, res) {
    tasksModel.getTask(req.params.id, function(error, results){
        if (error){
            if (error.kind === "Task not found") {
                res.status(404).send({
                    message: `Task not found with id ${req.params.id}.`
                });
            } 
            else {
                res.status(500).send({
                    message: "Error retrieving Task with id " + req.params.id
                });
            }
        }    
        else res.send(results);
    });
};

// Create a new Task
exports.createTask = function(req, res) {
    if (!req.body) {
        res.status(400).send({
          message: "JSON Content can not be empty!"
        });
    }

    // Create a User
    /*const user = new User({
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    });*/

    tasksModel.createTask(req.body, function(error, results){
        if (error){
            res.status(500).send({
                message: "Error Creating Task: " + req.body.name
            });
        }    
        else res.send(results);
    });
};

// Update a Task
exports.updateTask = function(req, res) {
    if (!req.body) {
        res.status(400).send({
          message: "JSON Content can not be empty!"
        });
    }
    else if (!req.params.id){
        res.status(400).send({
            message: "No Task id provided"
        });
    }

    tasksModel.updateTask(req.params.id, req.body, function(error, results){
        if (error){
            if (error.kind == "task not_found"){
                res.status(404).send({
                    message: "Task not found for: " + req.params.id
                });
            }
            else{
                res.status(500).send({
                    message: "Error Updating Task: " + req.body.name
                });
            }
        }    
        else res.send(results);
    });
};

// Delete a new Task
exports.deleteTask = function(req, res) {
    if (!req.params.id){
        res.status(400).send({
            message: "No Task id provided"
        });
    }

    tasksModel.deleteTask(req.params.id, function(error, results){
        if (error){
            if (error.kind == "task not_found"){
                res.status(404).send({
                    message: "Task not found for: " + req.params.id
                });
            }
        }    
        else res.send(results);
    });
};