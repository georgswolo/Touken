import React from "react";
import { useState } from "react";

export default function Tasks({title}) {

    //sets button state so button will swap if marked as complete
    const [complete, setStatus] = useState(false);

    function getStatus() {
        setStatus(true);
    }

    const taskStatus = `button ${complete ? 'task-complete' : ''}`;


    return (
    // creates a task card for each task that exists in task list
    <div className="task">
                    <h3 className="task-title">{title}</h3>
                    <h1>10 coins</h1>
                    <a className={taskStatus} onClick={getStatus}>
                        {complete ? 'Task Complete' : 'Mark as Complete'}
                    </a>
    </div>
  );
}