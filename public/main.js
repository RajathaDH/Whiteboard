const socket = io();

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;

ctx.lineWidth = 10;
ctx.lineCap = 'round';
//ctx.strokeStyle = 'red';

let mousePressed = false;

// check if mouse is released
canvas.addEventListener('mousedown', (e) => {
    mousePressed = true;
    draw(e); // draw initial point
});

// check if mouse is pressed
canvas.addEventListener('mouseup', () => {
    mousePressed = false;
    ctx.beginPath();
});

// check for mouse movement inside the canvas
canvas.addEventListener('mousemove', (e) => {
    if(!mousePressed) return; // return if mouse is not pressed

    draw(e);
});

// draw inside the canvas
function draw(e){
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
}