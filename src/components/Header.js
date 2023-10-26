import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function Header({title, backBtn}) {

    return (
        <header>
            {
                backBtn && (
                    <Link to='/' style={{color: "white"}}>
                        <FontAwesomeIcon
                            icon={faArrowLeft} 
                            style={{
                                position: "absolute",
                                left: "5%",
                            }}
                        />
                    </Link>
                    
                )
            }
            {title}
        </header>
    )

}