import Template from "../components/Template";
import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import { getAll, getByID, add } from "../helpers/apiFunctions";
import { Link, useParams } from "react-router-dom";

var colours = [];
var isPriority;
var position;

export default function MessageBoard() {

    const { id } = useParams();

    const [item, setItem] = useState([]);
    const [items, setItems] = useState(
        JSON.parse(localStorage.getItem("items")) || []
    );
    const keyPress = (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) {
            newitem();
        }
    };
    const [isToggled, setToggled] = useState(false);

    const toggle = () => {
        setToggled(!isToggled);
    };


    const newitem = () => {
        if (item.trim() !== "") {
            //if input is not blank, create a new item object
            //change colours if message is priority
            if (isToggled == true) {
                colours = ['#d7e4d9'];
                isPriority = 'PRIORITY ';
                position = {x: 100, y: -150};
            }
            else {
                colours = ['#acaecf'];
                isPriority = 'NOTICE';
                position = {x: 100, y: 100};
            }
            const newitem = {
                id: uuidv4(),
                item: item,
                title: isPriority,
                color: colours[0],
                priority: isToggled,
                defaultPos: position,
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
        add("item", JSON.stringify(items));
    }, [items]);

    const updatePos = (data, index) => {
        let newArr = [...items];
        newArr[index].defaultPos = { x: data.x, y: data.y };
        setItems(newArr);
    };

    const deleteNote = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <Template title="Message Board">
            <div className="board-page">
            <div className="board">
                <h1>Notices</h1>
                <div className="priority-board">
                    <h1>! Priority Notices !</h1>
                </div>
                {items.map((item, index) => {
                    return (
                        <Draggable
                            key={item.id}
                            defaultPosition={item.defaultPos}
                            onStop={(e, data) => {
                                updatePos(data, index);
                            }} >
                                <div style={{ backgroundColor: item.color }} className="message">
                                    {`${item.item}`}
                                <button className='delete' id="delete" onClick={(e) => deleteNote(item.id)}>
                                    X
                                </button>
                                </div>
                        </Draggable>
                    );
                })}
            </div>
            <div className="post">
                <input className="message"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder="Write your post..."
                    onKeyPress={(e) => keyPress(e)}
                />
                <button
                    className={`toggle-button ${isToggled ? 'active' : ''}`}
                    onClick={toggle}
                >
                    {isToggled ? 'Priority' : 'Make Priority'}
                </button>
                <button className="post-button" onClick={newitem}>Post</button>
            </div>
            </div>
        </Template>

    )
}