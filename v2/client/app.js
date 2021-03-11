const socket = io('http://localhost:3000');

const canvas = document.getElementById('board');
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

    const { x, y } = getCanvasCursorPosition(e.clientX, e.clientY);

    draw(x, y); // draw initial point
});

// check if mouse is pressed
canvas.addEventListener('mouseup', () => {
    mousePressed = false;

    ctx.beginPath();
});

// check for mouse movement inside the canvas
canvas.addEventListener('mousemove', (e) => {
    if(!mousePressed) return; // return if mouse is not pressed

    const { x, y } = getCanvasCursorPosition(e.clientX, e.clientY);

    draw(x, y);
});

// draw inside the canvas
function draw(x, y) {
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    socket.emit('draw', { x, y });
}

function getCanvasCursorPosition(mouseX, mouseY) {
    const canvasRect = canvas.getBoundingClientRect();
    const x = mouseX - canvasRect.left;
    const y = mouseY - canvasRect.top;

    return { x, y };
}

socket.on('draw', data => {
    ctx.lineTo(data.x, data.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(data.x, data.y);
    ctx.beginPath();
});