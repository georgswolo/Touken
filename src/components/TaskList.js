import { useEffect, useState } from "react";
import { acceptTask, fetchAssignedTask, fetchUnassignedTask, updateTaskStatus } from "../helpers/taskFunctions";
import Task from "./Task";
import { update } from "../helpers/apiFunctions";
import Button from "./Button";
import { USER_ID } from "../pages/Home";
import TaskDetail from "./TaskDetails";
import { Link } from "react-router-dom";

export default function TaskList({isUnassigned}) {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function fetchTasks() {
            let returnTasks
            if (isUnassigned) {
                returnTasks = await fetchUnassignedTask()
                console.log("unassigned task", returnTasks)
            } else {
                returnTasks = await fetchAssignedTask(USER_ID)
                console.log("assigned task", returnTasks)
            }
            
            const configTasks = returnTasks.map(task => {
                return {
                    ...task,
                    popup: false
                }
            })
            console.log(configTasks)
            setTasks(configTasks)
            
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

    const handlePopup = (_task) => {
        let result = tasks.filter(task => task.status_id != _task.status_id)
        setTasks([...result, {..._task, popup: !_task.popup}])
    }

    const handleCloseBtn = (_task) => {
        let result = tasks.filter(task => task.status_id != _task.status_id)
        setTasks([...result, {..._task, popup: !_task.popup}])
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
                        <>
                            <Task 
                                key={task.status_id} 
                                task={task} 
                                handleCheck={() => handleCheck(task)} 
                                isUnassigned={isUnassigned}
                                handleBtnClick={() => isUnassigned ? handleBtnClick(task, true) : handleBtnClick(task, false)}
                                handlePopup={() => handlePopup(task)}
                            />
                            <section className={`popup-wrapper ${task.popup ? "active" : ""}`}></section>
                            <section className={`popup ${task.popup ? "active" : ""}`}>
                                <TaskDetail task={task} handleCloseBtn={() => handleCloseBtn(task)}/>
                            </section>
                        </>
                        
            ))}
            <Link style={{display: "block", textAlign: "center"}} to="/pendings">
                {!isUnassigned ? 
                    <button className="btn">
                        See pending tasks
                    </button> 
                : ""}
            </Link>
        </>
    )
}