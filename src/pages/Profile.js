import { useEffect, useState } from "react";
import ProfileHead from "../components/ProfileHead";
import Template from "../components/Template";
import { getAll, getByID } from "../helpers/apiFunctions";
import { USER_ID } from "./Home";
import ProfilePic from "../components/ProfilePic";
import TaskList from "../components/TaskList";
import { Link, useParams } from "react-router-dom";

export default function Profile() {
    const { id } = useParams()
    const [users, setUsers] = useState([])
    const [current, setCurrent] = useState({})


    useEffect(() => {
        const fetchUser = async () => {
           const response = await getAll("users")
           const users_profile = await Promise.all(response.map(async user => {
                const avatar = await getByID("avatars", user.avatar_id)
                return {
                    ...user, source: avatar.source
                }
           }))
           const currentUser = users_profile.find(user => id ? user.user_id == id : user.user_id == USER_ID)
           setUsers(users_profile)
           setCurrent(currentUser)
        }

        fetchUser()
    }, [])

    console.log(current.user_id)
    
    return (
        <Template title="Profile">
            {
                Object.keys(current).length != 0 &&
                <ProfileHead profile_name={current.source } user={current}/>
            }
            <section className="housemates">
                <p>Housemates</p>
                <div>
                    {
                        users
                            .filter(user => user.user_id != USER_ID)
                            .map(user => (
                                <Link to={`/profile/${user.user_id}`}>
                                    <section key={user.user_id} className="housemate-profile">
                                        <ProfilePic profile={user.source} isBig={false}/>
                                        <p> {user.name} </p>
                                    </section>  
                                </Link>
                            ))
                    }
                </div>
            </section>
            <section className="profile-tasks">
                <p className='container-header'>
                    {`${current.name}'s tasks`}
                </p>
                <TaskList user_id={current.user_id} isUnassigned={false} allowEdit={id ? false : true}/>
            </section>
        </Template>
    )
}