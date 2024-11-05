"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTask = exports.getAllTasks = void 0;
var crypto_1 = require("crypto");
var fs = require("fs");
var path = require("path");
var tasksFilePath = path.join(__dirname, 'tasks.json');
// Load tasks from the JSON file
var loadTasks = function () {
    if (!fs.existsSync(tasksFilePath)) {
        return [];
    }
    var data = fs.readFileSync(tasksFilePath, 'utf-8');
    return JSON.parse(data);
};
// Save tasks to the JSON file
var saveTasks = function (tasks) {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};
var tasks = loadTasks();
// Get all tasks
var getAllTasks = function () {
    return tasks;
};
exports.getAllTasks = getAllTasks;
// Add a new task
var addTask = function (title) {
    var newTask = {
        id: (0, crypto_1.randomUUID)(),
        title: title,
    };
    tasks.push(newTask);
    saveTasks(tasks); // Save to the file
    return newTask;
};
exports.addTask = addTask;
