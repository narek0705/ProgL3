
//! Requiring modules  --  START
const Black = require("./modules/BlackThing.js");
const Bomb = require("./modules/Bomber.js");
const Grass = require("./modules/grass.js");
const Predator = require("./modules/predator.js");
const GrassEater = require("./modules/GrassEater");
const allStarter = require("./modules/allStarter.js");
const EntityCount = require("./modules/EntityHandler.js");
const seasonHandler = require("./modules/seasonHandler.js");
var random = require("./modules/random.js");
const fs = require("fs");
//! Requiring modules  --  END


let noeldeyzel = new seasonHandler()
//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
predatorArr = [];
BomberArr = [];
BlackArr = [];
matrix = [];
currentSeason = 0
grassHashiv = grassArr.length;
grassEaterCount = grassEaterArr.length;
predatorCount = predatorArr.length;
bomberCount = BomberArr.length;
blackCount = BlackArr.length;
starterArr = [new allStarter()];
//! Setting global arrays  -- END
var MatrixSize = 40

seasons = {
    Winter: "Winter",
    Spring: "Spring",
    Summer: "Summer",
    Autumn: "Autumn"
}

entitycount = new EntityCount();





//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, predatorArr , BomberArr , BlackArr) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predatorArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < BomberArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < BlackArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(MatrixSize, 5, 3 , 1 , 8 , 1);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
    console.log("Server is running!");
});
//! SERVER STUFF END  --  END

function changeSeason(seasonId) {
    const seasonIds = Object.keys(seasons); 
    seasonIds.forEach(season => {
        if(season == seasonId){
            io.sockets.emit("season", noeldeyzel.noel(season));
        }
    });
}

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            } else if (matrix[y][x] == 3) {
                var grassEater = new Predator(x, y);
                predatorArr.push(grassEater);
            } else if (matrix[y][x] == 4) {
                var Bomber = new Bomb(x, y);
                BomberArr.push(Bomber);
            } else if (matrix[y][x] == 5) {
                var BlackThing = new Black(x, y);
                BlackArr.push(BlackThing);
            }
        }
    }
}
creatingObjects();

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].move();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].move();
        }
    }
    if (BomberArr[0] !== undefined) {
        for (var i in BomberArr) {
            BomberArr[i].checker();
        }
    }
    if (BlackArr[0] !== undefined) {
        for (var i in BlackArr) {
            BlackArr[i].move();
        }
    }
    if (starterArr[0] !== undefined) {
        for (var i in starterArr) {
            starterArr[i].starterr();
        }
    }

    entitycount.count.grassCount = grassArr.length;
    entitycount.count.grasseaterCount = grassEaterArr.length;
    entitycount.count.predatorCount = predatorArr.length;
    entitycount.count.bombCount = BomberArr.length;
    entitycount.count.blackCount = BlackArr.length;
    //Yes()

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCount: grassEaterArr.length,
        predCount: predatorArr.length,
        bomberCount: BomberArr.length,
        blackCount: BlackArr.length,
    }

    io.sockets.emit("data", sendData);
}

function writeStatistics() {
    let gameData = {
        GrassCount: grassArr.length,
        GrassEaterCount: grassEaterArr.length,
        PredatorCount: predatorArr.length,
        BomberCount: BomberArr.length,
        BlackCount: BlackArr.length,
    }

    fs.writeFile("statistics.json", JSON.stringify(gameData), function () {
        console.log("Updated stats");
    });
}


function restart() {
    matrix = [];
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    BomberArr = [];
    BlackArr = [];
    
    matrixGenerator(40, 5, 3 , 1 , 8 , 1);
    creatingObjects()

    let data = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCount: grassEaterArr.length,
        predCount: predatorArr.length,
        bomberCount: BomberArr.length,
        blackCount: BlackArr.length,
    };

    io.sockets.emit("data", data);


}

function GrassEaterAdd(){
    let number = 10
    for (let i = 0; i < number; i++) {
        let customX = Math.floor(random(MatrixSize));
        let customY = Math.floor(random(MatrixSize));
        matrix[customY][customX] = 2;
        var grassEater = new GrassEater(customX, customY);
        grassEaterArr.push(grassEater);
    }

    

    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCount: grassEaterArr.length,
        predCount: predatorArr.length,
        bomberCount: BomberArr.length,
        blackCount: BlackArr.length,
    };


    io.sockets.emit("data", sendData);
}

io.on('connection', function (socket) {
    socket.on("restart", restart);
    socket.on("AddGrass", GrassEaterAdd);
    socket.on("changeChart",setupChart)
    socket.on("changeSeason",changeSeason)
});


function setupChart(){
    const data = {
        labels: Object.keys(entitycount.count),
        datasets: [{
            label: 'Entity count',
            data: [
                   entitycount.count.grassCount,
                   entitycount.count.grasseaterCount,
                   entitycount.count.predatorCount,
                   entitycount.count.bombCount,
                   entitycount.count.blackCount
                  ],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(201, 203, 207, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
                'rgb(255, 99, 132)',
                'rgb(201, 203, 207)',
                'rgb(255, 159, 64)',
            ],
            borderWidth: 0,
            hoverOffset: 4,
          }]
    }
    const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext('2d');
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = 'lightGreen';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      };

      sendData = {
          data: data,
          plugin: plugin
      }

    io.sockets.emit("chart", sendData);
    
}

setInterval(writeStatistics, 250 * 60);
setInterval(game, 250)