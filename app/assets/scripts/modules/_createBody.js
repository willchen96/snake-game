import { Head, Square } from './_square'

export default function() {
    var head = new Head(8, 8, document.querySelector('.square__head'))
    var square1 = new Square(8, 9, document.createElement('div'), 'violet')
    var square2 = new Square(8, 10, document.createElement('div'), 'violet')
    return [head, square1, square2]
}