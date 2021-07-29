export default function(body, fruit) {
    if (body[0].x == fruit.x && body[0].y == fruit.y) {
        var tail = body[body.length - 1]
        setTimeout(() => {
            tail.div.style.borderRadius = '10px'
            fruit.shift(tail.previousX, tail.previousY)
            if(tail.x < fruit.x && tail.y == fruit.y) {
                fruit.div.style.borderRadius = '0 15px 15px 0'
            } else if (tail.x > fruit.x && tail.y == fruit.y) {
                fruit.div.style.borderRadius = '15px 0 0 15px'
            } else if (tail.x == fruit.x && tail.y > fruit.y) {
                fruit.div.style.borderRadius = '15px 15px 0 0'
            } else if (tail.x == fruit.x && tail.y < fruit.y) {
                fruit.div.style.borderRadius = '0 0 15px 15px'
            }
        }, 100)
        
        body.push(fruit)        
        setTimeout(() => {fruit.div.classList.add('square__transition')}, 161)
        return true      
    }   
}