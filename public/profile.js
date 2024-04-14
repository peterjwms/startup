function getPlayerName() {
    let userName = localStorage.getItem('userName');
    if (userName === null || userName === "") {
        userName = "Unknown user";
        localStorage.setItem('userName', userName);
    }
    return userName;
};


// when the page loads in: 
// should get the player name, and display it
// should find the games associated with that player and display them
// should find the scores associated with each game and display the top 3

function displayScores(gameHighScores, game) {
    // let gameHighScoresKey = game.title.toLowerCase() + "HighScores";
    // let gameHighScores = JSON.parse(localStorage.getItem(gameHighScoresKey) || "[]")
    // if the gameHighScores are not already defined, then get them from localStorage
    if (gameHighScores === undefined) {
        gameHighScores = JSON.parse(localStorage.getItem(game.title.toLowerCase() + "HighScores") || "[]");
    }
    
    // the table that everything gets attached to
    const gameScoresTd = document.getElementById(game.title + "-scores-table");

    const gameScoresTableBody = document.createElement('tbody');

    for (const [i, score] of gameHighScores.entries()) {
        // for each score, up to 3 (which should be regulated in the addScore function)
        // create the necessary score row in the DOM
        // create a row, and then all the td elements
        // need to account for edge case where there are no scores added, so should just have three rows of ----
        const scoreRow = document.createElement('tr');

        const scoreCountTd = document.createElement('td');
        const scoreUsernameTd = document.createElement('td');
        const scorePlayerNameTd = document.createElement('td');
        const scoreScoreTd = document.createElement('td');
        const scoreDateTd = document.createElement('td');

        scoreCountTd.textContent = String(i + 1);
        scoreUsernameTd.textContent = score.username;
        scorePlayerNameTd.textContent = score.player;
        scoreScoreTd.textContent = score.score;
        scoreDateTd.textContent = score.date;

        scoreRow.appendChild(scoreCountTd);
        scoreRow.appendChild(scoreUsernameTd);
        scoreRow.appendChild(scorePlayerNameTd);
        scoreRow.appendChild(scoreScoreTd);
        scoreRow.appendChild(scoreDateTd);

        gameScoresTableBody.appendChild(scoreRow);
    }

    for (let i=0; i < (3 - gameHighScores.length); i++) {
        const scoreRow = document.createElement('tr');

        const scoreCountTd = document.createElement('td');
        const scoreUsernameTd = document.createElement('td');
        const scorePlayerNameTd = document.createElement('td');
        const scoreScoreTd = document.createElement('td');
        const scoreDateTd = document.createElement('td');

        scoreCountTd.textContent = String(i + gameHighScores.length + 1);
        scoreUsernameTd.textContent = "--------";
        scorePlayerNameTd.textContent = "------";
        scoreScoreTd.textContent = "---";
        scoreDateTd.textContent = "------";

        scoreRow.appendChild(scoreCountTd);
        scoreRow.appendChild(scoreUsernameTd);
        scoreRow.appendChild(scorePlayerNameTd);
        scoreRow.appendChild(scoreScoreTd);
        scoreRow.appendChild(scoreDateTd);

        gameScoresTableBody.appendChild(scoreRow);
    }    

    gameScoresTd.appendChild(gameScoresTableBody);


}

async function loadProfile() {
    let games = [];
    try {
        const response = await fetch('/api/games');
        games = await response.json();
        console.log(games);

        const response2 = await fetch('/api/highScores');
        console.log(response2);
        const highScores = await response2.json();
        console.log(highScores);
        
        games.forEach(game => {
            displayGame(game);
            console.log(game);
            console.log(game.title.toLowerCase());
            const gameHighScores = highScores[game.title.toLowerCase()];
            console.log(gameHighScores);
            displayScores(gameHighScores, game);
        });

        localStorage.setItem('userGames', JSON.stringify(games));
    }
    catch (error) {
        console.error(error);

        // use the localStorage if fetch fails
        games = JSON.parse(localStorage.getItem('userGames') || "[]");
        
        games.forEach(game => {
        
            let gameObject = JSON.parse(localStorage.getItem(game));
    
            displayGame(gameObject);
            displayScores(undefined, gameObject);
        });
    }        
}

function displayGame(game) {
    const gamesContainer = document.getElementById('games-container');

    const gameDiv = document.createElement('div');
    gameDiv.setAttribute('id', game.title)

    const gameTable = document.createElement('table');

    const gameTableHead = document.createElement('thead');
    const gameTitleRow = document.createElement('tr');
    const gameTitleEl = document.createElement('th');
    gameTitleEl.textContent = game.title

    gameTitleRow.appendChild(gameTitleEl);
    gameTableHead.appendChild(gameTitleRow);
    gameTable.appendChild(gameTableHead);

    const gameTableBody = document.createElement('tbody');
    const gameImageRow = document.createElement('tr');
    const gameImageTd = document.createElement('td');
    const gameImageEl = document.createElement('img');
    gameImageEl.src = game.thumbnail

    gameImageTd.appendChild(gameImageEl);
    gameImageRow.appendChild(gameImageTd);
    gameTableBody.appendChild(gameImageRow);

    const gameScoreHeaderRow = document.createElement('tr');
    const gameScoreHeaderTd = document.createElement('td');
    gameScoreHeaderTd.className = 'score-header';
    const gameScoreHeader = document.createElement('span');
    gameScoreHeader.textContent = 'Scores';
    const addScoreLinkEl = document.createElement('a');
    addScoreLinkEl.href = "score.html";
    addScoreLinkEl.textContent = "Add score";

    gameScoreHeaderTd.appendChild(gameScoreHeader);
    gameScoreHeaderTd.appendChild(addScoreLinkEl);
    gameScoreHeaderRow.appendChild(gameScoreHeaderTd);
    gameTableBody.appendChild(gameScoreHeaderRow);

    const gameScoresRow = document.createElement('tr');
    const gameScoresTd = document.createElement('td');
    gameScoresTd.id = game.title + "-scores";
    const gameScoresTableContainer = document.createElement('div');
    gameScoresTableContainer.className = 'table-responsive';

    const gameScoresTable = document.createElement('table');
    gameScoresTable.className = "table table-bordered";
    gameScoresTable.id = gameScoresTd.id + "-table"

    const gameScoresTableHead = document.createElement('thead');
    const gameScoresHeadRow = document.createElement('tr');
    const numberEl = document.createElement('th');
    numberEl.textContent = "#";
    const usernameEl = document.createElement('th');
    usernameEl.textContent = "Username";
    const playerNameEl = document.createElement('th');
    playerNameEl.textContent = "Name";
    const scoreEl = document.createElement('th');
    scoreEl.textContent = "Score";
    const dateEl = document.createElement('th');
    dateEl.textContent = "Date";

    gameScoresHeadRow.appendChild(numberEl);
    gameScoresHeadRow.appendChild(usernameEl);
    gameScoresHeadRow.appendChild(playerNameEl);
    gameScoresHeadRow.appendChild(scoreEl);
    gameScoresHeadRow.appendChild(dateEl);
    gameScoresTableHead.appendChild(gameScoresHeadRow);
    gameScoresTable.appendChild(gameScoresTableHead);

    gameScoresTableContainer.appendChild(gameScoresTable);
    gameScoresTd.appendChild(gameScoresTableContainer);
    gameScoresRow.appendChild(gameScoresTd);
    gameTableBody.appendChild(gameScoresRow);
    gameTable.appendChild(gameTableBody);
    gameDiv.appendChild(gameTable);
    gamesContainer.appendChild(gameDiv);


}

const usernameEl = document.querySelector('#username');
usernameEl.textContent = this.getPlayerName();
loadProfile();