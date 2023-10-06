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
        <Template title = "Home">
          
        <section class="home">
            <div class="taskList">
                <div class="task">
                    <h3>Task</h3>
                    <p>task description</p>
                </div>
                
                <div class="button-group-container">
                    <a href="/tasks" class="view-button">All Tasks</a>
                </div>
            </div>
        </section>

        <div class="create-card">
            <a href={`/edit&create`} class="full-button">Create Sample</a>
        </div>

        </Template>
    );
}