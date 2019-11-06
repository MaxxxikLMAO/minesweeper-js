import {field} from "./models/field.js";


class Coordinate {
    constructor(x, y) {

        this.x = x; /*horizobtal*/
        this.y = y; /*vertical*/

    }
}
export class Minesweeper {

    /**
     * @param {number} rows
     * @param {number} columns
     * @param {number | null} bombs
     */
    constructor(rows, columns, bombs = null) {
        this.rows = rows;
        this.columns = columns;
        this.isGameOver = false;
        

        if (bombs == null) 
            this.bombs = this._calculateDefaultBombs();
        else 
            this.bombs = bombs;
        

        this.array = [];       

        for (let i = 0; i < rows; i++) {
            let arr2 = [];

            for (let j = 0; j < columns; j++) {
                arr2.push(field.hidden)
            }
            
            this.array.push(arr2);
        }

        this.bomblocations = [];

        for(let h = 0; h < bombs; h++) {

            let x = Math.floor(Math.random() * this.rows);
            let y = Math.floor(Math.random() * this.columns);

            let coordi = new Coordinate(x,y);
            this.bomblocations.push(coordi);
            

        }
        console.log(this.bomblocations)
    }

    

    /**
     * TODO: IMPLEMENT THIS
     * Calculate how many bombs should be on the field and return it.
     * The calculation should Depend on the size of the field.
     * @private
     * @return {number} amount of bombs
     */
    _calculateDefaultBombs() {
        
        return 10;

    }

    /**
     * TODO: IMPLEMENT THIS
     * Returns the current state of the field.
     * Fields can be: hidden, visible, flagged or question marked.
     * @param {number} x
     * @param {number} y
     * @return {field}
     */
    getField(x, y) {
        
        return this.array[x][y];
    }

    /**
     * TODO: IMPLEMENT THIS
     * Returns how many bombs are around the field
     * @param {number} x
     * @param {number} y
     * @return {number}
     */
    getAmountOfSurroundingBombs(y, x) {
        let closeBombs = 0;

        if(this.isBombOnPosition(x+1, y) === true)
        closeBombs++;
            if(this.isBombOnPosition(x+1, y-1) === true)
            closeBombs++;
                if(this.isBombOnPosition(x+1, y+1) === true)
                closeBombs++;
                    if(this.isBombOnPosition(x-1, y) === true)
                    closeBombs++;
                        if(this.isBombOnPosition(x-1, y+1) === true)
                        closeBombs++;
                            if(this.isBombOnPosition(x-1, y-1) === true)
                            closeBombs++;
                                if(this.isBombOnPosition(x, y-1) === true)
                                closeBombs++;
                                    if(this.isBombOnPosition(x, y+1) === true)
                                    closeBombs++;

        return closeBombs;
    }

    /**
     * TODO: IMPLEMENT THIS
     * Returns true there is a bomb on the position
     * @param {number} x
     * @param {number} y
     * @return {boolean}
     */
    isBombOnPosition(x, y) {
        for(let i = 0; i < this.bomblocations.length; i++) {
        
        if(this.bombLocation[i].x === x && this.bomblocations[i].y === y)

        return true;
        }
        return false;
    }

    /**
     * TODO: IMPLEMENT THIS
     * Reveals the field and all empty connected fields around it.
     * Or stops the game if clicked on a position, where a bomb is located.
     * @param {number} x
     * @param {number} y
     */
    reveal(x, y) {

        if(!this.array[y][x] === field.flag || this.array[y][x] === field.question_mark) {
            this.array[y][x] = field.visible;
        }

        if(this.array[y][x] === field.hidden) {
            this.array[y][x] = field.visible;
        }

        if(this.isBombOnPosition(x,y) === true) {
            this.isGameOver = true;
            this.array[y][x] = field.hidden;
        }
    }

    /**
     * TODO: IMPLEMENT THIS
     * Toggles the field state, if it has not been revealed yet.
     * @param {number} x
     * @param {number} y
     */
    toggleFieldState(x, y) {
        if (this.array[y][x] === field.hidden)
            this.array[y][x] = field.flag;

        else if (this.array[y][x] === field.flag)
            this.array[y][x] = field.question_mark;

        else if (this.array[y][x] === field.question_mark)
            this.array[y][x] = field.hidden;

        else
            this.array[y][x] = field.visible;
    }

    /**
     * TODO: IMPLEMENT THIS
     * Returns if the user already won
     * @returns {boolean}
     */
    didWin() {
        if(this.isGameOver === false)
        return false;
    }

    /**
     * TODO: IMPLEMENT THIS
     * Returns if the user clicked a bomb and therefore lost.
     * @returns {boolean}
     */
    didLoose() {
        if(this.isGameOver === true)
        return true;
    
    }
    /**
     * Returns the remaining amount bombs, user has to select
     * @return {number}
     */
    getRemainingBombCount() {
        return -1;
    }

}