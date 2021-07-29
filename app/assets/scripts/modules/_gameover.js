const gameover = document.querySelector(".gameover")

export function renderGameoverOverlay(score) {
    gameover.classList.add('overlay__transition', 'gameover__display')
    document.querySelector('.gameover__score-number').innerHTML = `${score}`
}

export function removeGameoverOverlay() {
    gameover.classList.remove('gameover__display')
}