import { useEffect, useState } from "react";
import { acceptTask, fetchAssignedTask, fetchUnassignedTask, updateTaskStatus } from "../helpers/taskFunctions";
import Task from "./Task";
import { update } from "../helpers/apiFunctions";
import Button from "./Button";
import { USER_ID } from "../pages/Home";

export default function TaskList({isUnassigned}) {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function fetchTasks() {
            if (isUnassigned) {
                const unassignedTasks = await fetchUnassignedTask()
                console.log("unassigned task", unassignedTasks)
                setTasks(unassignedTasks)
            } else {
                const assignedTasks = await fetchAssignedTask(USER_ID)
                console.log("assigned task", assignedTasks)
                setTasks(assignedTasks)
            }
            
        }
        fetchTasks()
    }
    ,[])

    const orderTask = (a,b) => {
        if (a.completed == b.completed) {
            return a.status_id - b.status_id
        } else {
            if (a.completed) {
                return 1
            } else {
                return -1
            }
        }
    }

    const handleBtnClick = async (task, isAccepting) => {
        await updateTaskStatus({
            ...task,
            user_id: isAccepting ? USER_ID : null
        })
        const remainingTasks = tasks.filter(_task => _task.status_id != task.status_id)
        setTasks(remainingTasks)
    }

    const handleCheck =  async (_task) => {
        let result = tasks.filter(task => task.status_id != _task.status_id)
        await updateTaskStatus({
            ..._task,
            completed: !_task.completed
        })
        setTasks([...result, {..._task, completed: !_task.completed}])
    }


    return (
        <>  
            <p className="container-header">
                {isUnassigned ? "Unassigned Tasks" : "Assigned Tasks"}
            </p>
            {
                tasks.length == 0 ? 
                    <p>No tasks yet.</p> :
                    tasks.sort(orderTask).map(task => (
                        <Task 
                            key={task.status_id} 
                            task={task} 
                            handleCheck={() => handleCheck(task)} 
                            isUnassigned={isUnassigned}
                            handleBtnClick={() => isUnassigned ? handleBtnClick(task, true) : handleBtnClick(task, false)}
                        />
            ))}
            <a style={{display: "block", textAlign: "center"}} href="/pendings">
                {!isUnassigned ? 
                    <button className="btn">
                        See pending tasks
                    </button> 
                : ""}
            </a>
        </>
    )
}