'use client'

import React from 'react'
import { useEffect, useState } from 'react';
import { ball } from '@/app/pers/ball';
import { bat } from '@/app/pers/bat';
import ColorConvert from '@/app/lib/converter'
import FillColor from '@/app/lib/fillColor';

export default function Canva() {
    const[colorBox, setColorBox] = useState(null);
    const[colorL, setColorL] = useState('pink');
    const[colorR, setColorR] = useState('blue');
    const getColorLeft = (props) => { if (props !== undefined) {let leftBulletColor = new ColorConvert(props); setColorL(leftBulletColor.rgbstyle) }; setColorBox(null); };
    const getColorRight = (props) => { if (props !== undefined) {let rightBulletColor = new ColorConvert(props); setColorR(rightBulletColor.rgbstyle) }; setColorBox(null);};
    let width = 600;
    let height = 400;
    let leftY = 200;
    let leftX = 60;
    let rightY = 200;
    let rightX = 540;
    let leftDY = 2;
    let rightDY = -2;
    let ballRadius = 20;
    let bullRadius = 4;
    let bulletLeft = [];
    let bulletRight = [];
    let speedLeft = 60;
    let speedRight = 60;
    let speedBullet = 1;
    let speedBulletR = -1;
    let countLeft = 0;
    let countRight = 0;
    let xBat = width/2;
    let yBat = height/2;
    let scoreLeft = 0;
    let scoreRight = 0;
    // let intervalID;

    function Draw() {
        
        useEffect(() => { 
            const scrL = document.querySelector('.scoreL');
            const scrR = document.querySelector('.scoreR');
            const cnv = document.querySelector('canvas');
            const ctx = cnv.getContext('2d');
            ctx.globalCompositeOperation = "destination-over";
            ctx.fillStyle = "rgba(0,0,0)";
            ctx.save();
            const coordinatesCanva = cnv.getBoundingClientRect(); // get coordinates canva
            const x = coordinatesCanva.left;
            const y = coordinatesCanva.top;

            function moving() {
                let idLeft = 0;
                let idRight = 0;
                ctx.clearRect(0, 0, width, height);
                
                // left bullet
                bulletLeft.forEach(element => {
                    ball(ctx, element[0], element[1], bullRadius, colorL);
                    element[0] += element[2];

                    if (element[0] <= rightX && element[0] >= rightX - bullRadius && element[1] >= (rightY - bullRadius) && element[1] <= (rightY + bullRadius)) {
                        bulletLeft.splice(idLeft, 1);
                        scoreLeft += 1;
                        scrL.innerText = scoreLeft;
                        return false;
                    }; //ball collision

                    if (element[0] > 600 || element[0] < 0) { bulletLeft.splice(idLeft, 1); return false; };
                    idLeft++;
                });

                // right bullet
                bulletRight.forEach(element => {
                    ball(ctx, element[0], element[1], bullRadius, colorR);
                    element[0] += element[2];

                    if (element[0] >= leftX && element[0] <= leftX + bullRadius && element[1] >= (leftY - bullRadius) && element[1] <= (leftY + bullRadius)) {
                        bulletRight.splice(idRight, 1);
                        scoreRight += 1;
                        scrR.innerText = scoreRight;
                        return false;
                    }; //ball collision

                    if (element[0] > 600 || element[0] < 0) { bulletRight.splice(idRight, 1); return false; };
                    idRight++;
                });

                // left ball
                if (leftY + leftDY > height - ballRadius || leftY + leftDY < ballRadius ) { leftDY = -leftDY; } // border collision
                if (leftY + ballRadius >= yBat - 4 && leftY + ballRadius <= yBat && leftX >= (xBat - ballRadius*2 - 2)  &&  leftX <= (xBat + ballRadius*2 + 2) && leftDY > 0) { leftDY = -leftDY; } // bat collision
                if (leftY - ballRadius <= yBat + 4 && leftY - ballRadius >= yBat && leftX >= (xBat - ballRadius*2 - 2)  &&  leftX <= (xBat + ballRadius*2 + 2) && leftDY < 0) { leftDY = -leftDY; } // bat collision
                if (leftY - ballRadius < 0) {leftY = height - ballRadius}; //if you squeeze it out of the field
                if (leftY + ballRadius > height) {leftY = ballRadius}; //if you squeeze it out of the field
                ball(ctx, 40, leftY, ballRadius, colorL);
                leftY += leftDY;
                
                // right ball
                if (rightY + rightDY > height - ballRadius || rightY + rightDY < ballRadius) { rightDY = -rightDY; } // border collision
                if (rightY + ballRadius >= yBat - 4 && rightY + ballRadius <= yBat && rightX >= (xBat - ballRadius*2 - 2)  &&  rightX <= (xBat + ballRadius*2 + 2) && rightDY > 0) { rightDY = -rightDY; } // bat collision
                if (rightY - ballRadius <= yBat + 4 && rightY - ballRadius >= yBat && rightX >= (xBat - ballRadius*2 - 2)  &&  rightX <= (xBat + ballRadius*2 + 2) && rightDY < 0) { rightDY = -rightDY; } // bat collision
                if (rightY - ballRadius < 0) {rightY = height - ballRadius}; //if you squeeze it out of the field
                if (rightY + ballRadius > height) {rightY = ballRadius}; //if you squeeze it out of the field
                ball(ctx, 560, rightY, ballRadius, colorR);
                rightY += rightDY;

                // bat
                bat(ctx, xBat, yBat);

                // add bullet left
                countLeft++;
                if (countLeft === speedLeft) { bulletLeft.push([60, leftY, speedBullet]); countLeft = 0};

                // add bullet right
                countRight++;
                if (countRight === speedRight) { bulletRight.push([540, rightY, speedBulletR]); countRight = 0};

                // requestAnimationFrame(moving); //with this rendering there are bugs with scoring
            };

            cnv.addEventListener('mouseover', e => {
                // move bat
                let listener = function(e) {
                    yBat = e.clientY - y;
                    xBat = e.clientX - x;
                };
                document.addEventListener('mousemove', listener);
                document.addEventListener('mouseout', e => {document.removeEventListener('mousemove', listener);});
                // select balls
                // let listenerBall = function(e) {
                //     let coordX = e.clientX - x;
                //     let coordY = e.clientY - y;
                //     if ( coordX >= leftX - ballRadius && coordX <= leftX + ballRadius && coordY >= leftY - ballRadius && coordY <= leftY + ballRadius) {
                //         console.log('Select left ball');
                //     } else if ( coordX >= rightX - ballRadius && coordX <= rightX + ballRadius && coordY >= rightY - ballRadius && coordY <= rightY + ballRadius) {
                //         console.log('Select right ball');
                //     };
                // };
                // document.addEventListener('click', listenerBall);
                // document.addEventListener('mouseout', e => {document.removeEventListener('click', listenerBall);});
                //=========
                cnv.ondragstart = function() { return false; };
            }); // move bat

            document.querySelector('.btn-start').addEventListener('click', function() {
                const intervalID = setInterval(moving, 10);
                document.querySelector('.btn-stop').addEventListener('click', function() {
                    clearInterval(intervalID);
                })
            })

        }, []);

        return(
            <>
                <div className='score'><p className='scoreL'>0</p> : <p className='scoreR'>0</p></div>
                <div className='board'>
                    <canvas width="600" height="400"></canvas>
                </div>
                <div className='score'>
                    <div className='color-bullet' style={{ background: colorL }} onClick={ () => setColorBox(<FillColor func={getColorLeft}/>) }></div>
                    <div className='color-bullet' style={{ background: colorR }} onClick={ () => setColorBox(<FillColor func={getColorRight}/>) }></div>
                </div>
                {colorBox}
            </>
        )
    };
    // ------------------------------------------------- end draw
    return(
        <>
        <Draw />
        </>
    )
}