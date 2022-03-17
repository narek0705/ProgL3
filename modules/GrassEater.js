let guyner = {
    grass: "green",
    grasseater: "orange",
    predator: "red",
    bomber: "cyan",
    black: "black"
}
const Live = require("./Live");
const random = require("./random");

module.exports = class GrassEater extends Live{
    constructor(x,y){
        super(x,y);
        this.energy = 13;
    }

    move(){
        this.energy--;
        let arr = this.chooseCell(1);
        
        if(arr.length > 0)
        {
            this.eat();
            if (this.energy >= 15) {
                this.mul();
            }
        }
        else
        {
            arr = this.chooseCell(0);
            let emptyCell = random(arr);
            if (emptyCell) {
                let x = emptyCell[0];
                let y = emptyCell[1];

                matrix[y][x] = 2;
                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;
                
                if(this.energy <= 0){
                    this.die();
                }
            }
        }

        
    }
    eat(){
        var newCell = random(this.chooseCell(1));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 3;
        }
    }
    
    die(){
        matrix[this.y][this.x] = 0
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
    }

    mul(){
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var cow = new GrassEater(newCell[0], newCell[1]);
            grassEaterArr.push(cow);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
        }
    }

}