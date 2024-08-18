'use client'

import React from "react";
import { useState } from 'react';
import ColorConvert from "./converter.js";

export default function FillColor(props) {
    const [hue, setHue] = useState(0);
    const setSolidColor = new ColorConvert([hue, 100, 100]);
    return (
        <div className="fill-color-box">
            <div className="scree-color-board-solid" style={{background: setSolidColor.rgbstyle}} ></div>
                <input type="range" min={0} max={360} step={1} defaultValue={hue} className="slider-hue" onChange={(e) => setHue(e.target.value)}></input>
                { <button className='btn-start' onClick={() => { props.func([hue, 100, 100]) }} >USE COLOR</button> }
                <button className="close-solid" onClick={() => { props.func() }}>Х</button>
        </div>
    )
}