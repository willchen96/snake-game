export class Head {
    constructor(x, y, div) {
        this.x = x
        this.y = y
        this.div = div
        this.position(this.x, this.y) 
    }
    position(x, y) {
        this.div.style.top = `${y * 30}px`
        this.div.style.left = `${x * 30}px`
    }

    shift(x, y) {
        
        this.previousX = this.x
        this.previousY = this.y
        this.x = x
        this.y = y
        this.position(x, y)
    }  
}

const gameGrid = document.querySelector('.game-grid')

export class Square extends Head {
    constructor(x, y, div, color) {
        super(x, y, div)
        this.color = color
        this.events()
    }

    events(){
        this.div.classList.add('square')
        this.div.classList.add(this.color)
        this.position(this.x, this.y)
        gameGrid.append(this.div)
    }

    removeFromGrid(){
        gameGrid.removeChild(this.div)
    }
}