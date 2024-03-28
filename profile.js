function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Mystery player';
};




// when the page loads in: 
// should get the player name, and display it
// should find the games associated with that player and display them
// should find the scores associated with each game and display the top 3
// 

function getPlayerGames() {
    // this should pull from the database - for now generate the data, and pull it from localStorage
    let games = [];
    const gamesText = localStorage.getItem('userGames');
    if (gamesText) {
        games = JSON.parse(gamesText);
    }
    
    return games
}

function getPlayerScores(games) {
    // for each game the player has in their profile
    // get all the scores and keep just the first three


}

function loadProfile() {
    let games = getPlayerGames();


    // want to use setAttribute("id", "wingspan-username") to set attributes and be able to access elements later

}

const usernameEl = document.querySelector('#username');
usernameEl.textContent = this.getPlayerName();
loadProfile();