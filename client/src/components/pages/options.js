import React, { useState } from 'react';
import { TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Link, useNavigate } from "react-router-dom"
// import { get, post } from "../../utilities";
import "./options.css";

const Options = () => {

    const [gamecode, setGamecode] = useState("");
    const [time, setTime] = useState("");
    const [entangle, setEntangle] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/game?room="+gamecode+"&pairs="+entangle)

    };
    const handleTime = (event) => {
        setTime(event.target.value);
    };
    const handleEntangle = (event) => {
        setEntangle(event.target.value)
    };

    return (
        <div className="options">
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>select options for your game</h1>

            <TextField id="game_code" className="field" variant="standard" label="game code" value={gamecode} onChange={(e) => setGamecode(e.target.value)} sx={{ input: { color: 'black' } }} />
            <br/>
            {/* <FormControl className='field' variant="standard" sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="time-select-label">time</InputLabel>
        <Select
          labelId="time-label"
          id="time-select"
          value={time}
          onChange={handleTime}
          label="time"
          className="select-options"
        >
          <MenuItem value={5}>05:00</MenuItem>
          <MenuItem value={10}>10:00</MenuItem>
          <MenuItem value={20}>20:00</MenuItem>
          <MenuItem value={30}>30:00</MenuItem>
        </Select>
      </FormControl>
      <br/> */}
      <FormControl className='field' variant="standard" sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="entangle-select-label">entangled pairs</InputLabel>
        <Select
          labelId="entangle-label"
          id="entangle-select"
          value={entangle}
          onChange={handleEntangle}
          label="entangle"
          className="select-options"
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
      </FormControl>
            <br />
            <br />
            <button type="submit" className="theme-btn">play</button>
            <Link to="/">
            <button className="theme-btn backbtn">
                back
            </button>
        </Link>
        </form>
        </div>
    );
};

export default Options;
