export function renderHighScoreForm(score) {
    document.querySelector(".highscore").classList.add('overlay__transition')
    document.querySelector(".highscore").classList.add('highscore__display')
    document.querySelector('.highscore__score-number').innerHTML = `${score}`
}

export function removeHighScoreForm(score) {
    document.querySelector(".highscore").classList.remove('highscore__display')
}