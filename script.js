
var side = 60;
// var n = prompt()
// var m = prompt()  
const socket = io()

const pausebtn = document.querySelector('#pause')
const resumebtn = document.querySelector('#resume')
const restartbtn = document.querySelector('#restart')

pausebtn.addEventListener('click', handlePauseGame)
resumebtn.addEventListener('click', handleResumeGame)
restartbtn.addEventListener('click', handlRestartGame)

let ifPaused = false
function handlePauseGame(){
    ifPaused = true
    socket.emit('pause game', ifPaused)
}
function handlResumeGame(){
    ifPaused = true
    socket.emit('pause game', ifPaused)
}
function handlRestartGame(){
    socket.emit('restart game', )
}

function setup() {
    createCanvas(matrix[0].length * side, matrix.length *
        side);

    background('#acacac');
}


function dispMessage(matrix) {

    for (var y = 0; y < matrix.length; y++) {

        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {

                fill("green");

            }
            if (matrix[y][x] == 3) {

                fill("red");

            }

            else if (matrix[y][x] == 0) {

                fill("#acacac");

            }
            else if (matrix[y][x] == 2) {

                fill("yellow")
            }
            else if(matrix[y][x] == 4){

                fill("blue")
            }

            rect(x * side, y * side, side, side);
        }
    }
}
socket.on('update matrix', dispMessage)
