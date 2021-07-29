const axios = require('axios').default
const leaderboardEntries = document.querySelector('.leaderboard__entries')
var entries

function generateEntries(entries) {
    leaderboardEntries.innerHTML = ''
    for (let i = 0; i < entries.length; i++) {
        leaderboardEntries.insertAdjacentHTML('beforeend', `
            <div class="leaderboard__entry">
                <h1 class="leaderboard__entry__num">${i + 1}.</h1>
                <h1 class="leaderboard__entry__name">${entries[i].name}</h1>
                <h1 class="leaderboard__entry__score">${entries[i].score}</h1>
            </div>
        `)
    }
}


export function getEntries(){
    axios.get('/leaderboard')
    .then(function (res) {
        entries = res.data.leaderboard
        generateEntries(entries)
    })
    .catch((error) => console.log(error))
}


export function isHighScore(score) {
    for (let i = 0; i < 10; i++) {
        if (!entries[i] || score > entries[i].score) {
            return true
        } 
    }
}