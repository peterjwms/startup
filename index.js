const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
// TODO: may need to do something else here for parsing the xml??

app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);

// getGames
apiRouter.get('/games', (_req, res) => {
    // console.log(games);
    res.send((games));
});

// getScores
apiRouter.get('/scores', (_req, res) => {
    res.send(scores);
})

// getHighScores
apiRouter.get('/highScores', (_req, res) => {
    // console.log(highScores);
    // console.log(typeof highScores);
    res.send(highScores);
})

// addGame
apiRouter.post('/game', (req, res) => {
    console.log(req.body);
    const game = req.body;
    const title = game.title.toLowerCase();
    if (!games[title]) {
        games[title] = game;
    }
    // games.sort()
    res.send(games);
});

// addScore
apiRouter.post('/score', (req, res) => {
    const score = req.body;
    const title = score.title.toLowerCase();
    // console.log(req.body);
    if (!scores[title]) {
        scores[title] = [];
    }

    scores[title].push(score);
    highScores = updateHighScores(title, score);
    // console.log('score');
    res.send(scores);
});

// search?? this is the third-party API
// probably just goes into search.js - use simon-service/about.js as template

app.use((_req, res) => {
    res.sendFile('index.html', {root: 'public'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

let games = {};
let scores = {}; // this needs to be an object of gameScores: [scores] objects
let highScores = {}; // this needs to be an object of gameScores: [highScores] objects

function updateHighScores(title, score) {
    if (!highScores[title]) {
        highScores[title] = [];
    }
    highScores[title].push(score);
    highScores[title].sort((a, b) => b.score - a.score);
    if (highScores[title].length > 3) {
        highScores[title].pop();
    }
    return highScores;
}