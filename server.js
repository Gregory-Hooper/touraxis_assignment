var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

require("./routes/routes.js")(app);

// Spawn the process of running through the tasks and checking the task date.
const { exec } = require('child_process');

// Spawn a new child process to run the function
exec(runTasks(), function(error, stderr) {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
  
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
  });

// Set the port on which it should listen on
app.listen(3000, function () {
     console.log('Node app is running on port 3000');
});
module.exports = app;