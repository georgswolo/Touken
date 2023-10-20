import { useState, useEffect } from "react";
import Template from "../components/Template";
import TaskList from "../components/TaskList";

export const USER_ID = 1;

export default function Home() {

    return (
        <Template title="Tasks">
            <TaskList isUnassigned={false}/>
        </Template>
    );

}