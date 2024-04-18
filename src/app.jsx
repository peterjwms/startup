import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { Score } from './score/score';
import { Notifications } from './notifications/notifications';
import { Search } from './search/search';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  // const root = ReactDOM.createRoot(document.getElementById('root'));
  return (
    <BrowserRouter>
      <div className='body bg-dark text-light'>
        <header className="container-fluid">
          <nav className="navbar fixed-top navbar-dark">
            <div className="navbar-brand">OnBoard</div>
            <menu className="navbar-nav">
              <li className='nav-item'>
                <NavLink to="" className="nav-link">
                  Login
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to="profile" className="nav-link">
                  Profile
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to="score" className="nav-link">
                  Score
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to="notifications" className="nav-link">
                  Activity
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to="search" className="nav-link">
                  Search
                </NavLink>
              </li>
            </menu>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/profile" element={<Profile />} />
          <Route path="/score" element={<Score />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>

        <footer className="container-fluid">
          <span className='text-reset'>Peter Williams</span>
          <a className='text-reset' href="https://github.com/peterjwms/startup" target="_blank">
            GitHub
          </a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}