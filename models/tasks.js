const dbConn = require("./database.js");

// constructor
const Task = function(task) {
    this.user_id = task.user_id;
    this.name = task.first_name;
    this.description = task.description;
    this.date_time = task.date_time;
};

//Get all tasks
Task.getTaskResults = function (result) {
    dbConn.query('SELECT * FROM tasks', function (error, taskResults) {
        if (error) {
            console.log("Error: " + error);
            result(null, error);
            return;
        }
        console.log("List of Tasks: " + JSON.stringify(taskResults));
        result(null, taskResults);
    });
};

Task.getTask = function (task_id, result) {
    if (!task_id) {
        console.log("No Task ID was provided.");
        result({error: "No Task ID was provided."}, null);
        return;
    }
    
    dbConn.query('SELECT * FROM Tasks where id=?', task_id, function (error, results) {
        if (error) throw error;

        if (results.length) {
            console.log("Selected Task: " + results[0].name + ": " + results[0].description + " - " + results[0].date_time);
            result(null, results[0]);
            return;
        }

        result({ kind: "Task not found" }, null);
    });
};

Task.createTask = function (task, result) {
    let description = "";
    if (!task) {
        console.log("No Task info was provided.");
        result({error: "No Task Info was provided."}, null);
        return;
    }
    else if (!task.user_id || !task.name || !task.date_time) {
        console.log("Please fill in all the required fields");
        result({message: 'Please fill in all the required fields'}, null)
        return;   
    }
    else if (task.description){
        description = task.description;
    }

    dbConn.query("INSERT INTO tasks (user_id, name, description, date_time) VALUES (?, ?, ?, ?)", [task.user_id, task.name, description, task.date_time], function (error, results, fields) {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }
        console.log("New Task has been created successfully.");
        result(null,{message: 'New Task has been created successfully.' })
     });
     
};

Task.updateTask = function (task_id, task, result) {
    let description = "";
    if (!task_id){
        console.log("No Task ID provided.");
        result({error: "No Task ID provided."}, null);
        return;
    }
    else if (!task) {
        console.log("No Task info was provided.");
        result({error: "No Task Info was provided."}, null);
        return;
    }
    else if (!task.user_id || !task.name || !task.date_time) {
        console.log("Please fill in all the required fields");
        result({error: 'Please fill in all the required fields'}, null)
        return;   
    }
    else if (task.description){
        description = task.description;
    }

    dbConn.query("UPDATE tasks SET user_id = ?, name = ?, description = ?, date_time = ? WHERE id = ?", [task.user_id, task.name, description, task.date_time, task_id], function (error, results, fields) {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if (results.affectedRows == 0) {
            // No Task found for the given id
            result({ kind: "task not_found" }, null);
            return;
        }

        console.log("Task has been updated successfully.");
        result(null,{message: 'Task has been updated successfully.' })
    });
};

Task.deleteTask = function (task_id, result) {
    if (!task_id){
        console.log("No Task ID provided.");
        result({error: "No Task ID provided."}, null);
        return;
    }
  
    dbConn.query('DELETE FROM tasks WHERE id = ?', [task_id], function (error, results, fields) {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if (results.affectedRows == 0) {
            // No Task found for the given id
            result({ kind: "task not_found" }, null);
            return;
        }

        console.log("Task ["+task_id+"] has been deleted successfully.");
        result(null,{message: "Task ["+task_id+"] has been deleted successfully."})
    });
};

module.exports = Task;