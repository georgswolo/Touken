import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import Template from "../components/Template";

const colours = ['priorityPink', 'blue'];

export default function MessageBoard() {

    const [item, setItem] = useState("");
    const [items, setItems] = useState(
        JSON.parse(localStorage.getItem("items")) || []
    );
    const keyPress = (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) {
            newitem();
        }
    };
    const newitem = () => {
        if (item.trim() !== "") {
            //if input is not blank, create a new item object
            const newitem = {
                id: uuidv4(),
                item: item,
                defaultPos: { x: 100, y: 0 },
            };
            //add this new item object to the items array
            setItems((items) => [...items, newitem]);
            //reset item value to empty string
            setItem("");
        } else {
            setItem("");
        }
    };
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);

    const updatePos = (data, index) => {
        let newArr = [...items];
        newArr[index].defaultPos = { x: data.x, y: data.y };
        setItems(newArr);
    };

    const deleteNote = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const [isToggled, setToggled] = useState(false);

    const toggle = () => {
        setToggled(!isToggled);
    };

    return (
        <Template title="Message Board">
            <h1>Message Board</h1>
            <div className="board">
            <h3>Priority Notices</h3>
                <div className="priority">
                    {items.map((item, index) => {
                        return (
                            <Draggable
                                key={item.id}
                                defaultPosition={item.defaultPos}
                                onStop={(e, data) => {
                                    updatePos(data, index);
                                }} >
                                <div className="messages">
                                    <button className='delete' id="delete" onClick={(e) => deleteNote(item.id)}>
                                        X
                                    </button>
                                    <button
                                        className={`toggle-button ${isToggled ? 'active' : ''}`}
                                        onClick={toggle}
                                    >
                                        {isToggled ? 'Priority' : 'Make Priority'}
                                    </button>
                                    <div className="message">
                                        {`${item.item}`}
                                    </div>
                                </div>
                            </Draggable>
                        );
                    })}
                </div>
            </div>
            <div className="post">
                <input className="message"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder="Write your post..."
                    onKeyPress={(e) => keyPress(e)}
                />
                <button className="bright-button" onClick={newitem}>Post</button>
            </div>
        </Template>

    )
}