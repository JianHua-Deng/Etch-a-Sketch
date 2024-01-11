//Getting necessary info from the DOM
const gridContent = document.querySelector(".grid-content");
const resetButton = document.querySelector(".resetButton");
const eraseButton = document.querySelector(".eraser");
const borderButton = document.querySelector(".toggleBorder");
const slider = document.getElementById("slide-range");
const colorPicker = document.getElementById("colorpicker");

//Setting necessary variables for switches and color selections
var selectedColor = "black"
var currentColor = selectedColor;
var drawEnabled = false;
var eraserEnabled = false;
var borderSwitch = false;

//This function set up the grid based on the size, and give a grid of "size x size"
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

//This function creates the simple animation of a button being pressed down
function buttonEmphasis(onORoff, button){
    if(onORoff){
        //if it is on, make the animation of pressing down
        button.style.backgroundColor = "rgb(156, 155, 155)";
        button.style.boxShadow = "";
        button.style.marginTop = "10px";
    }else{
        //if it is off, make the animation of pressing back up/returning to original state
        button.style.backgroundColor = "";
        button.style.boxShadow = "1px 12px rgb(59, 70, 133)";
        button.style.marginTop = "";
    }
}

//switch the button from its original state, then set the border according to the current state
function toggleBorder(){
    borderSwitch = !borderSwitch;
    setBorder()
}

//For each square, create a border for each of them
function setBorder(){
    let gridSquare = document.querySelectorAll(".grid-square");
    buttonEmphasis(borderSwitch, borderButton);
    if(borderSwitch){
        gridSquare.forEach(element => {element.style.border = "1px solid rgb(233, 232, 233)"});
    }else{
        gridSquare.forEach(element => {element.style.border = ""});
    }
}

//This is for changing the status of eraser variable, so that we know if the user is trying to erase or not
function eraserToggle(){
    eraserEnabled = !eraserEnabled;
    buttonEmphasis(eraserEnabled, eraseButton);
}

//for each square, turn their backrground color back to white
function reset(){
    let gridSquare = document.querySelectorAll(".grid-square");
    gridSquare.forEach(element => {element.style.backgroundColor = ""});

    //This is so for the animation of button being pressed and then go back to the state of not being pressed
    buttonEmphasis(true, resetButton);
    setTimeout(function () {buttonEmphasis(false, resetButton);}, 200);
}

//delete all the rows, and then recreate one based on the new size "value"
function changeSize(){
    let gridRow = document.querySelectorAll(".grid-row");
    gridRow.forEach(element => {element.remove()});
    setGrid(this.value);
    document.querySelector(".size-text").textContent = this.value + " X " + this.value;
}

//adding necessary events listener
gridContent.addEventListener("mouseleave", mouseUp);
resetButton.addEventListener("click", reset);
eraseButton.addEventListener("click", eraserToggle);
borderButton.addEventListener("click", toggleBorder);
slider.addEventListener("mouseup", changeSize);
colorPicker.addEventListener("input", colorSelections);

//Formatting the visual of the buttons at start
buttonEmphasis(false, resetButton);
buttonEmphasis(false, eraseButton);
//Initalize the grid
setGrid(16);