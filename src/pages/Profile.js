import { useEffect, useState } from "react";
import ProfileHead from "../components/ProfileHead";
import Template from "../components/Template";
import { getByID } from "../helpers/apiFunctions";
import { USER_ID } from "./Home";

export default function Profile() {
    const [user, setUser] = useState({})
    useEffect(() => {
        const fetchUser = async () => {
            const response =  await getByID("users", USER_ID)
            setUser(response)
        }

        fetchUser()
    }, [])
    
    return (
        <Template title="Profile">
            <ProfileHead profile_name={"profile_1"} user={user}/>
        </Template>
    )
}