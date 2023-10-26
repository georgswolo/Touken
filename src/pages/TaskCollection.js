import { useState, useEffect } from "react";
import Template from "../components/Template";
import TaskList from "../components/TaskList";
import { add, deleteItem, getAll } from "../helpers/apiFunctions";
import TaskDetail from "../components/TaskDetails";
import { faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function TaskCollection() {
    const [tasks, setTasks] = useState([])
    const [addTask, setAddTask] = useState(false)
    const initialTemplate = {
        name: null,
        description: null,
        coins: null,
        frequency: null
    }
    const [templateTask, setTemplate] = useState(initialTemplate)

    useEffect(() => {
        const fetchTasks = async () => {
            const allTasks = await getAll("tasks")
            const results = allTasks.map(task => {
                return {
                    ...task,
                    popup: false
                }
            })
            setTasks(results)
        }
        fetchTasks()
    }, [])

    const handlePopup = (_task) => {
        let result = tasks.filter(task => task.task_id != _task.task_id)
        setTasks([...result, {..._task, popup: !_task.popup}])
    }

    const handleCloseBtn = (_task) => {
        let result = tasks.filter(task => task.task_id != _task.task_id)
        setTasks([...result, {..._task, popup: !_task.popup}])
    }

    const orderTask = (a,b) => {
        return a.task_id - b.task_id
    }

    const addBtnClick = () => {
        setAddTask(true)
    }

    const closeBtnClick = () => {
        setAddTask(false)
        setTemplate(initialTemplate)
    }

    const handleInput = (field, value) => {
        if (field == 0) {
            setTemplate({
                ...templateTask,
                name: value
            })
        } else if (field == 1) {
            setTemplate({
                ...templateTask,
                description: value
            })
        } else if (field == 2) {
            setTemplate({
                ...templateTask,
                coins: value
            })
        } else if (field == 3) {
            setTemplate({
                ...templateTask,
                frequency: value
            })
        }
        
    }

    const handleAddTask = async () => {
        const isEmpty = Object.values(templateTask).every(x => x === null || x === '');
        if (isEmpty) {
            alert("Cannot add task when all fields not filled")
        } else {
            let result = await add("tasks", templateTask)
            let now = new Date()
            const status = {
                start_date: now.toISOString(),
                completed: false,
                task_id: result.task_id,
                user_id: null
            }
            result = await add("task-status", status)
            console.log(result)
            if (typeof result === 'object') {
                alert("Task succesfully added!")
            }
        }
    }
    
    const handleDelete = async (id) => {
        console.log("in", id)
        await deleteItem("tasks", id)
        const allTasks = await getAll("tasks")
        const results = allTasks.map(task => {
            return {
                ...task,
                popup: false
            }
        })
        setTasks(results)
    }

    
    return (
        <Template title="Tasks List" backBtn={true}>
            <section style={{paddingTop: "5%"}}>
                {
                    tasks.length > 0 ? 
                        tasks
                        .sort(orderTask)
                        .map(task => 
                            <>  
                                <div>
                                    <SimpleTaskCard 
                                        key={task.task_id} 
                                        task={task} 
                                        handlePopup={() => handlePopup(task)}
                                        handleDelete={() => handleDelete(task.task_id)}
                                    />
                                </div>
                                
                                <section className={`popup-wrapper ${task.popup ? "active" : ""}`}></section>
                                <section className={`popup ${task.popup ? "active" : ""}`}>
                                    <TaskDetail task={task} handleCloseBtn={() => handleCloseBtn(task)}/>
                                </section>

                            </>
                        ) : "No content yet"
                }
            </section>
           
            <section style={{display: "block", textAlign: "center"}}>
                <button className="btn" onClick={() => addBtnClick()} >
                    Add task
                </button> 
            </section>
            <section className={`popup-wrapper ${addTask ? "active " : ""} `}></section>
            <section 
                className={`popup collection ${addTask ? "active " : ""}`}
                onSubmit={() => handleAddTask()}
            >
                <form className="add-popup">
                    <div className="popup-header">
                        <span className='container-header'>
                            Add task
                        </span>
                        <FontAwesomeIcon icon={faXmark} style={{fontSize: "6vw"}} onClick={() => closeBtnClick()}/>
                    </div>
                    <section>
                        <label for="name">Task Name</label>
                        <input 
                            type="text" 
                            placeholder="Enter task name" 
                            name="name" 
                            onChange={(e) => handleInput(0, e.target.value)}
                            value={`${templateTask.name ? templateTask.name : ""}`}
                        />
                    </section>
                    
                    <section>
                        <label for="desc">Description</label>
                        <textarea 
                            type="text" 
                            placeholder="Enter task description" 
                            name="desc"
                            onChange={(e) => handleInput(1, e.target.value)}
                            value={`${templateTask.description ? templateTask.description : "" }`}
                        ></textarea>
                    </section>

                    <section>
                        <label for="coins">Coins</label>
                        <input 
                            type="number" 
                            name="coins"
                            onChange={(e) => handleInput(2, e.target.value)}
                            value={`${templateTask.coins ?templateTask.coins : ""}`}
                        />
                    </section>

                    <section>
                        <label for="freq">Frequency (hours)</label>
                        <input 
                            type="number" 
                            name="freq"
                            onChange={(e) => handleInput(3, e.target.value)}
                            value={`${templateTask.frequency ? templateTask.frequency : ""}`}
                        />
                    </section>

                    <button 
                        type="submit" 
                        className="btn" 
                        style={{
                            backgroundColor: "var(--darkPink)",
                            width: "50%",
                            margin: "auto"
                        }}
                    >
                        Add
                    </button>
                </form>
            </section>
            
        </Template>
    );

}

function SimpleTaskCard({task, handlePopup, handleDelete }) {
    return (
        <div 
            style={{
                display: "flex",
                maxWidth: "95%",
                margin: "auto",
                alignItems: "center"
            }}
        >
            <section 
                className={`task-card `} 
                onClick={handlePopup}
                style={{
                    width: "90%"
                }}
            >
                <section>
                    <p style={{display: "inline-block"}}>
                        {task.name}
                    </p>
                </section>
                <section className="task-btn points">
                    <section style={{display: "flex", alignItems: "center", marginRight: "10%"}}>
                        <i className="fa-solid fa-coins"></i>
                        {task.coins}
                    </section>
                </section>
            </section>
            <FontAwesomeIcon 
                style={{color: "crimson"}} 
                icon={faTrashCan} 
                onClick={handleDelete}
            />
        </div>
        
    )
}

