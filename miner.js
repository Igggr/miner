let height = 15; 
let width = 30;
let mineField;

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
    arr.forEach( (item) => {
        let row = document.createElement("div");
        item.forEach( (elem) => {
            let sq = document.createElement("span");
            row.appendChild(sq);
        });
        mineField.append(row);
    });   
    mineField.find("span").addClass("sq");
};


const gameOver = () => {
    
};