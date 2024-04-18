// websocket simulation
// for now, on a five-second interval
// randomly create a username and select a game from the user's games
// randomly decide to have that user add a random score or add the game

// const Game = window.Game;
// const GameSubmission = window.GameSubmission;
// const Score = window.Score;
// const ScoreSubmission = window.ScoreSubmission;

const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
socket.onmessage = async (event) => {
    // console.log("event")
    // console.log(event)
    const message = JSON.parse(await event.data.text());
    // console.log(message);
    // console.log(message.from)
    // console.log(message.type)
    // console.log(message.message)
    if (message.type === GameSubmission) {
        const game = new Game(message.value.title, message.value.year, message.value.publisher, message.value.description, message.value.thumbnail, message.value.image);
        console.log(game);
        game.displayMessage(message.from);
    }
    else if (message.type === ScoreSubmission) {
        // console.log(message.value)
        // console.log(message.value.score)
        const score = new Score(message.value.username, message.value.title, message.value.player, message.value.score, message.value.date, message.value.gameId);
        console.log(score);
        score.displayMessage();
    }

}



async function generateNotifications() {
    const response = await fetch('/api/allGames');
    const games = await response.json();

    // const userGames = JSON.parse(localStorage.getItem("userGames"))
    const userGames = Object.values(games);

    setInterval(() => {
        // randomly pick game or score based on 0 or 1 random number
        const decider = Math.round(Math.random());
        const usernameNum = Math.floor(Math.random() * 1000);
        const usernameString = "user" + usernameNum;

        const game = userGames[Math.floor(Math.random() * userGames.length)]
        const title = game ? game.title : "Unknown";

        if (decider === 1) {
            // add a notification for adding a game
            const listEl = document.getElementById("games-notifs-list");
            const newListEl = document.createElement('li');
            newListEl.textContent = `${usernameString} added ${title} to their games!`
            listEl.appendChild(newListEl);
        }
        else {
            // add a notification for adding a score
            const listEl = document.getElementById("scores-notifs-list");
            const score = Math.floor(Math.random() * 150);
            const newListEl = document.createElement('li');
            newListEl.textContent = `${usernameString} scored ${score} in ${title}!`
            listEl.appendChild(newListEl);
        }
    }, 5000);
}

// generateNotifications();