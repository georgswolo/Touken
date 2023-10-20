// import { useState } from "react"

import Button from "./Button"

export default function Task({task, handleCheck, isUnassigned, handleBtnClick}) {
    
    if (!isUnassigned) {
        return (
            <section className="task-card">
                 <section>
                     <input className="task-checkbox" type="checkbox" checked={task.completed} onChange={handleCheck}/>
                     <p style={{display: "inline-block"}}>
                         {task.name}
                     </p>
                 </section>
                 <section className="points">
                     <i className="fa-solid fa-coins"></i>
                     {task.coins}
                 </section>
            </section>
         )
    } else {
        return (
            <section className="task-card">
                 <section>
                     <p style={{display: "inline-block"}}>
                         {task.name}
                     </p>
                 </section>
                 <section className="unassigned-btn points">
                    <section style={{display: "flex", alignItems: "center", marginRight: "10%"}}>
                        <i className="fa-solid fa-coins"></i>
                        {task.coins}
                    </section>
                    <Button text={"Accept"} handleBtnClick={handleBtnClick}/>
                 </section>
            </section>
         )
    }
    
}