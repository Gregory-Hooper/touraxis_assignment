const usersModel = require("../models/users.js");

// Get Welcome message
exports.getWelcomeMessage = function(req, res) {
   res.send("Welcome to the Node.js Tour Axis Assignment");
};

// Get all Users from the database
exports.getUsers = function(req, res) {
    usersModel.getUserResults(function(error, results){
        if (error)
            res.status(400).send({ 
            error:true, 
            message: 'No user was provided' 
        });
        else res.send(results);
    });
};

// Get a Users from the database
exports.getUser = function(req, res) {
    usersModel.getUser(req.params.id, function(error, results){
        if (error){
            if (error.kind === "User not found") {
                res.status(404).send({
                    message: `User not found with id ${req.params.id}.`
                });
            } 
            else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.id
                });
            }
        }    
        else res.send(results);
    });
};

// Create a new User
exports.createUser = function(req, res) {
    if (!req.body) {
        res.status(400).send({
          message: "JSON Content can not be empty!"
        });
    }

    usersModel.createUser(req.body, function(error, results){
        if (error){
            res.status(500).send({
                message: "Error Creating User: " + req.body.username
            });
        }    
        else res.send(results);
    });
};

// Update a new User
exports.updateUser = function(req, res) {
    
    if (!req.body) {
        res.status(400).send({
          message: "JSON Content can not be empty!"
        });
    }
    else if (!req.params.id){
        res.status(400).send({
            message: "No user id provided"
        });
    }

    usersModel.updateUser(req.params.id, req.body, function(error, results){
        if (error){
            if (error.kind == "user not_found"){
                res.status(404).send({
                    message: "User not found for: " + req.params.id
                });
            }
            else{
                res.status(500).send({
                    message: "Error Updating User: " + req.body.username
                });
            }
        }    
        else res.send(results);
    });
};

// Delete a new User
exports.deleteUser = function(req, res) {
    if (!req.params.id){
        res.status(400).send({
            message: "No user id provided"
        });
    }

    usersModel.deleteUser(req.params.id, function(error, results){
        if (error){
            if (error.kind == "user not_found"){
                res.status(404).send({
                    message: "User not found for: " + req.params.id
                });
            }
        }    
        else res.send(results);
    });
};