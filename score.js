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
    // for (el in form.elements) {
    //     console.log(el);
    //     console.log(el.nodeValue);
    // }
    console.log(gameNameField.value.toLowerCase())
    console.log(gameNameField.value.toLowerCase() + "Scores")
    let gameScoresKey = gameNameField.value.toLowerCase() + "Scores"
    // make this instead an array of scores for that game specifically
    let userScores = JSON.parse(localStorage.getItem(gameScoresKey) || "[]");

    let newScore = new Score(username, gameNameField.value, playerNameField.value,
        scoreField.value, dateField.value);

    // check if any of the values are null
    // if yes, then alert that that value needs to be filled
    // then just return
    // otherwise add the score, alert, and reset the form
    for (property in newScore) {
        // console.log(property)
        if (newScore[property] === "") {
            alert(property.charAt(0).toUpperCase() + property.slice(1) + " missing");
            return;
        }
    }

    // update the array of scores for that game in localStorage
    userScores.push(newScore);
    localStorage.setItem(gameScoresKey, JSON.stringify(userScores));

    // insert the new score, sort, and then slice it
    let gameHighScoresKey = gameNameField.value.toLowerCase() + "HighScores";
    console.log(gameHighScoresKey)
    let gameHighScores = JSON.parse(localStorage.getItem(gameHighScoresKey) || "[]");

    gameHighScores.push(newScore);
    gameHighScores.sort((score1, score2) => score2.score - score1.score); // sort in descending order, so highest is first
    if (gameHighScores.length > 3) {
        gameHighScores.pop()
    }
    localStorage.setItem(gameHighScoresKey, JSON.stringify(gameHighScores))

    alert("Score added!")
    form.reset()

    
    
    
    // TODO: maybe also keep separate arrays of the top three scores for each game
    // would keep it from needing to be sorted each time, and adds only a little space
    // then could just access that from the profile, and if not three scores, then add -----

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