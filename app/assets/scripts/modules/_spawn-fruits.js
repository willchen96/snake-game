import { Square } from '../modules/_square'

const colors = ['blue', 'red', 'yellow', 'green', 'purple']

function coordinatesRand() {
    return Math.floor(Math.random() * 15 + 1)
}

function colorRand() {
    var z = Math.floor(Math.random() * 5)
    return colors[z]   
}

export default function() {
    var fruit = new Square(coordinatesRand(), coordinatesRand(), document.createElement('div'), colorRand())
    return fruit
}