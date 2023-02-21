"use client"
import React, { useEffect, useRef } from 'react';
import Image from 'next/image'
import secondaryLoaderShield from '../public/images/shadowCircle.svg'
import classes from "../styles/secondaryLoader.module.scss";

function SecondaryLoader() {
    const canvasRef = useRef(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let radius = 0;
        let maxRadius = 100.2;

        function drawCircle(x, y, radiusC, color) {
            context.beginPath();
            context.arc(x, y, radiusC, 1, 2 * Math.PI);
            context.fillStyle = color;
            context.fill();
        }

        function animate() {
            requestAnimationFrame(animate);

            context.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < 50; i++) {
                let angle = (i / 50) * Math.PI * 2;
                let x1 = Math.cos(angle) * (canvas.width / 2 + radius + 100);
                let y1 = Math.sin(angle) * (canvas.width / 2 + radius + 100);
                let x2 = Math.cos(angle) * radius;
                let y2 = Math.sin(angle) * radius;
                context.setLineDash([5, 10]);
                context.beginPath();
                context.moveTo(canvas.width / 2 + x2, canvas.height / 2 + y2);
                context.lineTo(canvas.width / 2 + x1, canvas.height / 2 + y1);
                context.strokeStyle = "#00EDD0";
                context.lineWidth = 2;
                context.stroke();

                radius += 0.00911;
            }

            let radiusC = 65;
            drawCircle(canvas.width / 2, canvas.height / 2, radiusC, 'black');
            if (radius > maxRadius) {
                radius = -50;
            }
        }

        animate();
    }, []);

    return (
        <div className={classes.outerDivStyle}>
            <canvas className={classes.canvasStyle} ref={canvasRef} width="350" height="350"></canvas>
            <div className={classes.imgdivStyle}>
                <Image
                    className={classes.imageStyle}
                    src={secondaryLoaderShield}
                    alt="Picture of the author"

                />
            </div>
            <h1 className={classes.coreserStyle}>Core Services</h1>
        </div>
    );
}

export default SecondaryLoader;
