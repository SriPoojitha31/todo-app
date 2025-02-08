import { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";

function App() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [task, setTask] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (task.trim()) {
            setTasks([...tasks, { text: task, completed: false }]);
            setTask("");
        }
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const toggleComplete = (index) => {
        setTasks(
            tasks.map((t, i) =>
                i === index ? { ...t, completed: !t.completed } : t
            )
        );
    };

    return (
        <div className="App" style={{ padding: "20px" }}>
            <h1>To-Do App</h1>
            <input
                type="text"
                placeholder="Add a new task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                style={{ marginRight: "10px" }}
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((task, index) => (
                    <TaskItem
                        key={index}
                        index={index}
                        task={task}
                        toggleComplete={toggleComplete}
                        deleteTask={deleteTask}
                    />
                ))}
            </ul>
        </div>
    );
}

export default App;
