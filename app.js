const express = require('express')
const app = express()
const path = require('path');

const port = 8080

// app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'docs'))

app.use(express.static(path.join(__dirname, 'docs')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var leaderboard = [
    {
        name: 'Will',
        score: 60
    }
]

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/leaderboard', (req, res) => {
    res.send({leaderboard})
})

app.post('/', (req, res) => {
    const entry = req.body
    for (let i = 0; i < 10; i++) {
        if (!leaderboard[i] || parseInt(entry.score) > leaderboard[i].score) {
            leaderboard.splice(i, 0, {name: entry.name, score: parseInt(entry.score)})
            if(leaderboard.length > 10) {
                leaderboard.pop()
            }
            break
        } 
    }
    res.redirect('/')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

