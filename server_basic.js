var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//Default Route returns Tour Axis Assignment - Node.js
app.get('/', function (req, res) {
     return res.send({ error: true, message: 'Tour Axis Assignment - Node.js' })
});

// Set the port on which it should listen on
app.listen(3000, function () {
     console.log('Node app is running on port 3000');
});
module.exports = app;

//Create the database connection
var dbConn = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'client_pass',
     database: 'touraxis_assignment'
});
dbConn.connect(); 

// List all users
app.get('/users', function (req, res) {
    dbConn.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        console.log("List of Users: " + results);
        return res.send({ 
            error: false, 
            data: results, 
            message: 'A list of TourAxis users.' });
    });
});

//Get a single user according to the id
app.get('/user/:id', function (req, res) {
    let user_id = req.params.id;
    if (!user_id) {
        console.log("No User ID was provided.");
        return res.status(400).send({ 
            error: true, 
            message: 'No User ID was provided.' });
    }
    
    dbConn.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
        if (error) throw error;
        console.log("Selected User: " + results[0].username + ": " + results[0].first_name + " - " + results[0].last_name);
        return res.send({ 
            error: false, 
            data: results[0], 
            message: 'User was selected for id: ' + user_id });
     });
 });

// Create a new user  
app.post('/users', function (req, res) {
    let user = req.body;
    
    if (!user) {
        console.log("No user was provided");
        return res.status(400).send({ 
            error:true, 
            message: 'No user was provided' 
        });
        
    }
    else if (!user.username || !user.first_name || !user.last_name) {
        console.log("Please fill in all the required fields");
        return res.status(400).send({ 
            error:true, 
            message: 'Please fill in all the required fields' 
        });
    }
     
    //dbConn.query("INSERT INTO users (username, first_name, last_name) VALUES ('" + user.username + "', '" + user.first_name + "', '" + user.last_name+ "')", function (error, results, fields) {
    dbConn.query("INSERT INTO users (username, first_name, last_name) VALUES (?, ?, ?)", [user.username, user.first_name, user.last_name], function (error, results, fields) {
        if (error) throw error;
        console.log("New user has been created successfully.");
        return res.send({ 
            error: false, 
            data: results, 
            message: 'New user has been created successfully.' });
     });
     
 });

 //  Update the user for the given id
 app.put('/user/:id', function (req, res) {
    let user_id = req.params.id;
    let user = req.body;
    console.log(user_id + " - " + user);
        
    if (!user_id || !user) {
        console.log("Please provide user and user_id.");
        return res.status(400).send({ 
            error: user, 
            message: 'Please provide user and user_id.' 
        });
    }

    if (!user_id) {
        console.log("No user was provided.");
        return res.status(400).send({ 
            error:true, 
            message: 'No user was provided.' 
        });
        
     }
     else if (!user.username || !user.first_name || !user.last_name) {
        console.log("Please fill in all the required fields");
        return res.status(400).send({ 
             error:true, 
             message: 'Please fill in all the required fields' 
         });
    }

    dbConn.query("UPDATE users SET username = ?, first_name = ?, last_name = ? WHERE id = ?", [user.username, user.first_name, user.last_name, user_id], function (error, results, fields) {
        if (error) throw error;
        console.log("User has been updated successfully.");
        return res.send({ 
            error: false, 
            data: results, 
            message: 'User has been updated successfully.' 
        });
    });
     
});

//  Delete user
app.delete('/user/:id', function (req, res) {
    let user_id = req.params.id;
    if (!user_id) {
        console.log("Please provide User Id.");
        return res.status(400).send({ 
            error: true, 
            message: 'Please provide User Id.' });
    }

    dbConn.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        console.log("User ["+user_id+"] has been deleted successfully.");
        return res.send({ 
            error: false, 
            data: results, 
            message: "User ["+user_id+"] has been deleted successfully."});
    });
}); 

// List all tasks
app.get('/tasks', function (req, res) {
    dbConn.query('SELECT * FROM tasks', function (error, results) {
        if (error) throw error;
        console.log("List of Tasks: " + results);
        return res.send({ 
            error: false, 
            data: results, 
            message: 'A list of TourAxis Tasks.' });
    });
});


//Get a single task according to the id
app.get('/task/:id', function (req, res) {
    let task_id = req.params.id;
    if (!task_id) {
        console.log("No Task ID was provided.");
        return res.status(400).send({ 
            error: true, 
            message: 'No Task ID was provided.' });
    }
    
    dbConn.query('SELECT * FROM Tasks where id=?', task_id, function (error, results) {
        if (error) {
            console.log("ERROR: " + error);
            return res.status(400).send({ 
                error: true, 
                message: "ERROR: " + error }); 
        }
        console.log("Selected Task: " + results[0].name + ": " + results[0].description + " - " + results[0].date_time);
        return res.send({ error: false, data: results[0], message: 'Task was selected for id: ' + task_id });
     });
 });

// Create a new task  
app.post('/tasks', function (req, res) {
    let task = req.body;
    let description = "";
    if (!task) {
        console.log("No task was provided");
        return res.status(400).send({ 
            error:true, 
            message: 'No task was provided' 
        });
        
    }
    else if (!task.user_id || !task.name || !task.date_time) {
        console.log("Please fill in all the required fields");
        return res.status(400).send({ 
            error:true, 
            message: 'Please fill in all the required fields' 
        });
    }
    else if (task.description){
        description = task.description;
    }
     
    dbConn.query("INSERT INTO tasks (user_id, name, description, date_time) VALUES (?, ?, ?, ?)", [task.user_id, task.name, description, task.date_time], function (error, results, fields) {
        if (error) throw error;
        console.log("A new Task has been created successfully.");
        return res.send({ 
            error: false, 
            data: results, 
            message: 'A new Task has been created successfully.' });
     });
     
 });

 //  Update the task for the given id
 app.put('/task/:id', function (req, res) {
    let task_id = req.params.id;
    let task = req.body;
    let description = "";

    if (!task_id) {
        console.log("No Task was provided");
        return res.status(400).send({ 
            error:true, 
            message: 'No Task was provided' 
        });
        
     }
     else if (!task.user_id || !task.name || !task.date_time) {
        console.log("Please fill in all the required fields");
        return res.status(400).send({ 
             error:true, 
             message: 'Please fill in all the required fields' 
         });
    }
    else if (task.description){
        description = task.description;
    }

    dbConn.query("UPDATE tasks SET user_id = ?, name = ?, description = ?, date_time = ? WHERE id = ?", [task.user_id, task.name, description, task.date_time, task_id], function (error, results, fields) {
        if (error) throw error;
        console.log("The Task has been updated successfully.");
        return res.send({ 
            error: false, 
            data: results, 
            message: 'The Task has been updated successfully.' 
        });
    });
     
});

//  Delete Task
app.delete('/task/:id', function (req, res) {
    let task_id = req.params.id;
    if (!task_id) {
        console.log("Please provide Task Id.");
        return res.status(400).send({ 
            error: true, 
            message: 'Please provide task id' });
    }
    
    dbConn.query('DELETE FROM tasks WHERE id = ?', [task_id], function (error, results, fields) {
        if (error) throw error;

        console.log("The Task has been deleted successfully.");

        return res.send({ 
            error: false, 
            data: results, 
            message: 'The Task has been deleted successfully.' });
    });
}); 