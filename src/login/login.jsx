import React from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import Button from "react-bootstrap/Button";


export function Login({ setUserName, setPassword, logout }) {

        const [u, setU] = React.useState('');
        const [pw, setPW] = React.useState('');

    function loginUser() {
    // console.log('login' + text);
    localStorage.setItem('userName', u);
    localStorage.setItem('password', pw);
    setUserName(u);
    setPassword(pw);
  }

    function uChange(e) {
        setU(e.target.value);
        localStorage.setItem('userName', u);
        // console.log(e.target.value);
    }
    function pwChange(e) {
        setPW(e.target.value);
        localStorage.setItem('password', pw);
    }

  return (
    <main className='container-fluid bg-secondary text-center'>
        <div className="row">
            <div className="column">
                <div className="left_half">
                    <p className="lovenotes">
                        Love<br />
                        Notes
                    </p>
                    <p className="introduction">
                        Have you ever forgotten an important date? Anniversary, birthday, or something important to someone you care about? 
                        What if you could take just a few minutes to fill out a list of people you want reminders for. For each person, you 
                        fill out a list of dates for what is important about that person. Then on those dates, you get a reminder to tell them 
                        how much that day means to you. Better yet, you get a sample message that you can click to forward or you can edit or 
                        replace it before sending it to that important someone. You have a reminder each time that day comes around with a 
                        message sent from you to them and you have now been reminded yourself for in person conversations.
                    </p>
                </div>
            </div>
            <div className="column">
                <div className="right_half">
                    <nav>
                        <menu>
                            <li ><NavLink to="">Login</NavLink></li>
                            <li><NavLink onClick={logout} to="createAccount">Create Account</NavLink></li>
                        </menu>
                    </nav>
                    <br/>
                    <p className="assignment">Don't have an account? <NavLink onClick={logout} to="createAccount">Create one</NavLink>!</p>
                    <div className="input-group mb-3">
                        <span className="input-group-text">@</span>
                        <input className="form-control" type="username" onChange={uChange} placeholder="your@email.com" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">🔒</span>
                        <input className="form-control" type="password" onChange={pwChange} placeholder="password" />
                    </div>
                    {localStorage.getItem('userName') && localStorage.getItem('password') && <NavLink to="/people">
                        <button type="submit" className="btn btn-primary" onClick={loginUser}>
                            Login
                        </button>
                    </NavLink>}
                </div>
            </div>
        </div>
    </main>
  );
}