const gridContent = document.querySelector(".grid-content");
const resetButton = document.querySelector(".resetButton");
const eraseButton = document.querySelector(".eraser");
const borderButton = document.querySelector(".toggleBorder");
const slider = document.getElementById("slide-range");
const colorPicker = document.getElementById("colorpicker");

var selectedColor = "black"
var currentColor = selectedColor;
var drawEnabled = false;
var eraserEnabled = false;
var borderSwitch = true;

function setGrid(size){
    for(let x = 0; x < size; ++x){
        const gridRow = document.createElement("div");
        gridRow.className = "grid-row"
        for(let y = 0; y < size; ++y){
            const square = document.createElement("div");
            square.className = "grid-square";
            /* These 3 events are to allow the mouse to draw when its clicked down and being dragged */
            square.addEventListener("mousedown", mouseDown);
            square.addEventListener("mouseup", mouseUp);
            square.addEventListener("mouseover", drawHover);
            gridRow.appendChild(square);        
        }
        gridContent.appendChild(gridRow);
    }
    setBorder();
}

function colorSelections(){
    selectedColor = this.value;
}

//Either Draw a color, or erase it to white
function drawHover(){
    if(drawEnabled){
        this.style.backgroundColor = currentColor
    }

}

function mouseDown(){
    /*
    Changing color when clicked, but also enable such so that it changes color when dragged
    This is different than drawHover, as that function is for the situation when being hovered onto
    */
    drawEnabled = true;
    if(eraserEnabled){
        this.style.backgroundColor = "white";
        currentColor = "white";
    }else{
        this.style.backgroundColor = selectedColor;
        currentColor = selectedColor;
    }
}

function mouseUp(){
    drawEnabled = false;
}

//It highlights a button based on if its on or off
function buttonEmphasis(onORoff, button){
    if(onORoff){
        button.style.backgroundColor = "red";
    }else{
        button.style.backgroundColor = "";
    }
}

function toggleBorder(){
    borderSwitch = !borderSwitch;
    setBorder()
}

function setBorder(){
    let gridSquare = document.querySelectorAll(".grid-square");
    buttonEmphasis(borderSwitch, borderButton);
    if(borderSwitch){
        gridSquare.forEach(element => {element.style.border = "1px solid rgb(233, 232, 232)"});
    }else{
        gridSquare.forEach(element => {element.style.border = ""});
    }
}

//This is for changing the status of eraser variable, so that we know if the user is trying to erase or not
function eraserToggle(){
    eraserEnabled = !eraserEnabled;
    buttonEmphasis(eraserEnabled, eraseButton);
}

function reset(){
    let gridSquare = document.querySelectorAll(".grid-square");
    gridSquare.forEach(element => {element.style.backgroundColor = ""});
}

function changeSize(){
    let gridRow = document.querySelectorAll(".grid-row");
    gridRow.forEach(element => {element.remove()});
    setGrid(this.value);
    document.querySelector(".size-text").textContent = this.value + " X " + this.value;
}

gridContent.addEventListener("mouseleave", mouseUp);
resetButton.addEventListener("click", reset);
eraseButton.addEventListener("click", eraserToggle);
borderButton.addEventListener("click", toggleBorder);
slider.addEventListener("mouseup", changeSize);
colorPicker.addEventListener("input", colorSelections);


//Initalize the grid
setGrid(16);