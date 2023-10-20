import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faNoteSticky, faGamepad, faUser, faTrophy } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    const buttons = [
        { id: 1, icon: faListCheck, link: '/'},
        { id: 2, icon: faNoteSticky, link: '/notice'},
        { id: 3, icon: faGamepad, link: '/game'},
        { id: 4, icon: faTrophy, link: '/leaderboard'},
        { id: 5, icon: faUser, link: '/profile'},
    ];

    const active_btn = () => {
        if (window.location.pathname.includes('/notice')) {
            return 2
        } else if (window.location.pathname.includes('/leaderboard')) {
            return 4
        } else if (window.location.pathname.includes('/game')) {
            return 3
        } else if (window.location.pathname.includes('/profile')) {
            return 5
        }  else {
            return 1
        }
    }

    return (
        <footer className="page-footer">
            {buttons.map((button, idx) => (
                <FooterIcon key={idx} button={button} isActive={active_btn() == button.id} />
            ))}
        </footer>
    )
}

function FooterIcon({button, isActive}) {
    return (
        <Link key={button.id} to={button.link} className={`footer-button ${isActive ? 'active' : ''}`}>
            <FontAwesomeIcon icon={button.icon} className="icon" />
        </Link>
    )
}