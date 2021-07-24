import spawnFruit from './_spawn-fruits'
import move from './_move'
import eatFruit from './_eat-fruit'
// import createBody from './_createBody'
import directionChecker from './_direction-checker'

var fruit = spawnFruit()
// var body = createBody()
var direction
var setIntervalId

function start(){

}

function moveAndEat(body, direction){
    move(body, direction)
    if(eatFruit(body, fruit)) {
        fruit = spawnFruit()
    }
}

function changeDirection(body, direction){
    moveAndEat(body, direction)
    setIntervalId = setInterval(() => {moveAndEat(body, direction)}, 500)
}

window.addEventListener('keydown', (e) => {
    direction = directionChecker(direction, e, changeDirection, setIntervalId)
})








// var x = parseInt(getComputedStyle(snake).gridRowStart)
// var y = parseInt(getComputedStyle(snake).gridColumnStart)
