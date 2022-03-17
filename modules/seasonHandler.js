module.exports = class seasonHandler {
    constructor(){
        this.season = {
                        Winter: {Grass: "#FFFFFF" ,Herbivore : "#bfa300" ,Predator : "#910a00" ,Human: "#212121"},
                        Spring: {Grass: "#25CD27" ,Herbivore : "#ffda00" ,Predator : "#d60f00" ,Human: "#212121"},
                        Summer: {Grass: "#23BB25" ,Herbivore : "#ffe33d" ,Predator : "#ff1200" ,Human: "#212121"},
                        Autumn: {Grass: "#1A921B" ,Herbivore : "#ffed82" ,Predator : "#ff4638" ,Human: "#212121"},
                      }
    }

    noel(season){
        switch (season) {
            case "Winter":
                return this.season.Winter;
            case "Spring":
                return this.season.Spring;
            case "Summer":
                return this.season.Summer;
            case "Autumn":
                return this.season.Autumn;
        }
    }
}