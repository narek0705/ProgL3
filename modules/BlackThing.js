const random = require("./random");
const Live = require("./Live.js");
const Predator = require("./predator.js");
const GrassEater = require("./GrassEater.js");

module.exports = class BlackThing extends Live {
    constructor(x,y){
        super(x,y)
        this.energy = 30
    }

    updateDirection(){
        return super.updateDirection()
    }

    chooseCell(ch){
       return super.chooseCell(ch)
    }

    move(){
        this.energy--;
        
        let arr2 = this.chooseCell(2);
        let arr3 = this.chooseCell(3);
        if(arr2.length > 0 || arr3.length > 0)
        {
            this.kill();
        }
        else
        {
            let emptyCell = random(this.chooseCell(0));
            let emptyGrass = random(this.chooseCell(1));
            if (emptyGrass) {
                let x = emptyGrass[0];
                let y = emptyGrass[1];

                matrix[y][x] = 5;
                matrix[this.y][this.x] = 1;

                this.x = x;
                this.y = y;

                if(this.energy <= 0){
                    this.die();
                }
            } else if (emptyCell) {
                let x = emptyCell[0];
                let y = emptyCell[1];

                matrix[y][x] = 5;
                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;
                
                if(this.energy <= 0){
                    this.die();
                }
            } 
        }

        
    }
    kill (){
        this.updateDirection();
        var enemy2 = random(this.chooseCell(2));
        var enemy3 = random(this.chooseCell(3));

        if (enemy3) {
            for (let i = 0 ; i < this.direction.length ; i++){
                var x = enemy3[0];
                var y = enemy3[1];

                matrix[y][x] = 2;

                for (let i in predatorArr) {
                    if (x == predatorArr[i].x && y == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }

                let pred = new GrassEater(x,y);
                grassEaterArr.push(pred);

            } 
            this.die();
        }
        if (enemy2) {
            for (let i = 0 ; i < this.direction.length ; i++){
                var x = enemy2[0];
                var y = enemy2[1];

                matrix[y][x] = 3;

                for (let i in grassEaterArr) {
                    if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }

                let pred = new Predator(x,y);
                predatorArr.push(pred);

            } 
            this.die();
        }
    }
    
    die (){
        matrix[this.y][this.x] = 0
            for (var i in BlackArr) {
                if (this.x == BlackArr[i].x && this.y == BlackArr[i].y) {
                    BlackArr.splice(i, 1);
                    break;
                }
            }
    }

}