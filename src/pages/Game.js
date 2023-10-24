import { useEffect, useState } from "react";
import Template from "../components/Template";
import { fetchForGame } from "../helpers/taskFunctions";

export default function Game() {
    const [gameData, setGameData] = useState({})
    useEffect(() => {
        const results = async () => {
            const response = await fetchForGame()
            setGameData(response)
        }
        results()
    }, [])
    console.log(gameData)

    return (
        <Template title="Game">
            Content is coming...
        </Template>
    )
}