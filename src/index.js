import React from "react";
import {useState} from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import MessageBoard from "./pages/Board"
import Leaderboard from "./pages/Leaderboard";
//import TestTaskList from "./pages/TestTaskList";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/home" element={<Home />} />
                <Route path="/board" element={<MessageBoard/>}/>
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);