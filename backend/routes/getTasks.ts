import { ServerResponse, IncomingMessage } from "http";
import { getAllTasks } from "../data/tasks"; // Import the getAllTasks function from the tasks module

function getTasks(req: IncomingMessage, res: ServerResponse): void {
    const tasks = getAllTasks(); // Retrieve tasks using the getAllTasks function
    res.statusCode = 200; // Set the response status code to 200 (OK)
    res.setHeader('Content-Type', 'application/json'); // Set the response header to indicate JSON content
    res.end(JSON.stringify(tasks)); // Send the tasks as a JSON response
}
console.log('Current tasks:', getAllTasks()); // Log the current tasks to the console

export default getTasks;
