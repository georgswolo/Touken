import React from "react";
import { Link } from "react-router-dom";

export default function Header() {

    return (
        <header class="page-header">
        <h2>Welcome back, User!</h2>
        <div>
        <h3>Your Coins: [number here]</h3>
        </div>
    </header>
    )

}