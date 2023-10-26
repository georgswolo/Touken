import Template from "../components/Template";
import { Leaderboard } from "flywheel-leaderboard";
import { getAll, getByID } from "../helpers/apiFunctions";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProfilePic from "../components/ProfilePic";

export default function Leaders() {

    const { id } = useParams()
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await getAll("users")
            const userData = await Promise.all(response.map(async user => {
                const avatar = await getByID("avatars", user.avatar_id)
                return {
                    ...user, source: avatar.source
                }
            }))
            setUsers(userData)
        }
        fetchUser()
    }, [id],
        users.forEach(user => {
            user['pics'] = <section key={user.user_id} className="housemate-profile">
                <ProfilePic profile={user.source} isBig={false} />
            </section>
        }),
        users.forEach(user => {
            user['tokens'] = <div>{user.coins} <br></br><i className="fa-solid fa-coins"></i></div>
        }))


    return (
        <Template title="Leaderboard">
            <section className="leaderboard-frame">
            <h4>Weekly</h4>
                <Leaderboard
                    className="leaderboard"
                    scoringMetric="coins"
                    id="pics"
                    cell1="name"
                    cell2="tokens"
                    items={users}>
                </Leaderboard>
            </section>
        </Template>
    )
}