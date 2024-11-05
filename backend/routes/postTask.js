"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tasks_1 = require("../data/tasks");
function postTaskHandler(req, res) {
    var body = "";
    // Accumuler les données reçues
    req.on("data", function (chunk) {
        body += chunk;
    });
    // Traiter la requête une fois toutes les données reçues
    req.on("end", function () {
        try {
            // Tenter d'analyser le JSON
            var parsedBody = JSON.parse(body);
            // Vérifier que le titre est présent
            var title = parsedBody.title;
            if (!title) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Title is required" }));
                return;
            }
            // Ajouter la nouvelle tâche
            var newTask = (0, tasks_1.addTask)(title);
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(newTask));
        }
        catch (err) {
            // Gestion de JSON invalide
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Invalid JSON" }));
        }
    });
}
exports.default = postTaskHandler;
