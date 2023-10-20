// import { useState } from "react"
import { useState } from "react"
import { USER_ID } from "../pages/Home"
import Button from "./Button"
import PopupBar from "./TaskDetails"
import TaskDetail from "./TaskDetails"
import { Link } from "react-router-dom"

export default function Task({task, isUnassigned, handleCheck, handleBtnClick, handlePopup}) {

    
    if (!isUnassigned) {
        console.log(task)
        if (task.user_id === USER_ID) {
            return (
                <section className={`task-card `} onClick={handlePopup}>
                    <section>
                        <input className={`task-checkbox`} type="checkbox" checked={task.completed} onChange={handleCheck}/>
                        <p style={{display: "inline-block"}} className={`${task.completed ? "crossed" : ""}`}>
                            {task.name}
                        </p>
                    </section>
                    <section className="task-btn points">
                        <section style={{display: "flex", alignItems: "center", marginRight: "10%"}}>
                            <i className="fa-solid fa-coins"></i>
                            {task.coins}
                        </section>
                        <Button  text={"Reject"} handleBtnClick={handleBtnClick}/>
                    </section>
                </section>
             )
        }
    } else {
        return (
            <section className="task-card">
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
                    <Button accept={true} text={"Accept"} handleBtnClick={handleBtnClick}/>
                 </section>
            </section>
         )
    }
    
}