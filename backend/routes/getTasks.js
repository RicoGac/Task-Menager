"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tasks_1 = require("../data/tasks"); // Vérifiez que cet import est correct
function getTasks(req, res) {
    var tasks = (0, tasks_1.getAllTasks)(); // Récupérez les tâches à partir de la fonction
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(tasks)); // Retournez les tâches
}
console.log('Tâches actuelles:', (0, tasks_1.getAllTasks)());
exports.default = getTasks;
