import React, { useState, useEffect } from 'react';
import { PlusCircle, Loader2, CheckCircle2, XCircle } from 'lucide-react';

function TaskManager() {
    // States to manage tasks, new task, loading, errors, and success messages
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Load tasks when the component mounts
    useEffect(() => {
        fetchTasks();
    }, []);

    // Function to fetch tasks from the API
    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:3000/tasks');
            if (!response.ok) throw new Error('Error loading tasks');
            const data = await response.json();
            setTasks(data);
        } catch (err) {
            setError('Unable to load tasks');
        } finally {
            setLoading(false);
        }
    };

    // Function to add a new task
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        try {
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newTask }),
            });

            if (!response.ok) throw new Error('Error adding task');

            const task = await response.json();
            setTasks([...tasks, task]);
            setNewTask('');
            setSuccessMessage('Task added successfully!');
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            setError('Unable to add task');
            setTimeout(() => setError(null), 3000);
        }
    };

    if (loading) {
        // Show a loading indicator
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg p-6 mt-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Task Manager
                </h1>

                {/* Form to add a task */}
                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="New task..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
                        >
                            <PlusCircle className="w-5 h-5" />
                            Add
                        </button>
                    </div>
                </form>

                {/* Error messages */}
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {/* Success messages */}
                {successMessage && (
                    <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <p className="text-green-700">{successMessage}</p>
                    </div>
                )}

                {/* Task list */}
                <div className="space-y-3">
                    {tasks.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">
                            No tasks at the moment
                        </p>
                    ) : (
                        tasks.map((task) => (
                            <div
                                key={task.id}
                                className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors duration-200"
                            >
                                <p className="text-gray-800">{task.title}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default TaskManager;
