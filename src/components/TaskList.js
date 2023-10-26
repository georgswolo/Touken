import { useEffect, useState } from "react";
import { acceptTask, fetchAssignedTask, fetchUnassignedTask, updateTaskStatus, updateUserCoins } from "../helpers/taskFunctions";
import Task from "./Task";
import { getByID, update } from "../helpers/apiFunctions";
import Button from "./Button";
import { USER_ID } from "../pages/Home";
import TaskDetail from "./TaskDetails";
import { Link } from "react-router-dom";

export default function TaskList({user_id, isUnassigned, allowEdit}) {
    const [tasks, setTasks] = useState([])


    useEffect(() => {
        async function fetchTasks() {
            let returnTasks
            if (isUnassigned) {
                returnTasks = await fetchUnassignedTask()
                // console.log("unassigned task", returnTasks)
            } else {
                // console.log("id", user_id)
                returnTasks = await fetchAssignedTask(user_id)
                // console.log("assigned task", returnTasks)
            }
            
            const configTasks = returnTasks.map(task => {
                return {
                    ...task,
                    popup: false
                }
            })
            // console.log(configTasks)
            setTasks(configTasks)
            
        }
        fetchTasks()
    }
    ,[user_id])

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

        let user = await getByID("users", _task.user_id)
        await updateUserCoins({
            ...user,
            coins: !_task.completed ? user.coins + _task.coins : user.coins - _task.coins
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
    // console.log("test", user_id)

    return (
        <>  
            <p className="container-header">
                {isUnassigned ? "Unassigned Tasks" : "Assigned Tasks"}
            </p>
            {
                tasks.length == 0 ? 
                    <p style={{padding: "0 3% 0 3%"}}>No tasks yet.</p> :
                    tasks.sort(orderTask)
                        .filter(task => !task.completed)
                        .map(task => (
                        <>
                            <Task 
                                key={task.status_id} 
                                task={task} 
                                user = {user_id}
                                handleCheck={() => handleCheck(task)} 
                                isUnassigned={isUnassigned}
                                handleBtnClick={() => isUnassigned ? handleBtnClick(task, true) : handleBtnClick(task, false)}
                                handlePopup={() => handlePopup(task)}
                                allowEdit={allowEdit}
                            />
                            <section className={`popup-wrapper ${task.popup ? "active" : ""}`}></section>
                            <section className={`popup ${task.popup ? "active" : ""}`}>
                                <TaskDetail task={task} handleCloseBtn={() => handleCloseBtn(task)}/>
                            </section>
                        </>
                        
            ))}

            { !isUnassigned &&
                (<section className="completed">
                    <p className="container-header">
                        Completed Tasks
                    </p>
                    {
                        tasks.length == 0 ? 
                            <p style={{padding: "0 3% 0 3%"}}>No tasks yet.</p> :
                            tasks.sort(orderTask)
                                .filter(task => task.completed)
                                .map(task => (
                                <>
                                    <Task 
                                        key={task.status_id} 
                                        task={task} 
                                        user = {user_id}
                                        allowEdit={allowEdit}
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
                </section>)
            }

            <section 
                style={{
                    display: "flex",
                    width: "95%",
                    justifyContent: "space-around"
                }}
            >
                <Link 
                    className="homepage-btn"
                    to="/pendings"
                >
                    {allowEdit && !isUnassigned ? 
                        <button className="btn">
                            See pending tasks
                        </button> 
                    : ""}
                </Link>
                <Link 
                    className="homepage-btn" 
                    to="/tasks"
                >
                    {
                        allowEdit &&
                        <button className="btn">
                            See all tasks
                        </button> 
                    }
            </Link>
            </section>
            
            
        </>
    )
}