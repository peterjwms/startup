import React from 'react';
import './profile.css'
import { Link, NavLink } from 'react-router-dom';

export function Profile() {

    const [games, setGames] = React.useState([]);
    const [username, setUsername] = React.useState('');
    const [highScores, setHighScores] = React.useState([]);

    function getPlayerName() {
        let userName = localStorage.getItem('userName');
        if (userName === null || userName === "") {
            userName = "Unknown user";
            localStorage.setItem('userName', userName);
        }
        return userName;
    };


    // update player name
    React.useEffect(() => {
        setUsername(getPlayerName());
    });

    // get games
    React.useEffect(() => {
        fetch(`/api/games${username}`)
            .then(response => response.json())
            .then(games => {
                const sortedGames = Object.values(games).sort((a, b) => a.title.localeCompare(b.title));
                setGames(sortedGames);
                localStorage.setItem('userGames', JSON.stringify(games));
            })
            .catch(error => {
                console.error(error);
                const games = JSON.parse(localStorage.getItem('userGames') || "[]");
                const sortedGames = Object.values(games).sort((a, b) => a.title.localeCompare(b.title));
                setGames(sortedGames);
            });
    }, []);

    // get high scores
    React.useEffect(() => {
        fetch(`/api/highScores${username}`)
            .then(response => response.json())
            .then(highScores => {
                setHighScores(highScores);
            })
            .catch(error => {
                console.error(error);
                const highScores = JSON.parse(localStorage.getItem('highScores') || "[]");
                setHighScores(highScores);
            });
    }, []);

    const gameElements = [];
    games.forEach(game => {
        const gameHighScores = highScores.filter(score => score.gameId === game._id);
        gameHighScores.sort((a, b) => b.score - a.score);

        const highScoreElements = gameHighScores.map((score, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{getPlayerName()}</td>
                    <td>{score.player}</td>
                    <td>{score.score}</td>
                    <td>{score.date}</td>
                </tr>
            );
        });

        gameElements.push(
            <div key={game.title}>
                <table>
                <thead>
                    <tr>
                        <th>{game.title}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="img-td">
                            <img src={game.image} alt={game.title} />
                        </td>
                    </tr>
                    <tr>
                        <td className='score-header'>
                            <span>High Scores</span>
                            <Link to={`/score?game=${game.title}`}>Add score</Link>
                        </td>
                    </tr>
                    <tr>
                        <td key={`${game.title}-scores`}>
                            <div className="table-responsive">
                                <table key={`${game.title}-scores-table`} className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Username</th>
                                            <th>Name</th>
                                            <th>Score</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {highScoreElements}
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        );
    });



    return (
        <main className="container-fluid">
            <div id="header-container" className="container-fluid">
                <div id="add-games-container">
                    <div id="games-header">Your Games</div>
                    <Link to="/search">Add game</Link>
                </div>
                <div id="username-container">User: <span id="username"></span></div>
            </div>
            <hr id="separator"></hr>
            <div id="games-container">
                {gameElements}
            </div>

        </main>
    );
}