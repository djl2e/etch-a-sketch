
// change grid color when you click & move over grid items
function click() {
    const board = document.querySelector(".board");
    board.addEventListener("mousedown", (e) => {
        const button = e.target.closest("button");
        changeColor(e);
        start();
    })
    board.addEventListener("mouseup", end);
}

function start() {
    document.addEventListener("mousemove", changeColor);
}

function end() {
    document.removeEventListener("mousemove", changeColor);
}

function changeColor(e) {
    if (e.target.className == "grid-item") {
        e.target.style.backgroundColor = "rgba(205, 133, 64, 0.5)";
    }
}


// change grid number when using slide container
function changeGridSize() {
    const slider = document.querySelector(".slider");
    slider.addEventListener("input", changeGridSizeNumber);
}

function changeGridSizeNumber(e) {
    const value = e.target.valueAsNumber;
    const sliderNumber = document.querySelector("#grid-size");
    sliderNumber.textContent = "Grid size: " + value + " x " + value;
}

// clear grid when clear button is clicked
function clear() {
    const clearButton = document.querySelector("#clear-button");
    clearButton.addEventListener("click", clearGrid);
}

function clearGrid() {
    const buttons = document.querySelectorAll(".grid-item");
    buttons.forEach(button => {
        button.style.backgroundColor = "beige";
    })
}


// apply new grid size
function apply() {
    const applyButton = document.querySelector("#apply-button");
    applyButton.addEventListener("click", () => {
        const sliderValue = document.querySelector(".slider").value;
        const currentGridSize = document.querySelectorAll(".grid-item").length ** 0.5;
        if (sliderValue == currentGridSize) clearGrid();
        else drawGrid(sliderValue);
    })
}

// draw new grid based on the new grid size
function drawGrid(gridSize) {
    const board = document.querySelector(".board");
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    const gridItem = document.createElement("button");
    gridItem.setAttribute("class", "grid-item");
    const numGridItems = gridSize ** 2;
    for (let i = 0; i < numGridItems; i++) {
        board.appendChild(gridItem.cloneNode(true));
    }
    board.style.gridTemplateColumns = "repeat(" + gridSize + ", 1fr)";
    board.style.gridTemplateRows = "repeat(" + gridSize + ", 1fr)";

    const numButton = document.querySelectorAll(".grid-item").length;
}

function main() {
    click();
    changeGridSize();
    clear();
    apply();
}

drawGrid(12);
main();


