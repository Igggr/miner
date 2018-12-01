let height = 3; 
let width = 5;
let mineField;
let timeBeetwenClick = 500;  //ms
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

const isBobm = (arr, i, j) => {
   if (i<0 || j<0 || i>=height || j>=width) //outside of array
       return 0;
   else if(arr[i][j] === "X") 
       return 1;
   else 
       return 0;
}

const badNeighbors = (arr, i, j) => {
    if (arr[i][j] === "X")
        return;
    for (let ii = -1; ii<2; ii++){
        for (let jj = -1; jj<2; jj++){
            arr[i][j] += isBobm(arr, i+ii, j+jj);
        }
    }
}

const assignDangerLevel = (arr) => {
    arr.forEach( (row, i) => {
        row.forEach( (el, j) => {
            console.log(arr[i][j]);
            badNeighbors(arr, i, j);
            console.log(arr[i][j]);
        });
    });
}

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
    assignDangerLevel(arr);
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
    console.log(squares);
    squares.addClass("sq");
    squares.click(whenClicked);
    squares.dblclick(whenDoubleClicked);
};

const whenClicked = (evt) => {
    evt.preventDefault();
    setTimeout( () => clickAction(evt), timeBeetwenClick);    
}

const clickAction = (evt) => {
    if (dblClick)
        return;
    let target = $(evt.target);
    console.log("click");
    console.log(target);
    let danger = target.attr("danger");
    target.text( target.attr("danger") );
    if (danger === "X")
       target.css("background-color", "red");   
    else 
       target.css("background-color", "lightgrey" );  
}

const whenDoubleClicked = (evt) => {
    dblClick = true;
    console.log("double click");
    console.log(evt.target);
    $(evt.target).css("background-color", "yellow");
    setTimeout(() => dblClick = false, timeBeetwenClick);
}




const gameOver = () => {
    
};