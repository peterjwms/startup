async function search() {
    // this should just take whatever the user puts into the search bar 
    // then pass it to the BGG API
    // then parse the response into search results and add buttons to add the game to the user's profile if not already there

    const searchBarEl = document.querySelector("#search-bar");
    const searchKey = searchBarEl.value;
    localStorage.setItem("searchValue", searchKey);

    // clear the table
    const tableBodyEl = document.querySelector('#results-table-body')
    while (tableBodyEl.firstChild) {
        tableBodyEl.firstChild.remove()
    }

    // third-party API calls
    const searchIds = await getSearchIds(searchKey);
    const results = await getGameData(searchIds);

    let userGames = []

    // TODO: get the user's games from the server, if fails, check localStorage
    try {
        const response = await fetch(`/api/games/${localStorage.getItem("userName")}`);
        userGames = await response.json();
    }
    catch (error) {
        console.error(error);
        userGames = JSON.parse(localStorage.getItem('userGames') || "[]");
    }

    // then add all the elements
    if (results.length) {
        for (const [i, game] of results.entries()) {
            const thumbnailTdEl = document.createElement('td');
            const thumbnailImgEl = document.createElement('img');
            const nameTdEl = document.createElement('td');
            const yearTdEl = document.createElement('td');
            const addGameTdEl = document.createElement('td');
            const addGameButtonEl = document.createElement('button');
            const publisherTdEl = document.createElement('td');
            const descriptionTdEl = document.createElement('td');

            thumbnailImgEl.src = game.thumbnail;
            nameTdEl.textContent = game.title;
            yearTdEl.textContent = game.year;
            publisherTdEl.textContent = game.publisher;
            descriptionTdEl.textContent = game.description;

            addGameButtonEl.className = "btn btn-primary";
            addGameButtonEl.id = game.title + "-add-button"
            addGameButtonEl.setAttribute("onclick", "addGame(" + JSON.stringify(game) + ", this.id)");
            addGameButtonEl.textContent = "Add";
            // check if the game is in localStorage already - if so, disable the button
            game.title.toLowerCase() in userGames ? addGameButtonEl.disabled = true : addGameButtonEl.disabled = false;

            const rowEl = document.createElement('tr');

            thumbnailTdEl.appendChild(thumbnailImgEl)
            rowEl.appendChild(thumbnailTdEl);
            rowEl.appendChild(nameTdEl);
            rowEl.appendChild(yearTdEl);
            addGameTdEl.appendChild(addGameButtonEl);
            rowEl.appendChild(addGameTdEl);
            rowEl.appendChild(publisherTdEl);
            rowEl.appendChild(descriptionTdEl);

            tableBodyEl.appendChild(rowEl);

        }
    }
    else {
        tableBodyEl.innerHTML = '<tr><td colSpan=6>No results found</td></tr>';
    }

}

async function getSearchIds(searchKey) {
    // Fetch the XML data from the external API
    const response = await fetch('https://boardgamegeek.com/xmlapi2/search?query=' + searchKey + '&type=boardgame');
    const xmlString = await response.text();

    // Parse the XML string into a DOM tree
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    // Extract data from the XML document
    const gameNodes = xmlDoc.getElementsByTagName('item');
    let searchIds = [];
    for (let i = 0; i < gameNodes.length; i++) {
        const id = gameNodes[i].getAttribute('id');
        searchIds.push(id);
    };

    return searchIds;
}

async function getGameData(searchIds) {
    const response = await fetch('https://boardgamegeek.com/xmlapi2/thing?id=' + searchIds.join(','));
    const xmlString = await response.text();

    // Parse the XML string into a DOM tree
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    // Extract data from the XML document
    const gameNodes = xmlDoc.getElementsByTagName('item');
    let boardGameResults = [];
    let allOtherResults = [];

    // for each game node, create a game object and add it to the results array
    for (let i = 0; i < gameNodes.length; i++) {
        const gameNode = gameNodes[i];
        const type = gameNode.getAttribute('type');
        const title = gameNode.querySelector('name')?.getAttribute('value') || 'Unknown';
        const year = gameNode.querySelector('yearpublished')?.getAttribute('value') || 'Unknown';
        const publisher = gameNode.querySelector('boardgamepublisher')?.textContent || 'Unknown';
        let description = gameNode.querySelector('description')?.textContent || 'Unknown';
        description = decodeHtml(description);
        const thumbnail = gameNode.querySelector('thumbnail')?.textContent;
        const image = gameNode.querySelector('image')?.textContent;

        const game = new Game(title, year, publisher, description, thumbnail, image);
        type === 'boardgame' ? boardGameResults.push(game) : allOtherResults.push(game);
    }

    return [...boardGameResults, ...allOtherResults];
}

async function addGame(gameString, id) {
    // figure out how to get the button press value so I know where to pull the data from

    let games = [];

    try {
        const response = await fetch(`/api/game/${localStorage.getItem("userName")}`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(gameString),
        });

        const games = await response.json();
        localStorage.setItem('userGames', JSON.stringify(games));
    }
    catch (error) {
        console.error(error);
        games = JSON.parse(localStorage.getItem('userGames'));

        games.push(gameString.title)
        games.sort()

        localStorage.setItem(gameString.title, JSON.stringify(gameString));
        localStorage.setItem('userGames', JSON.stringify(games));
    }

    //TODO: maybe adjust this so it's more efficient than sorting every time

    addGameButtonEl = document.getElementById(id);
    addGameButtonEl.disabled = true;

}

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

class Game {
    // a game object that can be created
    title;
    year;
    publisher;
    description;
    thumbnail;
    image;

    constructor(title, year, publisher, description, thumbnail, image) {
        this.title = title;
        this.year = year;
        this.publisher = publisher;
        this.description = description;
        this.thumbnail = thumbnail;
        this.image = image;
    }
}