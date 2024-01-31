import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { Link } from "react-router-dom"

import "../../utilities.css";
import "./home.css";
import "./account.css"
import { post } from "../../utilities";

const GOOGLE_CLIENT_ID = "797692957520-0rdd7k0a7c691bgefrl6o0cn07hg4lmc.apps.googleusercontent.com";


const Account = ({ userId, handleLogin, handleLogout, name, wins, losses }) => {
  return (
    <>
      <div className="navbar">
        <div className="logo">
        </div>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          {userId ? (
            <button
              onClick={() => {
                googleLogout();
                handleLogout();
              }}
              className="theme-btn"
            >
              logout
            </button>
          ) : (
            <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
          )}
        </GoogleOAuthProvider>
      </div>
      <div className="account">
        
        <h2>hello {name} </h2>
        <p>wins: {wins}</p>
        <p>losses: {losses}</p>
        
        <Link to="../">
          <button className="theme-btn">
            back to home
          </button>
        </Link>
      </div>

    </>
  );
};

export default Account;
