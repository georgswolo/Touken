export default function Button({accept, text, handleBtnClick}) {
    return (
        <button className={`btn ${accept ? 'accept' : 'reject'}`} onClick={handleBtnClick}>
            {text}
        </button>
    )
}