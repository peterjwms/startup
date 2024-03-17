function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Mystery player';
};


const usernameEl = document.querySelector('#username');
usernameEl.textContent = this.getPlayerName();

