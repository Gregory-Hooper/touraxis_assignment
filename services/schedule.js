const tasks = require("../models/tasks");

//Loop through Tasks and 'Run' the task if the date is due

function runTasks(){
    tasks.getTaskResults(function(error, results){
        if (error){
            console.error("Error: " + error);
            return;
        }
        console.log(results);
        Object.keys(results).forEach(taskKey => {
            const value = results[taskKey];
            let currentDate = new Date();
            let taskDate = value.date_time;
            let taskName = value.name;
            if (taskDate < currentDate)
            {
                console.log("The " + taskName + " task has passed its time to run ["+taskDate+ " - " + currentDate +"]");    
            }
            console.log(taskKey + ': ' + value.name + " - " + taskDate);
          });
    });
    console.log("----------------------");
}

// Run Task Schedule initially
runTasks();

// Schedule RunTasks to run every 5 minutes - 5 minutes in milliseconds
setInterval(runTasks, 1 * 60 * 1000);

/*-------------------------------------------------------------------------
const axios = require('axios');
function fetchData() {
  // Make the API call and process the data
  axios.get('https://api.example.com/data')
    .then(response => {
      // Process the data received from the API
      const data = response.data;

      // Loop through the data and do something with each item
      data.forEach(item => {
        // Perform operations on each item
        console.log(item);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Run fetchData initially
fetchData();

// Schedule fetchData to run every 5 minutes
setInterval(fetchData, 5 * 60 * 1000); // 5 minutes in milliseconds*/