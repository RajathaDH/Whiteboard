const canvas = document.getElementById('board');
const lineWidth = document.querySelector('#lineWidth');
const colour = document.querySelector('#colour');
const currentColourElement = document.querySelector('.current-colour');

const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

//ctx.lineWidth = 10;
ctx.lineCap = 'round';
//ctx.strokeStyle = 'black';

let mousePressed = false;
let currentTool = 'pen';

const options = {
    lineWidth: 10,
    colour: 'black'
};

// check if mouse is released
canvas.addEventListener('mousedown', (e) => {
    mousePressed = true;

    const { x, y } = getCanvasCursorPosition(e.clientX, e.clientY);

    if (currentTool == 'pen') {
        draw(x, y, options); // draw initial point
    } else if (currentTool == 'eraser') {
        erase(x, y, options);
    }
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

    if (currentTool == 'pen') {
        draw(x, y, options);
    } else if (currentTool == 'eraser') {
        erase(x, y, options);
    }
});

lineWidth.addEventListener('change', (e) => {
    options.lineWidth = e.target.value;
});

colour.addEventListener('change', (e) => {
    changeColour(e.target.value);
});

// draw inside the canvas
function draw(x, y, options) {    
    ctx.lineWidth = options.lineWidth;
    ctx.strokeStyle = options.colour;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function erase(x, y, options) {
    ctx.clearRect(x - (options.lineWidth / 2), y - (options.lineWidth / 2), options.lineWidth, options.lineWidth);
}

function getCanvasCursorPosition(mouseX, mouseY) {
    const canvasRect = canvas.getBoundingClientRect();
    const x = mouseX - canvasRect.left;
    const y = mouseY - canvasRect.top;

    return { x, y };
}

function changeColour(colour) {
    options.colour = colour;
    currentColourElement.style.background = colour;
}

function changeTool(tool) {
    currentTool = tool;
}