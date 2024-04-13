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
    
    res.send(games);
});

// getScores
apiRouter.get('/scores', (_req, res) => {
    res.send(scores);
})

// addGame
apiRouter.post('/game', (req, res) => {
    console.log('game');
});

// addScore
apiRouter.post('/score', (req, res) => {
    console.log('score');
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