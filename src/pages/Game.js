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
    useEffect(() => {
        const results = async () => {
            const response = await fetchForGame();
            setGameData(response);
        };
        results();
    }, []);
    console.log(gameData);

    function test(gameData) {
        var tests = [];
        const usernames = ["Hazel", "Beth", "Georgie", "Catherine", "Jane", "Talia"]
        for (var i in gameData) {
            var type = gameData[i].task_id;
            var type1 = gameData[i].user_id;
            var name = usernames[type1];
            tests.push([type, name]);
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
    var percentTasks = Math.round((completedTasks / totalTasks) * 100);

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

                <div className="profile-tasks">
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
                            {completedTasks}/{totalTasks} completed
                        </h3>
                    </div>
                </div>

                <div className="testss">
                    {test(gameData["tasks"]).map((i) => (
                        <div className="task-card">
                            A task has been completed by{" "}
                            {i[1].toString()}!!
                        </div>
                    ))}
                </div>
            </div>
        </Template>
    );
}
