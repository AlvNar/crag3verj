const express = require('express')
const app = express()
const http = require('http')


const server = http.createServer(app)
const io = require('socket.io')(server)

app.use(express.static("."));

app.get('/', (req, res) => {
    res.redirect('index.html')
})

grassArr = [];
grassEaterArr = [];
predatorArr = [];
thunArr = [];

matrix = []
const sideX = 20;
const sideY = 15;
let Predator =require('./Predator')
let GrassEater = require('./GrassEater')
let Thunder = require('./thunder')
let Grass = require('./class')

function random(min, max) {
    if (min === undefined && max === undefined) {
        return Math.random();
    } else if (max === undefined) {
        max = min;
        min = 0;
    }
    return Math.random() * (max - min) + min;
}

function character(quantity, char) {
    let initialNumber = 0;
    while (initialNumber < quantity) {
        let x = Math.floor(random(0, sideX));
        let y = Math.floor(random(0, sideY));
        if (matrix[y][x] == 0) {
            matrix[y][x] = char;
        }
        initialNumber++;
    }
}

for (let i = 0; i < sideY; i++) {
    matrix.push([]);
    for (let j = 0; j < sideX; j++) {
        matrix[i].push(0);
    }
}

function initGame() {
    character(1, 60)
    character(2, 15)
    character(3, 10)
    character(4, 3)
    console.log(matrix);
    initializeArrays();
    startInterval();
}

function initializeArrays() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    thunArr = [];
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {

                var grEA = new GrassEater(x, y, 1);
                grassEaterArr.push(grEA);
            }
            else if (matrix[y][x] == 3) {
                var pre = new Predator(x, y, 3)
                predatorArr.push(pre)
            }
            else if (matrix[y][x] == 4) {
                var th = new Thunder(x, y, 4);
                thunArr.push(th);
            }

        }
    }
}
let speed = 300;
let intervalId;
function startInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        playGame();
    }, speed);
}
function playGame(){
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in thunArr) {
        thunArr[i].mul();
    }
    io.emit('update matrix', matrix)
}
io.on('connection', (socket) => {
    initGame()
    socket.emit('update matrix', matrix)
    socket.on("pause game", handlePauseGame())

})


function handlePauseGame(ifpaused){
    if(ifPaused){
        clearInterval(intId)
    }else{
        startInterval
    }
    
}
function handleRestartGame(){
    clearInterval(intId)
    initGame()
}



server.listen(3000, () => {
    console.log('Server is listening to port 3000');
})