const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');

// One collection for users and one for games
// User contains account, lists of game ids, scores, and high scores
// Game contains game information
const userCollection = db.collection('user');
const gameCollection = db.collection('game');


(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(username) {
  // Return the user object with matching username
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  // Return the user object with matching token
  return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
  // Basically the same as the simon-login example
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: hashedPassword,
    token: uuid.v4(),
    games: [], // list of game ids
    scores: [], // list of all scores associated with the user
    highScores: [] // list of the high scores associated with the user (filtered from scores when added)
  };

  await userCollection.insertOne(user);
  return user;
}

async function addGame(game, username) {
  // Add a game to the collection
  const existingGame = await gameCollection.findOne({ title: game.title });
  if (existingGame) {
    return userCollection.updateOne({ username: username }, { $push: { games: existingGame._id } });
  }
  else {
    gameCollection.insertOne(game);
    return userCollection.updateOne({ username: username }, { $push: { games: game._id } });
  }
}

function getGame(title) {
  // Return one game with matching title
  return gameCollection.findOne({ title: title });
}

async function getUserGames(username) {
  const user = await userCollection.findOne({ username: username }, { projection: { games: 1 } });
  if (user && user.games) {
    const userGameIds = user.games;
    return gameCollection.find({ _id: { $in: userGameIds } }).toArray();
  }
  else {
    return [];
  }
}

function getGames() {
  // Return all games in the collection - used for building profile
  return gameCollection.find().toArray();
}

function addScore(score) {
  // Add the score to the user's high scores, sorted and limited to top 3
  userCollection.updateOne(
    { username: score.username },
    {
      $push:
      {
        highScores:
        {
          $each: [{
            title: score.title,
            gameId: score.gameId,
            score: score.score,
            player: score.player,
            date: score.date
          }],
          $sort: { score: -1 },
          $slice: 3
        }
      }
    });
  // Add the score to the user's scores
  return userCollection.updateOne(
    { username: score.username },
    {
      $push:
      {
        scores:
        {
          title: score.title,
          gameId: score.gameId,
          score: score.score,
          player: score.player,
          date: score.date
        }
      }
    });
}

function getScores(username) {
  // Return all scores for a user
  return userCollection.findOne({ username: username }, { scores: 1 });
}

function getHighScores(username) {
  // Return all high scores for a user
  return userCollection.findOne({ username: username }, { highScores: 1 });
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addGame,
  getGame,
  getGames,
  getUserGames,
  addScore,
  getScores,
  getHighScores
};