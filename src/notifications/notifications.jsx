import React from 'react';
import './notifications.css';

export function Notifications() {
  return (
    <main className="container-fluid">
        <div id="activity-holder">
            <div id="games-notifs">
                <h1>Games</h1>
                <hr></hr>
                <ul id="games-notifs-list">
                </ul>
            </div>
            <div id="scores-notifs">
                <hr></hr>
                <h1>Scores</h1>
                <hr></hr>
                <ul id="scores-notifs-list">
                </ul>
                <hr></hr>
            </div>
        </div>
    </main>
  );
}