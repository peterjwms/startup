import React from 'react';

export function Score() {
  return (
    <main className="container-fluid">
            <h1>Add score</h1>
            <form id="add-score-form">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Game</span>
                    </div>
                    <input type="text" className="form-control" placeholder="Enter the name of a game" id="game-name-field"/>
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Player</span>
                    </div>
                    <input type="text" className="form-control" placeholder="Enter the player name" id="player-name-field"/>
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Score</span>
                    </div>
                    <input type="number" className="form-control" placeholder="Enter your score" id="score-field"/>
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Date</span>
                    </div>
                    <input className="form-control" type="date" id="date-field" />
                </div>
                <input type="button" className="btn btn-primary" onclick="addScore()" value="Submit"></input>
            </form>
        </main>
  );
}