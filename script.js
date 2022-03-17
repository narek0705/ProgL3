const socket = io();
let Mychart;
let i = 0;
var CanvasCreation = false

function setup() {

    var side = 25;

    var matrix = [];

    
    const seasonChangerArray = document.querySelectorAll(".change-season")

    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountElement = document.getElementById('predCount');
    let bomberCountElement = document.getElementById('bomberCount');
    let blackCountElement = document.getElementById('blackCount');
    var season = {Grass: "#1A921B" ,Herbivore : "#ffed82" ,Predator : "#ff4638" ,Human: "#212121"};


    socket.on("data", drawCreatures);

    socket.on("season", (data) => {
        season = data;
    })

    socket.on("chart", (data) => {
        if(i == 0){
            i++;
            Mychart = new Chart(document.querySelector("#countChart"), {
                type:"bar",
                data: data.data,
                options: {
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        font: {
                                            size: 30
                                        }
                                    }
                                },
                                x: {
                                    ticks: {
                                        font: {
                                            size: 20
                                        }
                                    }
                                },
                            },
                            responsive: false,
                        },
                    plugins: [plugin = {
                        id: 'custom_canvas_background_color',
                        beforeDraw: (chart) => {
                          const ctx = chart.canvas.getContext('2d');
                          ctx.save();
                          ctx.globalCompositeOperation = 'destination-over';
                          ctx.fillStyle = 'white';
                          ctx.fillRect(0, 0, chart.width, chart.height);
                          ctx.restore();
                        }
                      }]
                });
        } else {
            Mychart.data.datasets[0].data = data.data.datasets[0].data;
            Mychart.update();
        }
    })

    function drawCreatures(data) {
        matrix = data.matrix;

        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCount;
        predatorCountElement.innerText = data.predCount;
        bomberCountElement.innerText = data.bomberCount;
        blackCountElement.innerText = data.blackCount;

        if (CanvasCreation == false) {
            createCanvas(matrix[0].length * side, matrix.length * side)

            document.querySelector(".canvas-div").appendChild(document.querySelector("#defaultCanvas0"))
            CanvasCreation = true
        }
        

        socket.emit("changeChart")

        background('#acacac');

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1)      fill(season.Grass);
                else if (matrix[i][j] == 2) fill(season.Herbivore);
                else if (matrix[i][j] == 3) fill(season.Predator);
                else if (matrix[i][j] == 4) fill("cyan");
                else if (matrix[i][j] == 5) fill(season.Human);
                else if (matrix[i][j] == 0) fill("#8D5524");
                rect(j * side, i * side, side, side);
            }
        }

        
        seasonChangerArray.forEach(seasonButton => {
            seasonButton.addEventListener("click", () => {
                socket.emit("changeSeason", seasonButton.getAttribute("value") );
            })
        });
    }
}

function restart() {
    let restart = document.querySelector("#restart-button")
    restart.addEventListener("click", socket.emit("restart"))
    
}
function addGrassEater() {
    let restart = document.querySelector("#AddGrass")
    restart.addEventListener("click", socket.emit("AddGrass"))
}
