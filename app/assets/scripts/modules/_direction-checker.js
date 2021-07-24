import createBody from './_createBody'
import opposite from './_opposite'
var body = createBody()
console.log(body)

export default function(direction, e, changeDirection, setIntervalId) {
    if(e.code === "ArrowUp" || e.code === "ArrowDown" || e.code === "ArrowLeft" || e.code === "ArrowRight") {
        const newDirection = e.code.toLowerCase().slice(5)
        if(newDirection !== opposite[direction]) {
            clearInterval(setIntervalId)
            changeDirection(body, newDirection)
            return newDirection
        } else {
            return direction
        }
    } else {
        clearInterval(setIntervalId)
        return direction
    }
}