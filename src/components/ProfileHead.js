import { faCoins } from "@fortawesome/free-solid-svg-icons";
import ProfilePic from "./ProfilePic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProfileHead({profile_name, user}) {
    return (
        <section className="profile-head">
            <ProfilePic profile={profile_name} isBig={true}/>
            <section>
                <h2>{user.name}</h2>
                <section className="profile-details">
                    <FontAwesomeIcon icon={faCoins} />
                    <p>{user.coins}</p>
                </section>
            </section>
        </section>
    )

}

