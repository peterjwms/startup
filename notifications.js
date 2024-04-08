// websocket simulation
// for now, on a five-second interval
// randomly create a username and select a game from the user's games
// randomly decide to have that user add a random score or add the game

setInterval(() => {
    // randomly pick game or score based on 0 or 1 random number
    const decider = Math.round(Math.random());
    const usernameNum = Math.floor(Math.random() * 1000);
    const usernameString = "user" + usernameNum;
    const userGames = JSON.parse(localStorage.getItem("userGames"))
    const game = userGames[Math.floor(Math.random() * userGames.length)]

    if (decider === 1) {
        // add a notification for adding a game
        const listEl = document.getElementById("games-notifs-list");
        const newListEl = document.createElement('li');
        newListEl.textContent = `${usernameString} added ${game} to their games!`
        listEl.appendChild(newListEl);
    }
    else {
        // add a notification for adding a score
        const listEl = document.getElementById("scores-notifs-list");
        const score = Math.floor(Math.random() * 150);
        const newListEl = document.createElement('li');
        newListEl.textContent = `${usernameString} scored ${score} in ${game}!`
        listEl.appendChild(newListEl);
    }
}, 5000);