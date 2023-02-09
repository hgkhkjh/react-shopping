import React, { useEffect, useRef } from 'react'

export default function VerificationCode() {
    const canvas = useRef(null)
    const canvasfather=useRef(null)
    /**生成一个随机数**/
    const randomNum = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }
    /**生成一个随机色**/
    const randomColor = (min, max) => {
        var r = randomNum(min, max);
        var g = randomNum(min, max);
        var b = randomNum(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    //   document.getElementById("changeImg").onclick = function(e){
    //     drawPic();
    //   }
    const changeImg = () => {
        drawPic();
    }
    useEffect(() => {
        drawPic();
    }, [])
    /**绘制验证码图片**/
    const drawPic = () => {
        var width = canvas.current.width;
        var height = canvas.current.height;
        var ctx = canvas.current.getContext('2d');
        ctx.textBaseline = 'bottom';

        /**绘制背景色**/
        ctx.fillStyle = randomColor(180, 240); //颜色若太深可能导致看不清
        ctx.fillRect(0, 0, width, height);
        /**绘制文字**/
        var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
        for (var i = 0; i < 4; i++) {
            var txt = str[randomNum(0, str.length)];
            ctx.fillStyle = randomColor(50, 160);  //随机生成字体颜色
            ctx.font = randomNum(10, 15) + 'px SimHei'; //随机生成字体大小
            var x = 0 + i * 4;
            var y = randomNum(0, 10);
            var deg = randomNum(-25, 45);
            //修改坐标原点和旋转角度
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(txt, 0, 0);
            //恢复坐标原点和旋转角度
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y);
        }
        /**绘制干扰线**/
        for (var i = 0; i < 4; i++) {
            ctx.strokeStyle = randomColor(40, 180);
            ctx.beginPath();
            ctx.moveTo(randomNum(0, width), randomNum(0, height));
            ctx.lineTo(randomNum(0, width), randomNum(0, height));
            ctx.stroke();
        }
        /**绘制干扰点**/
        for (var i = 0; i < 100; i++) {
            ctx.fillStyle = randomColor(0, 255);
            ctx.beginPath();
            ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    useEffect(()=>{
        console.log(canvasfather?.current?.offsetHeight)
    },[])
    return (
        <div style={{ width: "10rem", height: "3rem" }} ref={canvasfather}>
            <canvas onChange={() => changeImg()} ref={canvas} width={canvasfather?.current?.offsetWidth??50} height={canvasfather?.current?.offsetHeight??30}></canvas>
        </div>
    )
}
