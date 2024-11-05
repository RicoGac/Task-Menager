"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTask = exports.getAllTasks = void 0;
var crypto_1 = require("crypto");
var fs = require("fs");
var path = require("path");
var tasksFilePath = path.join(__dirname, 'tasks.json');
var loadTasks = function () {
    if (!fs.existsSync(tasksFilePath)) {
        return [];
    }
    var data = fs.readFileSync(tasksFilePath, 'utf-8');
    return JSON.parse(data);
};
var saveTasks = function (tasks) {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};
var tasks = loadTasks();
var getAllTasks = function () {
    return tasks;
};
exports.getAllTasks = getAllTasks;
var addTask = function (title) {
    var newTask = {
        id: (0, crypto_1.randomUUID)(),
        title: title,
    };
    tasks.push(newTask);
    saveTasks(tasks); // Sauvegarder dans le fichier
    return newTask;
};
exports.addTask = addTask;
