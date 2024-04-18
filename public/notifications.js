const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
socket.onmessage = async (event) => {
    
    const message = JSON.parse(await event.data.text());
    
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