import { randomUUID } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

export interface Task {
  id: string;
  title: string;
}

const tasksFilePath = path.join(__dirname, 'tasks.json');

// Load tasks from the JSON file
const loadTasks = (): Task[] => {
  if (!fs.existsSync(tasksFilePath)) {
    return [];
  }
  const data = fs.readFileSync(tasksFilePath, 'utf-8');
  return JSON.parse(data);
};

// Save tasks to the JSON file
const saveTasks = (tasks: Task[]): void => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

let tasks: Task[] = loadTasks();

// Get all tasks
export const getAllTasks = (): Task[] => {
  return tasks;
};

// Add a new task
export const addTask = (title: string): Task => {
  const newTask: Task = {
    id: randomUUID(),
    title,
  };
  tasks.push(newTask);
  saveTasks(tasks); // Save to the file
  return newTask;
};
