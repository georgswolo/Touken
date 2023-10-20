import React from "react";
import {useState} from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MessageBoard from "./pages/MessageBoard";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Pendings from "./pages/Pendings";
import TaskDetail from "./components/TaskDetails";


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notice" element={<MessageBoard />} />
                <Route path="/game" element={<Game />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/pendings" element={<Pendings />} />
                <Route path="/task-details/:id" element={<TaskDetail />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);