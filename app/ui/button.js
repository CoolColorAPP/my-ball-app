'use client'

import { useState } from "react";

export default function Button() {
    const[stateButton, setStateButton] = useState(true);
    let startvisio;
    let stopvisio;
    if (stateButton) {
        startvisio = 'block'; stopvisio = 'none';
    } else {
        startvisio = 'none'; stopvisio = 'block';
    };
    
    const handleBtn = () => { setStateButton(+!stateButton) };

    return(
        <>
        <button className='btn-start' style={{display: startvisio}} onClick={() => handleBtn()}>START</button>
        <button className='btn-stop' style={{display: stopvisio}} onClick={() => handleBtn()}>STOP</button>
        </>
    )
}