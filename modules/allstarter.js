const random = require("./random");
const bomb = require("./Bomber");
const black = require("./BlackThing");

module.exports = class allStarter {
    constructor (){
        this.randm;
    }

    starterr(){
        this.randm = Math.round(random(1,10));
        if (this.randm == 2 && BomberArr.length <=5){
            let y = Math.round(random(0,matrix.length-1));
            let x = Math.round(random(0,matrix[0].length-1));

            var bomber = new bomb(x,y);
            BomberArr.push(bomber);
        } else if (this.randm == 3){
            if (BlackArr.length <= 10) {
                let x = Math.round(random(0,matrix.length-1));
                let y = Math.round(random(0,matrix[0].length-1));
                var blacker = new black(x,y);
                BlackArr.push(blacker);
            }
        }
    }
}