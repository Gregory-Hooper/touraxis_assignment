# TourAxis Assignment

The purpose of this project is to give insight on my individual abilities and demonstrate what I consider significant in my work. 

The assignment was to create a simple NodeJS restful application that manages users and tasks for those users. Additionally there is a schedule service to check all the tasks
in the database. Tasks should be updated to Done and a log printed to the console where the Task's status is Pending and the Date for the task has passed.


## Table of contents

- Requirements
- Installation
- How To


## Requirements

- MySql needs to be installed
- Postman chrome plugin - this will be used to perform the calls to test the application


## Installation

Run the SQL files which can be found in the 'database_export' directory to Create the 'tourAxis_sssignment' database and populate it with some dummy data. Run users.sql first as Tasks need to link to Users.


## How To

- To run the application go to the 'tourAxis_assignment' Directory and run the following command to start it up
    * node .\server.js

- Make use of Post Man run the following commands to test the application.
    * Get a List of all Users
        Method: GET
        http://127.0.0.1:3000/api/users
    
    * Get User Info
        Method: GET
        http://127.0.0.1:3000/api/user/4

    * Create User API Call
        Method: POST
        http://127.0.0.1:3000/api/user
        {"username":"plompies","first_name" : "Pieter", "last_name" : "Lompies"}
    
    * Update User API Call
        Method: PUT
        http://127.0.0.1:3000/api/user/1
        {"username":"ghooper","first_name" : "Greg", "last_name" : "Hooper"}
    
    * Delete User API Call
        Method: DELETE
        http://127.0.0.1:3000/api/user/1
    
    * Get a List of all Tasks
        Method: GET
        http://127.0.0.1:3000/api/tasks
    
    * Get Task Info
        Method: GET
        http://127.0.0.1:3000/api/task/1

    * Create Task API Call
        Method: POST
        http://127.0.0.1:3000/api/task
        {"user_id": 1,"name": "Mop","description": "Mop Floors","date_time": "2023-07-17 11:02:00.000"}
    
    * Update Task API Call
        Method: PUT
        http://127.0.0.1:3000/api/task/1
        {"user_id": 1,"name": "Wash Car","description": "Wash and dry the car","date_time": "2023-07-06 09:30:00.000","status": "Pending"}
    
    * Delete Task API Call
        Method: DELETE
        http://127.0.0.1:3000/api/task/1
    



