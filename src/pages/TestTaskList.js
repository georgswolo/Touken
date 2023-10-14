import { useEffect, useState } from "react";
import { fetchUnassignedTask } from "../helpers/taskFunctions";
import Test from "./Test";

export default function TestTaskList() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function fetchTasks() {
            const unassignedTasks = await fetchUnassignedTask()
            setTasks(unassignedTasks)
        }
        fetchTasks()
    }
    ,[])

    const handleCheck = (_task) => {
        let result = tasks.filter(task => task.status_id != _task.status_id)
        setTasks([...result, {..._task, completed: !_task.completed}])
    }

    return (
        <>
            <p className="container-header">
                Unassigned tasks
            </p>
            {tasks.map(task => (
                <Test key={task.status_id} task={task} handleCheck={() => handleCheck(task)}/>
            ))}
        </>
    )
}