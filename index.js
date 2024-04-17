const express = require('express');
const app = express();
const DB = require('./database.js');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

// const {peerProxy} = require('./peer-proxy.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

app.set('trust proxy', true);

const apiRouter = express.Router();
app.use('/api', apiRouter);

// finish making the user/auth routes
// create a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.username)) {
        res.status(409).send({ message: 'User already exists' });
        return;
    }
    else if (req.body.username.length < 3 || req.body.password.length < 3) {
        res.status(400).send({ message: 'Username and password must be at least 3 characters' });
        return;
    }
    else {
        const user = await DB.createUser(req.body.username, req.body.password);
        setAuthCookie(res, user.token);

        res.send({
            id: user._id,
        });
    }
});

// login
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            setAuthCookie(res, user.token);
            res.send({ id: user._id });
            return;
        }
    }
    res.status(401).send({ message: 'Unauthorized' });
});

// logout
apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// get user
apiRouter.get('/user/:username', async (req, res) => {
    const user = await DB.getUser(req.params.username);
    if (user) {
        const token = req?.cookies.token;
        res.send({ username: user.username, authenticated: token === user.token });
        return;
    }
    res.status(404).send({ message: 'Unknown' });
});

const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
        next();
    }
    else {
        res.status(401).send({ message: 'Unauthorized' });
    }
});

// getUserGames
secureApiRouter.get('/games/:username', async (req, res) => {
    // this should get all the games the user has in their profile - as object ids
    const userGames = await DB.getUserGames(req.params.username);
    console.log(userGames);
    res.send(userGames);
});

// getAllGames
secureApiRouter.get('/allGames', async (_req, res) => {
    // this should get all the games in the database
    const games = await DB.getGames();
    res.send(games);
});

// getScores
secureApiRouter.get('/scores/:username', async (req, res) => {
    // this should get the scores as an array, same as it was before
    const scores = await DB.getScores(req.params.username);
    res.send(scores);
})

// getHighScores
secureApiRouter.get('/highScores/:username', async (req, res) => {
    // this should get all the high scores associated with the user
    const highScores = await DB.getHighScores(req.params.username);
    // console.log(highScores);
    // console.log(highScores["highScores"]);
    // const actualHighScores = highScores["highScores"];
    if (highScores && highScores["highScores"]) {
        res.send(highScores["highScores"]);
    }
    else {
        res.send([]);
    }

})

// addGame
secureApiRouter.post('/game/:username', async (req, res) => {
    // console.log(req.body);
    const game = req.body;
    const title = game.title.toLowerCase();

    const games = await DB.addGame(game, req.params.username);
    res.send(games);
});

// addScore
secureApiRouter.post('/score', async (req, res) => {
    const score = req.body;
    const title = score.title.toLowerCase();

    const scores = await DB.addScore(score);
    res.send(scores);
});

app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, token) {
    res.cookie(authCookieName, token, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

peerProxy(httpService);