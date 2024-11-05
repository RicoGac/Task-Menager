"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tasks_1 = require("../data/tasks");
function postTaskHandler(req, res) {
    var body = "";
    // Collect the incoming data
    req.on("data", function (chunk) {
        body += chunk;
    });
    // Process the request after receiving all data
    req.on("end", function () {
        try {
            // Parse the data as JSON
            var parsedBody = JSON.parse(body);
            // Ensure the title is provided
            var title = parsedBody.title;
            if (!title) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Title is required" }));
                return;
            }
            // Add the new task
            var newTask = (0, tasks_1.addTask)(title);
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(newTask));
        }
        catch (err) {
            // Handle invalid JSON
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Invalid JSON" }));
        }
    });
}
exports.default = postTaskHandler;
