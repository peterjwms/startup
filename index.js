const express = require('express');
const app = express();
const DB = require('./database.js');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
// TODO: may need to do something else here for parsing the xml??

app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);

// getGames
apiRouter.get('/games/:username', (req, res) => {
    // this should get all the games the user has in their profile
    const userGames = DB.getUserGames(req.params.username);
    res.send((userGames));
});

// getScores
apiRouter.get('/scores/:username', (req, res) => {
    // this should get the scores as an array, same as it was before
    const scores = DB.getScores(req.params.username);
    res.send(scores);
})

// getHighScores
apiRouter.get('/highScores/:username', (req, res) => {
    // this should get all the high scores associated with the user
    const highScores = DB.getHighScores(req.params.username);
    res.send(highScores);
})

// addGame
apiRouter.post('/game/:username', (req, res) => {
    console.log(req.body);
    const game = req.body;
    const title = game.title.toLowerCase();
    
    const games = DB.addGame(req.params.username, game);

    // if (!games[title]) {
    //     games[title] = game;
    // }
    
    res.send(games);
});

// addScore
apiRouter.post('/score', (req, res) => {
    const score = req.body;
    const title = score.title.toLowerCase();

    const scores = DB.addScore(score);
    // console.log(req.body);
    // if (!scores[title]) {
    //     scores[title] = [];
    // }
    // scores[title].push(score);
    // highScores = updateHighScores(title, score);
    // console.log('score');
    res.send(scores);
});

app.use((_req, res) => {
    res.sendFile('index.html', {root: 'public'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// let games = {};
// let scores = {}; // this needs to be an object of gameScores: [scores] objects
// let highScores = {}; // this needs to be an object of gameScores: [highScores] objects

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