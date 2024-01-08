const gridContent = document.querySelector(".grid-content");
const resetButton = document.querySelector(".resetButton");

function setGrid(){
    for(let x = 0; x < 64; ++x){
        let gridRow = document.createElement("div");
        gridRow.className = "grid-row"
        for(let y = 0; y < 64; ++y){
            let square = document.createElement("div");
            square.className = "grid-square";
            square.addEventListener("mouseover", hoverAffect);
            gridRow.appendChild(square);        
        }
    
        gridContent.appendChild(gridRow);
    }
}

function hoverAffect(){
    this.style.backgroundColor = "black";
}

function reset(){
    let gridSquare = document.querySelectorAll(".grid-square");
    gridSquare.forEach(element => {element.style.backgroundColor = "white"});
}

resetButton.addEventListener("click", reset);
setGrid();