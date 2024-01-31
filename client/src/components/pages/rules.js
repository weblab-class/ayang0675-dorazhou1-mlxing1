import React, { useState } from 'react';
import { Link } from "react-router-dom"

// import { get, post } from "../../utilities";
import "./rules.css";

const Rules = () => {
    return (
        <div className="rulespg">
            <h1>rules </h1>
            <p>Rules are the same as regular chess... but </p>
            <br />
            <p>Every game, you will start with 3 sets of entangled pieces. </p>
            <br />
            <p>But beware, once entangled, the duet of pieces cannot be separated. If any piece in an entangled duo is captured by the enemy, both pieces are taken. </p>
            <br />
            <p>Checkmate your opponent to win!</p>

            <Link to="/">
                <button className="theme-btn">
                back
                </button>
            </Link>
        </div>
    );
};

export default Rules;
