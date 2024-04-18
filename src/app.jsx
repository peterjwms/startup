import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return (
        <div className='body bg-dark text-light'>
            <header className="container-fluid">
                <nav className="navbar fixed-top navbar-dark">
                    <div className="navbar-brand">OnBoard</div>
                    <menu className="navbar-nav">
                        <li className='nav-item'>
                            <a href="index.html" className="nav-link">
                                Home
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a href="profile.html" className="nav-link">
                                Profile
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a href="notifications.html" className="nav-link">
                                Activity
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a href="search.html" className="nav-link">
                                Search
                            </a>
                        </li>
                    </menu>
                </nav>
            </header>

            <main className='container-fluid'>App components will display here</main>

            <footer className="container-fluid">
                {/* <div className='container-fluid'> */}
                    <span className='text-reset'>Peter Williams</span>
                    <a className='text-reset' href="https://github.com/peterjwms/startup" target="_blank">
                        GitHub
                    </a>
                {/* </div> */}
            </footer>
        </div>
    );
}

