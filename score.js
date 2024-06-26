const ScoreSubmission = 'scoreSubmission';

async function addScore() {
    // get the values for game, player, score, date, and username should already be in localStorage
    const gameNameField = document.getElementById("game-name-field");
    const playerNameField = document.getElementById("player-name-field");
    const scoreField = document.getElementById("score-field");
    const dateField = document.getElementById("date-field");
    const username = localStorage.getItem("userName");

    let form = document.getElementById("add-score-form");

    const ws = new ScoreSubmissionWS();

    let newScore = new Score(username, gameNameField.value.toLowerCase(), playerNameField.value,
        scoreField.value, dateField.value, "");

    // check if any of the values are null
    // if yes, then alert that that value needs to be filled
    // then just return so that the form is not reset
    // otherwise add the score, alert, and reset the form
    for (property in newScore) {
        if (property === "gameId") {
            continue;
        }
        if (newScore[property] === "") {
            alert(property.charAt(0).toUpperCase() + property.slice(1) + " missing");
            return;
        }
    }

    try {
        const response = await fetch(`/api/games/${username}`);
        const games = await response.json();
        // console.log(games);

        const inUserGames = games.some(game => game.title.toLowerCase() === gameNameField.value.toLowerCase());
        if (!inUserGames) {
            alert("Game not found in profile. Please add the game to your profile first.");
            return;
        }

        const gameId = games.find(game => game.title.toLowerCase() === gameNameField.value.toLowerCase())._id;
        newScore.gameId = gameId;
    }
    catch (error) {
        console.error(error);
    }

    // send back the new score to the server
    // take care of high scores on the server side
    try {
        const response = await fetch('/api/score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newScore),
        });
        // const scores = await response.json();

        if (!response.ok) {
            alert('Failed to add score');
        }
        else {
            ws.broadcastEvent(username, ScoreSubmission, newScore);
            alert('Score added!');
            form.reset();
        }

    }
    catch (error) {
        console.error(error);
        // if the fetch fails, then just add the score to localStorage
        let gameScoresKey = gameNameField.value.toLowerCase() + "Scores";
        let userScores = JSON.parse(localStorage.getItem(gameScoresKey) || "[]");
        userScores.push(newScore);
        localStorage.setItem(gameScoresKey, JSON.stringify(userScores));

        // if the score is higher than the top 3 scores, then
        // insert the new score, sort, and then slice it
        // so that only the top 3 scores are shown
        let gameHighScoresKey = gameNameField.value.toLowerCase() + "HighScores";
        let gameHighScores = JSON.parse(localStorage.getItem(gameHighScoresKey) || "[]");

        gameHighScores.push(newScore);
        gameHighScores.sort((score1, score2) => score2.score - score1.score); // sort in descending order, so highest is first
        if (gameHighScores.length > 3) {
            gameHighScores.pop()
        }
        localStorage.setItem(gameHighScoresKey, JSON.stringify(gameHighScores))

        alert('Score added!');
        form.reset();

    }

}

class Score {
    title;
    gameId;
    username;
    player;
    score;
    date;

    constructor(username, title, player, score, date, gameId) {
        this.username = username;
        this.title = title;
        this.player = player;
        this.score = score;
        this.date = date;
        this.gameId = gameId;
        
    }
}
class ScoreSubmissionWS {
    constructor() {
        this.socketOpenPromise = this.configureWebSocket();
    }

    configureWebSocket() {
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        this.socket = new WebSocket(`${protocol}://${window.location.host}`);

        return new Promise((resolve, reject) => {
            this.socket.onopen = () => resolve();
            this.socket.onerror = (err) => reject(err);
        });
    }

    async displayMessage(score) {
        const listEl = document.getElementById("scores-notifs-list");
        const newListEl = document.createElement('li');

        const response = await fetch(`/api/allGames`);
        const games = await response.json();
        const capsTitle = games.find(game => game._id === score.gameId).title;
        // console.log(capsTitle);

        newListEl.textContent = `${score.username} scored ${score.score} in ${capsTitle}!`
        listEl.appendChild(newListEl);
    }

    async broadcastEvent(from, type, value) {
        const event = {
            from: from,
            type: type,
            value: value
        };
        try {
            await this.socketOpenPromise;
            this.socket.send(JSON.stringify(event));
        }
        catch (error) {
            console.error(error);
        }
        
    }

}


// TODO: set the game name from the profile page, depending on which one was clicked
let urlParams = new URLSearchParams(window.location.search);
let gameTitle = urlParams.get('game');

let gameField = document.getElementById("game-name-field");
if (gameField) {
    gameField.value = decodeURIComponent(gameTitle);
}


window.Score = Score;
window.ScoreSubmission = ScoreSubmission;