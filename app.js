const canvas = document.getElementById("jsCanvas");
const ctx=  canvas.getContext("2d");
const INITIAL_COLOR = "#2c2c2c";
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
ctx.fillStyle="white";
ctx.fillRect(0,0,canvas.offsetWidth,canvas.offsetHeight);
ctx.strokeStyle =INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
/* colors */
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

let painting = false;
let filling = false;
function onMouseMove(event) {
    const x = event.offsetX;
    const y= event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();

    }
}
function startPainting() {
    painting=true;
}
function stopPainting() {
    painting=false;
}
function changeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleRangeChange(event) {
    ctx.lineWidth = event.target.value;
}
function handleModeClick() {
    if(filling) {
        filling =false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText="Paint"; 
    }
}
function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0,0,canvas.offsetWidth,canvas.offsetHeight);
    }
}
function hanldeContextMenu(event) {
    event.preventDefault();
}
function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJs"
    link.click();
}
if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",hanldeContextMenu);
}

Array.from(colors).forEach(color => color.addEventListener("click",changeColor));
if(range) {
    range.addEventListener("input",handleRangeChange);
}
if(mode) {
    mode.addEventListener("click",handleModeClick);
}
if(saveBtn) {
    saveBtn.addEventListener("click",handleSaveClick);
}