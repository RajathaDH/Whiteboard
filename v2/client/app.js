const urlString = window.location.href;
const url = new URL(urlString);
const username = url.searchParams.get('username');
const room = url.searchParams.get('room');

if (!username || !room) {
    window.location = 'index.html';
}

const socket = io('http://localhost:3000', {
    query: {
        username,
        room
    }
});

const canvas = document.getElementById('board');
const lineWidth = document.querySelector('#lineWidth');
const colour = document.querySelector('#colour');

const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

//ctx.lineWidth = 10;
ctx.lineCap = 'round';
//ctx.strokeStyle = 'black';

let mousePressed = false;

const options = {
    lineWidth: 10,
    colour: 'black'
};

// check if mouse is released
canvas.addEventListener('mousedown', (e) => {
    mousePressed = true;

    const { x, y } = getCanvasCursorPosition(e.clientX, e.clientY);

    draw(x, y, options); // draw initial point
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

    draw(x, y, options);
});

lineWidth.addEventListener('change', (e) => {
    options.lineWidth = e.target.value;
});

colour.addEventListener('change', (e) => {
    options.colour = e.target.value;
});

// draw inside the canvas
function draw(x, y, options) {
    ctx.lineWidth = options.lineWidth;
    ctx.strokeStyle = options.colour;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    socket.emit('draw', { x, y, options });
}

function getCanvasCursorPosition(mouseX, mouseY) {
    const canvasRect = canvas.getBoundingClientRect();
    const x = mouseX - canvasRect.left;
    const y = mouseY - canvasRect.top;

    return { x, y };
}

function changeLineWidth(e) {
    console.log(e);
}

function changeColour(e) {
    console.log(e);
}

socket.on('draw', data => {
    ctx.lineWidth = data.options.lineWidth;
    ctx.strokeStyle = data.options.colour;

    ctx.lineTo(data.x, data.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(data.x, data.y);
    ctx.beginPath();
});