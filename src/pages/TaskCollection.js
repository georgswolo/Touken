import { useState, useEffect } from "react";
import Template from "../components/Template";
import TaskList from "../components/TaskList";
import { getAll } from "../helpers/apiFunctions";
import TaskDetail from "../components/TaskDetails";


export default function TaskCollection() {
    const [tasks, setTasks] = useState([])
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
    console.log(tasks)

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

    let a = {
        "task_id": 1,
        "name": "Mop the floor",
        "description": "Mopping",
        "coins": 20,
        "frequency": 2,
        "popup": false
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
                                <SimpleTaskCard key={task.task_id} task={task} handlePopup={() => handlePopup(task)}/>
                                <section className={`popup-wrapper ${task.popup ? "active" : ""}`}></section>
                                <section className={`popup ${task.popup ? "active" : ""}`}>
                                    <TaskDetail task={task} handleCloseBtn={() => handleCloseBtn(task)}/>
                                </section>
                            </>
                        ) : "No content yet"
                }
            </section>
           
            <section style={{display: "block", textAlign: "center"}}>
                <button className="btn">
                    Add task
                </button> 
            </section>

            <form class="add-popup">
                <section>
                    <label for="name">Task Name</label>
                    <input type="text" placeholder="Enter task name" name="name"/>
                </section>
                
                <section>
                    <label for="desc">Description</label>
                    <textarea type="text" placeholder="Enter task description" name="desc"></textarea>
                </section>

                <section>
                    <label for="coins">Coins</label>
                    <input type="number" name="coins"/>
                </section>

                <section>
                    <label for="freq">Frequency (in hours)</label>
                    <input type="number" name="freq"/>
                </section>
            </form>
        </Template>
    );

}

function SimpleTaskCard({task, handlePopup}) {
    return (
        <section className={`task-card `} onClick={handlePopup}>
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
    )
}

