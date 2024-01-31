import React, { useState } from 'react';
import { Link } from "react-router-dom"

// import { get, post } from "../../utilities";
import "./rules.css";

const Rules = () => {
    return (
        <div className="rulespg">
            <h1>rules </h1>
            <p>Connect with a friend online and enter the world of quantum chess… </p>
            <br />
            <p>In quantum chess, a plethora of novel offensive strategies are opened because players will have the opportunity to entangle two of their pieces before each turn. Once entangled, pairs of pieces will be able to move simultaneously during a single turn. </p>
            <br />
            <p>But beware, once entangled, the duet of pieces cannot be separated. If any piece in an entangled duo is captured by the enemy, both pieces are taken. </p>
            <br />
            <p>Entangle up to a set maximum number of pairs, and try to win before time runs out! </p>

            <Link to="/">
                <button className="theme-btn">
                back
                </button>
            </Link>
        </div>
    );
};

export default Rules;
