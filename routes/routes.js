module.exports = app => {
const users = require("../controllers/users.js");
const tasks = require("../controllers/tasks.js");
var router = require("express").Router();

// Welcome page
router.get("/", users.getWelcomeMessage);

// Retrieve User Results
router.get("/users", users.getUsers);

// Retrieve a User
router.get("/user/:id", users.getUser);

// Create a User
router.post("/user", users.createUser);

// Update a User
router.put("/user/:id", users.updateUser);

// Delete a User
router.delete("/user/:id", users.deleteUser);

// Retrieve Task Results
router.get("/tasks", tasks.getTasks);

// Retrieve a Task
router.get("/task/:id", tasks.getTask);

// Create a Task
router.post("/task", tasks.createTask);

// Update a Task
router.put("/task/:id", tasks.updateTask);

// Delete a Task
router.delete("/task/:id", tasks.deleteTask);


app.use('/api/', router);
};