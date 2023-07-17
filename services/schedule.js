const tasks = require("../models/tasks");

//Loop through Tasks and 'Run' the task if the date is due
function runTasks(){
  tasks.getTaskResults(function(error, results){
        if (error){
            console.error("Error: " + error);
            results({error: "No Task ID was provided."}, null);
            return;
        }
        console.log("----------START PROCESSING TASKS------------");
        Object.keys(results).forEach(taskKey => {
            const value = results[taskKey];
            let currentDate = new Date();
            let task_id = value.id;
            let taskDate = value.date_time;
            let taskName = value.name;
            let taskStatus = value.status;
            if ((taskStatus == 'Pending')&&(taskDate < currentDate))
            {
              console.log("The " + task_id+"-"+taskName + " task has passed its time to run ["+ taskStatus +": "+taskDate+ " - " + currentDate +"]");    
              value.status = "Done";
              tasks.updateTask(task_id,value,function(error,result){
              if (error){
                if (error.kind == "task not_found"){
                  console.error("No Task ID was provided: " + error);
                  results({error: "No Task ID was provided: " + task_id}, null);
                }
                else{
                  console.error("Error Updating Task: " + error);
                  results({error: "Error Updating Task: " + task_id}, null);
                }
              }    
              });
            }
            else if(taskStatus == 'Pending')console.log(taskStatus+": " +task_id+"-"+taskName+"["+ taskDate +"]"); 
          });
          console.log("----------FININSHED PROCESSING TASKS------------");
    });
}

// Schedule RunTasks to run every 60 seconds
setInterval(runTasks, 60000);