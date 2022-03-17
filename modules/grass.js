const random = require("./random");
const Live = require("./Live.js");
module.exports = class Grass extends Live{
    constructor(x,y){
        super(x,y)
        this.multiply = 0;
        matrix[y][x] = 1
    }

    chooseCell(ch){
        return super.chooseCell(ch);
    }


    mul(){
        this.multiply++

        let emptyCells = this.chooseCell(0)
        let randomCell = random(emptyCells)

        if (this.multiply >= 4 && randomCell) {
            
            let x = randomCell[0]
            let y = randomCell[1]

            matrix[y][x] = 1
            let gr = new Grass(x,y)
            grassArr.push(gr)
            this.multiply = 0
        }
    }
        
}