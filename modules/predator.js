const random = require("./random");
const Live = require("./Live.js");

module.exports = class Predator extends Live{
    constructor(x,y){
        super(x,y)
        this.energy = 40
    }

    updateDirection(){
        return super.updateDirection()
    }

    chooseCell(ch){
        return super.chooseCell(ch)
    }

    move(){
        this.energy--
        let arr = this.chooseCell(2)
        if(arr.length > 0)
        {
            this.eat()
            if (this.energy >= 50) {
                this.mul()
            }
        }
        else
        {
            arr = this.chooseCell(0)
            let emptyCell = random(arr)
            let emptyCell1 = random(this.chooseCell(1))
            if (emptyCell) {
                let x = emptyCell[0]
                let y = emptyCell[1]

                matrix[y][x] = 3
                matrix[this.y][this.x] = 0



                this.x = x
                this.y = y
            } else if(emptyCell1){
                let x = emptyCell1[0]
                let y = emptyCell1[1]

                matrix[y][x] = 3
                matrix[this.y][this.x] = 0



                this.x = x
                this.y = y
            }

            if(this.energy <= 0){
                this.die()
            }
        }

        

        
    }
    eat(){
        var newCell = random(this.chooseCell(2));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 5;
        }
    }
    
    die(){
        matrix[this.y][this.x] = 0
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                    break;
                }
            }
    }

    mul(){
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newPredator = new Predator(newCell[0], newCell[1]);
            predatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 35;
        }
    }

}