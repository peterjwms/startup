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

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: hashedPassword,
    token: uuid.v4(),
    games: [],
    scores: [],
    highScores: []
  };
  await userCollection.insertOne(user);
  return user;
}

function addGame(game, username) {
  // Add a game to the collection
  userCollection.updateOne({ username: username }, { $push: { games: game._id } })
  return gameCollection.insertOne(game);
}

function getGame(title) {
  // Return one game with matching title
  return gameCollection.findOne({ title: title });
}

function getGames() {
  // Return all games
  return gameCollection.find().toArray();
}

function addScore(score) {
  // Add the score to the user's scores
  userCollection.updateOne(
    { username: score.username },
    {
      $push:
      {
        scores:
        {
          game: score.game._id,
          score: score.score,
          player: score.player,
          date: score.date
        }
      }
    });
  // Add the score to the user's high scores
  userCollection.findOneAndUpdate(
    { username: score.username },
    {
      $push:
      {
        highScores:
        {
          game: score.game._id,
          score: score.score,
          player: score.player,
          date: score.date
        }
      },
      $sort: {score: -1},
      $slice: 3
    }
  )
}

function getScores(username) {
  // Return all scores for a user
  return userCollection.findOne({ username: username }, { scores: 1 });
}

function getHighScores(username) {
  // Return all high scores for a user
  return userCollection.findOne({ username: username }, { highScores: 1 });
}