export default function Button({text, handleBtnClick}) {
    return (
        <button className="btn" onClick={handleBtnClick}>
            {text}
        </button>
    )
}