import React from "react";

export default function TaskList() {

    // initialises an object array storing all the tasks
    const taskList = [
        { id: 1, title: 'Dishes', description: "wash the dishes in the kitchen" },
        { id: 2, title: 'Sweep', description: "sweep floor" }
    ]
    return (
        <div className="task-list">
            {taskList.map((task) => (
                // maps the ids and titles of the tasks into Tasks.js
                <Tasks key={task.id} title = {task.title}/>
            ))}
        </div>
    )
}