let height = 15; 
let width = 30;
let mineField;
let timeBeetwenClick = 200;  //ms
let dblClick = false;

const needMine = () => Math.random() > 0.8;

const twoDimensionalArray = (x, y) => 
      new Array(x).fill(0).map(i => new Array(y).fill(0));

const fillWithMines = (arr) =>
    arr.forEach( (row, i) => {
       row.forEach( (el, j) => {
           row[j] = needMine() ? "X" : 0; 
       });
    });

$(function() {
    let msgBoard = $("#msgBoard");
    mineField = $("#mineField");
    msgBoard.html("<b>hi<b>");
    newField();
    
});


const newField = () =>
{
    let arr = twoDimensionalArray(height, width);
    fillWithMines(arr);
    console.log(arr);
    arr.forEach( (item, i) => {
        let row = document.createElement("div");
        item.forEach( (elem, j) => {
            let sq = document.createElement("span");
            sq.setAttribute("danger", arr[i][j]);
            row.appendChild(sq);
        });
        mineField.append(row);
    });   
    let squares = mineField.find("span");
    squares.addClass("sq");
    squares.click(whenClicked);
    squares.dblclick(whenDoubleClicked);
};

const whenClicked = () => {
    setTimeout(clickAction, timeBeetwenClick);
     
}

const clickAction = () => {
    if (dblClick)
        return;
    console.log("click");
}

const whenDoubleClicked = () => {
    dblClick = true;
    console.log("double click");
    setTimeout(() => dblClick = false, timeBeetwenClick);
}




const gameOver = () => {
    
};