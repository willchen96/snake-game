function headXY(square, direction) {
    var x = square.x
    var y = square.y      
    if (direction == 'up' && square.y > 1) {
        y--
    }
    else if (direction == 'down' && square.y < 15) {
        y++
    }
    else if (direction == 'left' && square.x > 1) {
        x--
    }
    else if (direction == 'right' && square.x < 15) {
        x++
    }
    return[x, y]
}

function move(body, n, x, y) {
    body[n].shift(x, y)
    console.log(n + ',' + body[n].previousX + ',' + body[n].previousY)
    const next = n + 1
    if(body[next]) {
        console.log(body[next])
        move(body, next, body[n].previousX, body[n].previousY)
    }
    return
}


export default function(body, direction){
    const [x, y] = headXY(body[0], direction)
    move(body, 0, x, y)
}
