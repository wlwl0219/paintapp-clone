const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.jsColor');
const range = document.querySelector('#jsRange');
const mode = document.querySelector('#jsMode');
const save = document.querySelector('#jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.strokeStyle = INITIAL_COLOR;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 3;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = 'Paint';
  } else {
    filling = true;
    mode.innerText = 'Fill';
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJS';
  link.click();
}

function canvasEventListner() {
  if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
  }
}

function colorEventListner() {
  if (colors) {
    colors.forEach(color => color.addEventListener('click', handleColorClick));
  }
}

function rangeEventListner() {
  if (range) {
    range.addEventListener('input', handleRangeChange);
  }
}

function modeEventListner() {
  if (mode) {
    mode.addEventListener('click', handleModeClick);
  }
}

function saveEventListner() {
  if (save) {
    save.addEventListener('click', handleSaveClick);
  }
}

function init() {
  canvasEventListner();
  colorEventListner();
  rangeEventListner();
  modeEventListner();
  saveEventListner();
}
init();
