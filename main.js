"use strict";

const canvas = document.getElementById("myCanvas");
const myCanvas = canvas.getContext("2d");

function getCanvasRect() {
  return canvas.getBoundingClientRect();
}


function mark() {
  myCanvas.beginPath();
}


function paint(event) {
  if (event.buttons !== 1) return;
  const { mouseX, mouseY } = getMousePos(event);
  myCanvas.lineTo(mouseX, mouseY);
  myCanvas.stroke();
}

function getMousePos(input) {
  const canvasRect = getCanvasRect();
  const style = getComputedStyle(canvas);
  const borderLeft = parseInt(style.borderLeftWidth, 10) || 0;
  const borderTop = parseInt(style.borderTopWidth, 10) || 0;

  return {
    mouseX: input.clientX - canvasRect.left - borderLeft,
    mouseY: input.clientY - canvasRect.top - borderTop,
  };
}

// function stopDrawing() {
//   isDrawing = false;
//   myCanvas.beginPath();
// }

// function unmark(event) {
//   myCanvas.closePath();
//   if (event.buttons !== 1) {
//     myCanvas.closePathPath();
//   }
// }

function changeColor(color) {
  myCanvas.strokeStyle = color;
}
function changeThickness(width) {
  myCanvas.lineWidth = width;
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  changeColor(`rgb(${r},${g},${b})`);
}

function clearCanvas() {
  let result = confirm("Clear?");
  if (result) {
    myCanvas.beginPath();
    myCanvas.fillStyle = "white";
    myCanvas.fillRect(0, 0, canvas.width, canvas.height);
  }
}

  function resizeCanvas() {
    const tempImage = myCanvas.getImageData(0, 0, canvas.width, canvas.height);
    const width = Math.min(window.innerWidth - 30, 500);
    const height = Math.min(window.innerHeight - 150, 500);
    canvas.width = width;
    canvas.height = height;
    myCanvas.putImageData(tempImage,0,0);
  }

window.addEventListener("resize",resizeCanvas);
resizeCanvas();
