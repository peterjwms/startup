function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Mystery player';
};



// when the page loads in: 
// should get the player name, and display it
// should find the games associated with that player and display them
// should find the scores associated with each game and display the top 3
// 

function getPlayerScores(games) {
    // for each game the player has in their profile
    // get all the scores and keep just the first three


}

function loadProfile() {
    let games = JSON.parse(localStorage.getItem('userGames') || "[]");
    // want to use setAttribute("id", "wingspan-username") to set attributes and be able to access elements later
    for (const [i, gameName] of games.entries()) {
        console.log(gameName)
        let gameObject = JSON.parse(localStorage.getItem(gameName))
        console.log(gameObject);
        
        displayGame(gameObject);
        displayScores(gameObject);
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
    


    // generate some bogus scores here???
    // for each of three high scores
    //      create and append a row

    gameScoresTableContainer.appendChild(gameScoresTable);
    gameScoresTd.appendChild(gameScoresTableContainer);
    gameScoresRow.appendChild(gameScoresTd);
    gameTableBody.appendChild(gameScoresRow);
    gameTable.appendChild(gameTableBody);
    gameDiv.appendChild(gameTable);
    gamesContainer.appendChild(gameDiv);


}

function displayScores(game) {
    // get the scores, display the three highest in the localStorage
    // if they don't have three for a game, still insert the row, but with "-----" for each value
}

const usernameEl = document.querySelector('#username');
usernameEl.textContent = this.getPlayerName();
loadProfile();