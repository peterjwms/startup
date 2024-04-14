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
    console.log(games);
    res.send(Object.values(games));
});

// getScores
apiRouter.get('/scores', (_req, res) => {
    res.send(scores);
})

// addGame
apiRouter.post('/game', (req, res) => {
    console.log(req.body);
    const game = req.body;
    if (!games[game.title]) {
        games[game.title] = game;
    }
    games.sort()
    res.send(games);
});

// addScore
apiRouter.post('/score', (req, res) => {
    const {title, score} = req.body;

    if (!scores[title]) {
        scores[title] = [];
    }

    scores[title].push(score);

    console.log('score');
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

let games = [];
let scores = []; // this needs to be an array of gameScores: [scores] objects
let highScores = []; // this needs to be an array of gameScores: [highScores] objects