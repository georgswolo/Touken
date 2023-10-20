import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faUser, faComments, faTrophy } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {

    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };

    const isButtonActive = (buttonId) => {
        return activeButton === buttonId;
    };

    const footerButtons = [
        { id: 1, icon: faList, link: '/tasks' },
        { id: 2, icon: faComments, link: '/board' },
        { id: 3, icon: faHome, link: '/' },
        { id: 4, icon: faTrophy, link: '/leaderboard' },
        { id: 5, icon: faUser, link: '/' },
    ];

    return (
        <footer class="page-footer">
            {footerButtons.map((button) => (
                <a key={button.id} href={button.link} className={`footer-button ${isButtonActive(button.id) ? 'active' : ''}`}
                    onClick={() => handleButtonClick(button.id)}>
                    <FontAwesomeIcon icon={button.icon} style={{ backgroundColor: 'transparent' }} />
                </a>
            ))}
        </footer>
    )
}