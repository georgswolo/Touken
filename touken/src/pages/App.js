import { Link } from "react-router-dom";
import Template from "../components/Template";

export default function App() {

    const navLinks = [
 
        {
            name: "Home",
            url: "/home",
        },
    ];
  
    return (
        <Template>
          
        <section>
            <h1>Your Tasks</h1>
            <div class="taskList">
                <div class="task">
                    <h3>Task</h3>
                    <p>task description</p>
                </div>
                <div class="task">
                    <h3>Task</h3>
                    <p>task description</p>
                </div>
                

            </div>
        </section>
        <section>
        <div class="button-group-container">
                    <a href="/tasks" class="view-button">All Tasks</a>
                </div>
        </section>
        </Template>
    );
}