import detectCollision from './_detectCollision'

var headDegree = 0
var previousDirection = 'up'

document.querySelector('.gameover__restart-button').addEventListener("click", () => {
    headDegree = 0
    previousDirection = 'up'
})

document.querySelector('.highscore__form').addEventListener("submit", () => {
    headDegree = 0
    previousDirection = 'up'
})

function rotateHead(a, b, head) {
    if(previousDirection == a){
        headDegree = headDegree + 90 
        head.div.style.transform = `rotate(${headDegree}deg)`
    } else if(previousDirection == b){
        headDegree = headDegree - 90 
        head.div.style.transform = `rotate(${headDegree}deg)`
    }
}

function headXY(head, direction) {
    var x = head.x
    var y = head.y      
    if (direction == 'up' && head.y > 0) {
        rotateHead('left', 'right', head)
        previousDirection = direction
        y--
        return[x, y]
    }
    else if (direction == 'down' && head.y < 14) {
        rotateHead('right', 'left', head)
        previousDirection = direction
        y++
        return[x, y]
    }
    else if (direction == 'left' && head.x > 0) {
        rotateHead('down', 'up', head)
        previousDirection = direction
        x--
        return[x, y]
    }
    else if (direction == 'right' && head.x < 14) {
        rotateHead('up', 'down', head)
        previousDirection = direction
        x++
        return[x, y]
    } else {
        return false
    }
    
}

function moveBody(body, n, x, y) {
    body[n].shift(x, y)
    const next = n + 1
    if(body[next]) {
        moveBody(body, next, body[n].previousX, body[n].previousY)
    }
}


export default function(body, direction){
    if(headXY(body[0], direction)) {
        const [x, y] = headXY(body[0], direction)
        if(detectCollision(body, x, y)){
            return false
        } else {
            moveBody(body, 0, x, y)
            return true
        }
    } else {
        return false
    }
}
