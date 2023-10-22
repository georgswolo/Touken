export default function ProfilePic({profile, isBig}) {
    return (
        <img  className={`profile-pic ${isBig ? 'big' : 'small'}`} src={require(`../assets/${profile}.png`)} />
    )
}