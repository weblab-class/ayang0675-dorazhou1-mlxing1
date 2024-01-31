import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Home from "./pages/home.js";
import Options from "./pages/options.js";
import Rules from "./pages/rules.js";
import Game from "./pages/Game.js";
import Solo from "./pages/solo.js";
import Account from "./pages/Account.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [wins, setWins] = useState(undefined);
  const [losses, setLosses] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setName(user.name);
        setWins(user.wins);
        setLosses(user.losses);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            path="/"
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            userId={userId}
          />
        }
      />
      <Route path="/options" element={<Options />}/>
      <Route path="/rules" element={<Rules />}/>
      <Route path="/game" element={<Game 
        socket={socket}
      />}/>
      <Route path="/solo" element={<Solo />}/>
      <Route path="/account" element={<Account 
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        userId={userId}
        name={name}
        wins={wins}
        losses={losses}
        />
      }/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
