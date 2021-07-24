const score = document.querySelector('.score-board__score')

export default function(body, fruit) {
    if (body[0].x == fruit.x && body[0].y == fruit.y) {
        body.push(fruit)
        var currentScore = parseInt(score.innerHTML)
        currentScore++
        score.innerHTML = `${currentScore}`
        return true      
    }   
}