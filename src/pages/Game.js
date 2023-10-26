import { useEffect, useState } from "react";
import Template from "../components/Template";
import { fetchForGame } from "../helpers/taskFunctions";
import enemyImage from "../assets/enemy-sprite4.gif";
import playerImage from "../assets/toucan.gif";
import { getByID } from "../helpers/apiFunctions";
import "../Game.css";

//../src/helpers/apiFunctions.js

export default function Game() {
    const [gameData, setGameData] = useState({});
    const [TEST, setUsers] = useState({});
    useEffect(() => {
        const results = async () => {
            const response = await fetchForGame();
            setGameData(response);
        };
        results();

        const getUsers = async () => {
            var tests = [];
            var imp = gameData["tasks"];
            for (var i in imp) {
                const tasks = await getByID("tasks", imp[i]["task_id"]);
                const users = await getByID("users", imp[i]["user_id"]);
                tests.push([
                    JSON.stringify(tasks["name"]),
                    JSON.stringify(users["name"]),
                ]);
            }
            setUsers(tests);

            //  tests.push(i);
        };
        getUsers();
    }, []);
    // console.log(gameData);

    // function test(data) {
    //     var tests = [];
    //     var imp = data["tasks"];

    //     const type = async () => {
    //         for (var i in imp) {
    //             const tasks = await getByID("tasks", imp[i]["task_id"]);
    //             const users = await getByID("users", imp[i]["user_id"]);
    //             tests.push([
    //                 JSON.stringify(tasks["name"]),
    //                 JSON.stringify(users["name"]),
    //             ]);
    //         }
    //     };
    //     type();

    //     //  tests.push(i);
    //     console;
    //     return tests;
    // }

    function test(gameData) {
        var tests = [];
        for (var i in gameData) {
            var type = gameData[i].task_id;
            var type1 = gameData[i].user_id;
            tests.push([type, type1]);
        }
        //  tests.push(i);

        return tests;
    }

    //Getter functions
    function getCompletedTasks(gameData) {
        return gameData["total"];
    }

    function getTotalTasks(gameData) {
        return gameData["completed_total"];
    }

    //Variables
    var totalTasks = getCompletedTasks(gameData);
    var completedTasks = totalTasks - getTotalTasks(gameData);
    var percentTasks = (completedTasks / totalTasks) * 100;

    var test1 = test(gameData).toString();

    return (
        <Template title="Game">
            <div className="battle">
                <div className="sprites">
                    <div className="player">
                        <img src={playerImage} />
                    </div>

                    <div className="enemy">
                        <img src={enemyImage} />
                    </div>
                </div>

                <div className="battle-area">
                    <div className="battle-stage">
                        <h1>Evil Monster</h1>
                        <div className="health-bar">
                            <div className="health-bar-value">
                                {percentTasks}%
                            </div>
                            <div
                                className="health-bar-fill"
                                style={{ width: `${percentTasks}%` }}
                            />
                        </div>
                        <h3>
                            {completedTasks}/{totalTasks} tasks completed
                        </h3>
                        <h4>Help Ken defeat the monster by doing tasks!</h4>
                    </div>
                </div>

                <div className="notifications">
                    <h1>Tasks Completed</h1>
                    {test(gameData["tasks"]).map((i) => (
                        <div className="task-card">
                            {i[0].toString()} has been completed by{" "}
                            {i[1].toString()}
                        </div>
                    ))}
                </div>
            </div>
            <script></script>
        </Template>
    );
}
