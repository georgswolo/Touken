import { useEffect, useState } from "react";
import { acceptTask, fetchUnassignedTask } from "../helpers/taskFunctions";
import Task from "./Task";

export default function TaskList({isUnassigned}) {
    const [tasks, setTasks] = useState([])
    const user_id = 1

    useEffect(() => {
        async function fetchTasks() {
            const unassignedTasks = await fetchUnassignedTask()
            // console.log(unassignedTasks)
            setTasks(unassignedTasks)
        }
        fetchTasks()
    }
    ,[])

    const handleCheck = (_task) => {
        let result = tasks.filter(task => task.status_id != _task.status_id)
        setTasks([...result, {..._task, completed: !_task.completed}])
    }

    const orderTask = (a,b) => {
        if (a.completed == b.completed) {
            return a.status_id > b.status_id
        } else {
            if (a.completed || b.completed) {
                return 1
            } 
        }
    }

    const handleBtnClick = async (task) => {
        await acceptTask({
            ...task,
            user_id: user_id
        })
    }

    return (
        <>  
            
            <p className="container-header">
                {isUnassigned ? "Unassigned Tasks" : "Assigned Tasks"}
            </p>
            {tasks.sort(orderTask).map(task => (
                <Task 
                    key={task.status_id} 
                    task={task} 
                    handleCheck={() => handleCheck(task)} 
                    isUnassigned={isUnassigned}
                    handleBtnClick={() => handleBtnClick(task)}
                 />
            ))}
        </>
    )
}