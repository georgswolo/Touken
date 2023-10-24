import { useEffect, useState } from "react";
import Template from "../components/Template";
import { fetchForGame } from "../helpers/taskFunctions";
import enemyImage from "../assets/enemy-sprite4.gif";
import playerImage from "../assets/toucan.gif";
import "../Game.css";

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

  function battleMode() {
    if (percentTasks > 0) {
    }
    //if tasks increase, and health > 0 hide pop up and show monster again
  }

  function restMode() {
    if (percentTasks <= 0) {
    }
    //if health is zero - hide enemy and show pop up - add more tasks to battle again!
  }

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
            <div className="health-bar">
              <div className="health-bar-value">{percentTasks}%</div>
              <div
                className="health-bar-fill"
                style={{ width: `${percentTasks}%` }}
              />
            </div>
            <h2>
              {completedTasks}/{totalTasks}
            </h2>
            <h1>Evil Monster</h1>
          </div>
        </div>
      </div>
    </Template>
  );
}
