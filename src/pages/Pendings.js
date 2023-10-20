import { useState, useEffect } from "react";
import Template from "../components/Template";
import TaskList from "../components/TaskList";


export default function Pendings() {
    return (
        <Template title="Tasks">
            <TaskList isUnassigned={true}/>
        </Template>
    );

}