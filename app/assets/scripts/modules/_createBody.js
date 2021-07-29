import { Head, Square } from './_square'

export function createBody() {
    var head = new Head(7, 7, document.querySelector('.head'))
    var square1 = new Square(7, 8, document.createElement('div'), 'violet')
    var square2 = new Square(7, 9, document.createElement('div'), 'violet')
    head.div.style.transform = `rotate(0deg)`
    head.div.classList.add('head__visible')
    setTimeout(() => {head.div.classList.add('square__transition')}, 1)
    square1.div.classList.add('square__transition')
    square2.div.classList.add('square__transition')
    return [head, square1, square2]
}

export function removeBody(body) {
    body.shift().div.classList.remove('square__transition', 'head__visible')
    body.forEach(square => square.removeFromGrid())
}