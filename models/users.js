const dbConn = require("./database.js");

// constructor
const User = function(user) {
    this.username = user.username;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
};

User.getUserResults = function (result) {
    dbConn.query('SELECT * FROM users', function (error, userResults) {
        if (error) {
            console.log("Error: " + error);
            result(null, error);
            return;
        }
        console.log("List of Users: " + JSON.stringify(userResults));
        result(null, userResults);
    });
};

User.getUser = function (user_id, result) {
    if (!user_id) {
        console.log("No User ID was provided.");
        result({error: "No User ID was provided."}, null);
        return;
    }
    
    dbConn.query('SELECT * FROM users where id=?', user_id, function (error, results) {
        if (error) throw error;

        if (results.length) {
            console.log("Selected User: " + results[0].username + ": " + results[0].first_name + " - " + results[0].last_name);
            result(null, results[0]);
            return;
        }

        result({ kind: "User not found" }, null);
    });
};

User.createUser = function (user, result) {
    if (!user) {
        console.log("No User info was provided.");
        result({error: "No User Info was provided."}, null);
        return;
    }
    else if (!user.username || !user.first_name || !user.last_name) {
        console.log("Please fill in all the required fields");
        result({message: 'Please fill in all the required fields'}, null)
        return;   
    }
        
    //dbConn.query("INSERT INTO users (username, first_name, last_name) VALUES ('" + user.username + "', '" + user.first_name + "', '" + user.last_name+ "')", function (error, results, fields) {
    dbConn.query("INSERT INTO users (username, first_name, last_name) VALUES (?, ?, ?)", [user.username, user.first_name, user.last_name], function (error, results, fields) {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }
        console.log("New user has been created successfully.");
        result(null,{message: 'New user has been created successfully.' })
     });
     
};

User.updateUser = function (user_id, user, result) {
    if (!user_id){
        console.log("No User ID provided.");
        result({error: "No User ID provided."}, null);
        return;
    }
    else if (!user) {
        console.log("No User info was provided.");
        result({error: "No User Info was provided."}, null);
        return;
    }
    else if (!user.username || !user.first_name || !user.last_name) {
        console.log("Please fill in all the required fields");
        result({error: 'Please fill in all the required fields'}, null)
        return;   
    }

    dbConn.query("UPDATE users SET username = ?, first_name = ?, last_name = ? WHERE id = ?", [user.username, user.first_name, user.last_name, user_id], function (error, results, fields) {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if (results.affectedRows == 0) {
            // No user found for the given id
            result({ kind: "user not_found" }, null);
            return;
        }

        console.log("User has been updated successfully.");
        result(null,{message: 'User has been updated successfully.' })
    });
};

User.deleteUser = function (user_id, result) {
    if (!user_id){
        console.log("No User ID provided.");
        result({error: "No User ID provided."}, null);
        return;
    }
  
    dbConn.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if (results.affectedRows == 0) {
            // No user found for the given id
            result({ kind: "user not_found" }, null);
            return;
        }

        console.log("User ["+user_id+"] has been deleted successfully.");
        result(null,{message: "User ["+user_id+"] has been deleted successfully."})
    });
};

module.exports = User;