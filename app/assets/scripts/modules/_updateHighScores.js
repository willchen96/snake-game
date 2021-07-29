const axios = require('axios').default

const nameInput = document.querySelector('.highscore__form__player-input')

module.exports = function(score) {

    axios.post('/', {
        name: nameInput.value,
        score: score
    })
        .then((res) => {
        })
        .catch((e) => console.log(e))
}
