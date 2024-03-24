// this will be a placeholder for 3rd party API call for now
// when search, it will do that search on BGG's API and return their results
// I'll parse their XML into the game objects

async function search() {
    // this should just take whatever the user puts into the search bar 
    // then pass it to the BGG API
    // then parse the response into search results

    // for now it should take their search
    // then generate several possible game objects
    // also generates a new button object for each game

    const searchBarEl = document.querySelector("#search-bar");
    localStorage.setItem("searchValue", searchBarEl.value);
    
    let results = []
    // make up several games
    results.push(new Game("Wingspan", 2019, "Stonemaier Games", 
    "Attract a beautiful and diverse collection of birds to your wildlife preserve.",
    "https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__imagepage/img/uIjeoKgHMcRtzRSR4MoUYl3nXxs=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4458123.jpg"));
    
    results.push( new Game("Azul", 2017, "Next Move Games", 
    "Artfully embellish the walls of your palace by drafting the most beautiful tiles.",
    "https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__imagepage/img/uIjeoKgHMcRtzRSR4MoUYl3nXxs=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4458123.jpg"));
    
    results.push(new Game("7 Wonders", 2010, "Repos Production",
    "Draft cards to develop your ancient civilization and build its Wonder of the World.",
    "https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__imagepage/img/uIjeoKgHMcRtzRSR4MoUYl3nXxs=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4458123.jpg"))

    const tableBodyEl = document.querySelector('#results-table-body')

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
            addGameButtonEl.className="btn btn-primary";
            addGameButtonEl.onclick = "addGame()";
            addGameButtonEl.textContent = "Add";
            publisherTdEl.textContent = game.publisher;
            descriptionTdEl.textContent = game.description;

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
        tableBodyEl.innerHTML = '<tr><td colSpan=6>Search for a game</td></tr>';
    }

    // return new Promise((resolve) => {
    //     console.log('search pressed');
    //     resolve();
    // }
    // )
}

async function addGame() {
    // figure out how to get the button press value so I know where to pull the data from

    return new Promise((resolve) => {
        console.log('game added');
        resolve();
    }
    )
}

class Game {
    // a game object that can be created
    title;
    year;
    publisher;
    description;
    thumbnail;

    constructor(title, year, publisher, description, thumbnail) {
        this.title = title;
        this.year = year;
        this.publisher = publisher;
        this.description = description;
        this.thumbnail = thumbnail;
    }
}

// class Button {
//     constructor(el) {
//         this.el = el;
//     }

//     async press() {
//         return new Promise(async (pressResolve) => {
//             await this.addGame();
//             // TODO: change the button status to be greyed out and unclickable, and to say added
//             pressResolve();
//         });
//     }
// }