const random = require("./random");
const Live = require("./Live.js");

module.exports = class Bomber extends Live {
    constructor(x,y){
        super(x,y)
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(ch){
       return super.chooseCell(ch)
    }


    checker(){
        let xotaker = random(this.chooseCell(2))
        let predat = random(this.chooseCell(3))

        matrix[this.y][this.x] = 4;

        if (xotaker) {
            let newx = xotaker[0]
            let newy = xotaker[1]

            matrix[newy][newx] = 0;
            matrix[this.y][this.x] = 0;

            for (let i in grassEaterArr){
                matrix[grassEaterArr[i].y][grassEaterArr[i].x] = 0;
                grassEaterArr.splice(i,1);
            }

            for (let i in BomberArr){
                if (this.x == BomberArr[i].x && this.y == BomberArr[i].y) {
                    BomberArr.splice(i, 1)
                    break;
                }
            }
        } else if (predat) {
            let newx = predat[0]
            let newy = predat[1]

            matrix[newy][newx] = 0;
            matrix[this.y][this.x] = 0;

            for (let i in predatorArr){
                matrix[predatorArr[i].y][predatorArr[i].x] = 0;
                predatorArr.splice(i,1);
            }

            for (let i in BomberArr){
                if (this.x == BomberArr[i].x && this.y == BomberArr[i].y) {
                    BomberArr.splice(i, 1)
                    break;
                }
            }
        }
    }
}