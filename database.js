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
  return userCollection.findOne({email: email});
}

function getUserByToken(token) {
  return userCollection.findOne({token: token});
}

async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: hashedPassword,
    token: uuid.v4(),
    games: [],
    scores: [],
    highScores: []
  };
  await userCollection.insertOne(user);
  return user;
}

function addGame(game) {
  return gameCollection.insertOne(game);
}

function getGame(title) {
  return gameCollection.findOne({title: title});
}

