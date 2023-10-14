// import { useState } from "react"

export default function Test({task, handleCheck}) {
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
}