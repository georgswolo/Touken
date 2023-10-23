// import { useState } from "react"
import { useEffect, useState } from "react"
import { USER_ID } from "../pages/Home"
import Button from "./Button"
import PopupBar from "./TaskDetails"
import TaskDetail from "./TaskDetails"
import { Link } from "react-router-dom"

export default function Task({task, user, isUnassigned, handleCheck, handleBtnClick, handlePopup, allowEdit}) {

    if (!isUnassigned) {
        if (task.user_id === user) {
            return (
                <section className={`task-card `} onClick={handlePopup}>
                    <section>
                        {
                            allowEdit &&
                            <input className={`task-checkbox`} type="checkbox" checked={task.completed} onChange={handleCheck}/>
                        }
                        <p style={{display: "inline-block"}} className={`${task.completed ? "crossed" : ""}`}>
                            {task.name}
                        </p>
                    </section>
                    <section className="task-btn points">
                        <section style={{display: "flex", alignItems: "center", marginRight: "10%"}}>
                            <i className="fa-solid fa-coins"></i>
                            {task.coins}
                        </section>
                        {
                            allowEdit &&
                            <section className="reject">
                                <Button text={"Reject"} handleBtnClick={handleBtnClick}/>
                            </section>
                        }
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