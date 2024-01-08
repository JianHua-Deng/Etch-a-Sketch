const gridContent = document.querySelector(".grid-content");
const resetButton = document.querySelector(".resetButton");
const eraseButton = document.querySelector(".eraser");
const borderButton = document.querySelector(".toggleBorder");
const slider = document.getElementById("slide-range");

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

function drawHover(){
    if(drawEnabled){
        if(eraserEnabled){
            this.style.backgroundColor = "white"
        }else{
            this.style.backgroundColor = "black";
        }
        
    }
}

function mouseDown(){
    /*
    Changing color when clicked, but also enable such so that it changes color when dragged
    This is different than drawHover, as that only change color of box when hovered onto
    */
    drawEnabled = true;
    if(eraserEnabled){
        this.style.backgroundColor = "white";
    }else{
        this.style.backgroundColor = "black";
    }

}

function mouseUp(){
    drawEnabled = false;
}

function toggleBorder(){
    borderSwitch = !borderSwitch;
    setBorder()
}

function setBorder(){
    let gridSquare = document.querySelectorAll(".grid-square");
    if(borderSwitch){
        gridSquare.forEach(element => {element.style.border = "1px solid rgb(233, 232, 232)"});
    }else{
        gridSquare.forEach(element => {element.style.border = ""});
    }
}

function eraserToggle(){
    eraserEnabled = !eraserEnabled;
    if(eraserEnabled){
        eraseButton.style.border = "2px solid black";
    }else{
        eraseButton.style.border = "1px solid black";
    }
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

//Initalize the grid
setGrid(16);