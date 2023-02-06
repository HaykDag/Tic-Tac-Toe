const winCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const startBnt = document.getElementById("StartBtn");
const endGame = document.getElementById("endGame");
const board = Array.from(document.getElementsByClassName("cell"));
const currBoard = ["","","","","","","","","",];
let arrCopy = [];
let huPlayer = "x";
let aiPlayer = "o";
let playerTurn = huPlayer
let isWin = "no";


board.forEach(el => {
    el.addEventListener("click", ()=>{
        if(el.innerText === "" && isWin === "no" ){
            currBoard[el.id] = "x";
            el.innerText = "x";
            playerTurn = huPlayer;
            isWin = checkForWin (currBoard,playerTurn);
            if(isWin!== "no"){
                gameOver(playerTurn,isWin)
            }else {
                makeMove();
                isWin = checkForWin (currBoard,playerTurn);
                if(isWin!== "no"){
                    gameOver(playerTurn,isWin)
                }       
            }    
        }
    })
});

startBnt.addEventListener("click", () =>{
    currBoard.forEach((e, i )=>{
        currBoard[i] = "";
        })
    
       board.forEach(cell => cell.innerText = "");
       winner = "";
       endGame.className = "endgame";
       isWin = "no";
       
})

function checkForWin (board,player){
    for(let i = 0;i<winCombo.length;i++){
        let option = winCombo[i];
        let cell1 = board[option[0]];
        let cell2 = board[option[1]];
        let cell3 = board[option[2]];
        
        if(cell1 === "" || cell2 === "" || cell3 === ""){
            continue;
        }else if(cell1 === cell2 && cell2 === cell3){
            return "won";
        }
        
    }
    if(!board.includes("")){
        return "draw";
    }
    return "no";
}

function makeMove (){
    debugger;
    arrCopy = [...currBoard];
    let bestScore = -100;
    let bestMove = {};
    playerTurn = aiPlayer;
    for(let i = 0; i< arrCopy.length;i++){
        if(arrCopy[i] === "") {
            arrCopy[i] = aiPlayer;
            let score = minimax(arrCopy,playerTurn)
            arrCopy[i] = ""
            if(score>bestScore){
                bestScore = score;
                bestMove = {bestScore: i}
            }
        }
    }
    
    currBoard[bestMove.bestScore] = aiPlayer;
    board[bestMove.bestScore].innerText = aiPlayer;
}

function gameOver (winner, result){
    if (result === "won"){
        endGame.innerHTML = `${winner} won`;
    }else if(result === "draw"){
        endGame.innerHTML = `DRAW!`; 
    }
    endGame.className = "endGameClicked";
}

function minimax (board,player) {

    let bestMove;
    let baseCase = checkForWin(board,player);
    if(baseCase == "won" ){
        if(player == "o"){
            return 10;
        }else if(player == "x"){
            return -10;
        }  
    }else if(baseCase == "draw"){
        return 0;
    }

    if(player == aiPlayer){
        player = huPlayer;
    }else{
        player = aiPlayer;
    }
    if (player === aiPlayer){

       let maxEval = -100;
   
       board.forEach((element,index) =>{
            if(element === ""){
                board[index] = player;
                let score =  minimax(board,player);
                board[index] = "";
                maxEval = Math.max(score,maxEval);
            }    
        })
    
       return maxEval;
    }else {
        let maxEval = 100;
       board.forEach((element,index) => {
        if(element === ""){
            board[index] = player;
            let score =  minimax(board,player);
            board[index] = "";
            maxEval = Math.min(score,maxEval);
        }
       })
       return maxEval;
    }
}
