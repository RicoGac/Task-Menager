import { ServerResponse, IncomingMessage } from "http";
import { addTask } from "../data/tasks";

function postTaskHandler(req: IncomingMessage, res: ServerResponse): void {
    let body = "";

    // Collect the incoming data
    req.on("data", chunk => {
        body += chunk;
    });

    // Process the request after receiving all data
    req.on("end", () => {
        try {
            // Parse the data as JSON
            const parsedBody = JSON.parse(body);

            // Ensure the title is provided
            const { title } = parsedBody;
            if (!title) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Title is required" }));
                return;
            }

            // Add the new task
            const newTask = addTask(title);
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(newTask));
        } catch (err) {
            // Handle invalid JSON
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Invalid JSON" }));
        }
    });
}

export default postTaskHandler;
