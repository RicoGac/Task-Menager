"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tasks_1 = require("../data/tasks"); // Import the getAllTasks function from the tasks module
function getTasks(req, res) {
    var tasks = (0, tasks_1.getAllTasks)(); // Retrieve tasks using the getAllTasks function
    res.statusCode = 200; // Set the response status code to 200 (OK)
    res.setHeader('Content-Type', 'application/json'); // Set the response header to indicate JSON content
    res.end(JSON.stringify(tasks)); // Send the tasks as a JSON response
}
console.log('Current tasks:', (0, tasks_1.getAllTasks)()); // Log the current tasks to the console
exports.default = getTasks;
