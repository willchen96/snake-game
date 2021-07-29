import spawnFruit from './_spawn-fruits'
import move from './_move'
import eatFruit from './_eat-fruit'
import { createBody, removeBody } from './_createBody'
import directionChecker from './_direction-checker'
import keyToDirection from './_key-to-direction'
import { renderGameoverOverlay, removeGameoverOverlay } from './_gameover'
import rotateTail from './_rotate-tail'
import { getEntries, isHighScore } from './_leaderboard'
import { renderHighScoreForm, removeHighScoreForm } from './_renderHighScoreForm'
import updateHighScores from './_updateHighScores'

var fruit, body, setIntervalId
var directionTracker = 'up'
var score = 0
var tailDegree = 0
const scoreBoard = document.querySelector('.score-board__score')
const highscoreForm = document.querySelector('.highscore__form')

function moveAndEat(body, direction){
    if(!move(body, direction)) {
        //hit wall or itself
        clearInterval(setIntervalId)
        window.removeEventListener('keydown', eventCallback)
        
        if(isHighScore(score)) {
            renderHighScoreForm(score)
            console.log('highscore!')
            
        } else {
            renderGameoverOverlay(score)
        }
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
    setIntervalId = setInterval(() => {moveAndEat(body, direction)}, 350)
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
        setIntervalId = setInterval(() => {moveAndEat(body, directionTracker)}, 350)
        window.addEventListener('keydown', eventCallback)
        window.removeEventListener('keydown', start)
    }    
}

function reStart(){
    removeBody(body)
    fruit.removeFromGrid()
    directionTracker = 'up'
    score = 0
    tailDegree = 0
    scoreBoard.innerHTML = `0`
    document.querySelector('.start').classList.remove('start__hide')
    window.addEventListener('keydown', start)
}

getEntries()

window.addEventListener('keydown', start)

document.querySelector('.gameover__restart-button').addEventListener("click", () => {
    removeGameoverOverlay()
    reStart()
})

highscoreForm.addEventListener('submit', function (e) {
    e.preventDefault()
    updateHighScores(score)
    removeHighScoreForm()
    getEntries()
    reStart()
})



