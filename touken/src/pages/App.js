import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Template from "../components/Template";
import TaskList from "../components/TaskList";


export default function App() {
  
    return (
        <Template>
          
        <section>
            <h1>Your Tasks</h1>
            <TaskList/>

        </section>
        <div class="button-group-container">
                    <a href="/tasks" class="view-button">All Tasks</a>
                </div>
        </Template>
    );
}