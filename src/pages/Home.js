import { useState, useEffect } from "react";
import Template from "../components/Template";
import TaskList from "../components/TaskList";

export const USER_ID = 2;

export default function Home() {

    return (
        <Template title="Tasks">
            <TaskList user_id={USER_ID} isUnassigned={false} allowEdit={true}/>
        </Template>
    );

}