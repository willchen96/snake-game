import spawnFruit from './_spawn-fruits'
import move from './_move'
import eatFruit from './_eat-fruit'
import createBody from './_createBody'
import directionChecker from './_direction-checker'
import keyToDirection from './_key-to-direction'
import gameover from './_gameover'
import rotateTail from './_rotate-tail'

var fruit, body, setIntervalId
var directionTracker = 'up'
var score = 0
var tailDegree = 0
const scoreBoard = document.querySelector('.score-board__score')
const gameoverScore = document.querySelector('.gameover__score-number')

function moveAndEat(body, direction){
    if(!move(body, direction)) {
        //hit wall or itself
        window.removeEventListener('keydown', eventCallback)
        clearInterval(setIntervalId)
        gameoverScore.innerHTML = `${score}`
        gameover()
    } else {        
        if(eatFruit(body, fruit)) {
        fruit = spawnFruit(body)
        score++
        scoreBoard.innerHTML = `${score}`
        tailDegree = 0
        } else {
            tailDegree = rotateTail(body, tailDegree)
        }
    }
    
}

function changeDirection(body, direction){
    moveAndEat(body, direction)
    clearInterval(setIntervalId)
    setIntervalId = setInterval(() => {moveAndEat(body, direction)}, 400)
}

function eventCallback(e) {
    const output = directionChecker(e, directionTracker)
    if (output === 'change') {
        
        changeDirection(body, keyToDirection(e))
        directionTracker = keyToDirection(e)

    }  else if (output === 'stop') {
        clearInterval(setIntervalId)
    }
}

function start(e){
    if(e.code === "ArrowUp" || e.code === "ArrowLeft" || e.code === "ArrowRight") {
        body = createBody()
        fruit = spawnFruit(body)
        document.querySelector('.start').classList.add('start__hide')
        directionTracker = keyToDirection(e)
        setIntervalId = setInterval(() => {moveAndEat(body, directionTracker)}, 400)
        window.addEventListener('keydown', eventCallback)
        window.removeEventListener('keydown', start)
    }    
}

window.addEventListener('keydown', start)

document.querySelector('.gameover__restart-button').addEventListener("click", () => {
    reStart()
    document.querySelector(".gameover").classList.remove('gameover__display')
})

function reStart(){
    body[0].div.classList.remove('transition')
    body.shift()
    body.forEach(square => square.removeFromGrid())
    fruit.removeFromGrid()
    directionTracker = 'up'
    score = 0
    tailDegree = 0
    scoreBoard.innerHTML = `0`
    
    body = createBody()
    fruit = spawnFruit(body)
    window.addEventListener('keydown', eventCallback)
}





