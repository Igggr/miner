let height = 10; 
let width = 20;
let ammountOfMines = 0;
let filledSquare = 0;
let firstDetonation = true;

let mineField;
let msg;

let timeBeetwenClick = 500;  //ms
let dblClick = false;

const needMine = () => Math.random() > 0.8;

const twoDimensionalArray = (x, y) => 
      new Array(x).fill(0).map(i => new Array(y).fill(0));

const fillWithMines = (arr) =>
    arr.forEach( (row, i) => {
       row.forEach( (el, j) => {
           let placeMine = needMine();
           if (placeMine)
              ammountOfMines++;
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
            badNeighbors(arr, i, j);
        });
    });
}



$(function() {                 // document.onload
    msg= $("#msg");
    mineField = $("#mineField");
    createNewField(height, width);
    
});

const setColorAndDanger = (sq, danger) => {
    sq.setAttribute("danger", danger);
    if (danger === "X")
        sq.setAttribute("style", "color: black");
    else if (danger === 1 || danger === 0)
        sq.setAttribute("style", "color: blue");
    else if (danger === 2)
        sq.setAttribute("style", "color: green");
    else 
        sq.setAttribute("style", "color: red");
};

const createNewField = (height, width) =>
{
    ammountOfMines = 0;
    filledSquare = 0;
    let arr = twoDimensionalArray(height, width);
    fillWithMines(arr);
    assignDangerLevel(arr);
    arr.forEach( (item, i) => {
        let row = document.createElement("div");
        item.forEach( (elem, j) => {
            let sq = document.createElement("span");        
            setColorAndDanger(sq, arr[i][j]);       
            row.appendChild(sq);
        });
        mineField.append(row);
    }); 
    
    $("#minesLeft").text(ammountOfMines);
    $("#filled").text(0);
    
    let squares = mineField.find("span");
    squares.addClass("sq");
    squares.click(whenClicked);
    squares.dblclick(whenDoubleClicked);
};

const whenClicked = (evt) => {
    setTimeout( () => clickAction(evt), timeBeetwenClick);    
}

const clickAction = (evt) => {
    if (dblClick)
        return;
    let target = $(evt.target);
    console.log("click");
    let danger = target.attr("danger");   
    target.text( target.attr("danger") );
    if (danger === "X" && firstDetonation){
            target.css("background-color", "red");  
            gameOver(target);    
    }
    else {
       target.css("background-color", "lightgrey" );     
    }
    if (firstDetonation)
        showNewFilledAmmount();
}

const showNewFilledAmmount = () => {
    filledSquare++;
    $("#filled").text(filledSquare);
};

const whenDoubleClicked = (evt) => {
    dblClick = true;
    console.log("double click");
    $(evt.target).css("background-color", "yellow");
    setTimeout(() => dblClick = false, timeBeetwenClick);
}


const gameOver = (target) => {
    target.off("click");
    firstDetonation = false;
    msg.text("Game Over");
    mineField.find("span").trigger("click");
    makeRestartButton();
};

const destroyOldField = () => {
    $("button").remove();
    msg.empty();                 
    mineField.empty();        //remove all children, jquery-way
    firstDetonation = true;
};

const makeRestartButton = () => {
    btn = document.createElement("button");
    btn.innerHTML = 'new game';
    btn.onclick = () => {
        destroyOldField();
        createNewField(height, width);
    }
    msg.append(btn);
}