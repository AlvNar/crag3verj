class Thunder {

    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.energy = 8;
        this.directions = [
            [this.x - 1, this.y - 1], 
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1], 
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(character) {

        var found = [];

        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);

                }
            }
        }

        return found;

    }
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(1));
        console.log(newCell, this.multiply);
        if (this.multiply >= 0 && newCell) {
            this.eat()
            var newThunder = new Thunder(newCell[0], newCell[1], this.index);
            thunArr.push(newThunder);
            matrix[newCell[1]][newCell[0]] = 4;
            this.eat()
            this.die()
            this.multiply = 0;  
        }
    }

     eat() {
        let foods = this.chooseCell(2)
        let food = random(foods)
        if (food) {
        this.energy--;
        matrix[this.y][this.x] = 0
        let newX = food[0]
        let newY = food[1]
        matrix[food[1]][food[0]] = 3
        this.x = newX
        this.y = newY
        for (var i in grassEaterArr) {
        if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
            grassEaterArr.splice(i, 1);
        break;
        }
        }
        if (this.energy >= 18) {
        this.mul()
        }
        }
        else if(this.energy == 0){
            this.die()
        }
       
        }


        die() {
            matrix[this.y][this.x] = 0;
            for (var i in thunArr) {
            if (this.x == thunArr[i].x && this.y == thunArr[i].y) {
            thunArr.splice(i, 1);
            break;
            }
            }
            }
    
}
