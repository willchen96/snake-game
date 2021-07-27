export default function (body, x, y) {
    var collision = false
    body.slice(1, (body.length - 1)).forEach(square => {
        if (x === square.x && y === square.y) {
            collision = true
        } 
    })
    return collision
}