import React from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import Button from "react-bootstrap/Button";


export function Login() {
  return (
    <main className='container-fluid bg-secondary text-center'>
        <div className="row">
            <div className="column">
                <div className="left_half">
                    <p className="lovenotes">
                        Love<br />
                        Notes
                    </p>
                    <p class="introduction">
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
                            <li><NavLink to="createAccount">Create Account</NavLink></li>
                        </menu>
                    </nav>
                    <br/>
                    <div className="right_half_title">
                        Login
                    </div>
                    <p className="assignment">Don't have an account? <NavLink to="createAccount">Create one</NavLink>!</p>
                    <div className="input-group mb-3">
                        <span className="input-group-text">@</span>
                        <input className="form-control" type="text" placeholder="your@email.com" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">🔒</span>
                        <input className="form-control" type="password" placeholder="password" />
                    </div>
                    <NavLink to="/people">
                        <button type="submit" className="btn btn-primary">
                            People 
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    </main>
  );
}