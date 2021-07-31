import { Square } from '../modules/_square'

const colors = ['blue', 'red', 'yellow', 'green', 'purple']

function coordinatesRand(body) {
    var board = [...Array(225).keys()]
    const bodyPositions = []
    body.forEach(square => {
        let position = square.x + square.y * 15
        bodyPositions.push(position)
    });
    const spaces = board.filter((i)=> bodyPositions.indexOf(i) < 0)
    const index = Math.floor(Math.random() * (225 - body.length))
    const position = spaces[index]
    return [(position % 15), (Math.floor(position / 15))]
}

function colorRand() {
    var z = Math.floor(Math.random() * 5)
    return colors[z]   
}

export default function(body) {
    const [x, y] = coordinatesRand(body)
    var fruit = new Square(x, y, document.createElement('div'), colorRand())
    return fruit
}