// take a score and all associated information
// should store it in localStorage for now
// probably have an array of scores for each game that includes an object for each score
// need to somehow sort through by score so just the highest scores are shown

async function addScore() {
    // get the values for game, player, score, date, and username should already be in localStorage
    console.log("adding score");
    const gameNameField = document.getElementById("game-name-field");
    const playerNameField = document.getElementById("player-name-field");
    const scoreField = document.getElementById("score-field");
    const dateField = document.getElementById("date-field");
    const username = localStorage.getItem("userName");

    let form = document.getElementById("add-score-form");
    for (el in form.elements) {
        console.log(el);
        console.log(el.nodeValue);
    }

    let userScores = JSON.parse(localStorage.getItem("userScores") || "[]");

    let newScore = new Score(username, gameNameField.value, playerNameField.value,
        scoreField.value, dateField.value);

    // newScore.

    userScores.push(newScore);

    // send an alert if they didn't fill out one of the values
    // then would need to keep the function open so that it can be filled
    //alert()

    localStorage.setItem('userScores', JSON.stringify(userScores));
    
    // once the score is successfully added, clear the fields - all of them? or all minus game?

}

class Score {
    title;
    player;
    username;
    score;
    date;

    constructor(username, title, player, score, date) {
        this.username = username;
        this.title = title;
        this.player = player;
        this.score = score;
        this.date = date;
    }

    // checkAllValues() {
    // could use this to make sure all values are non-null
    //     console.log('here');
    // }

}

// TODO: set the game name from the profile page, depending on which one was clicked
// 