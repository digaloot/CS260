import React from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';


// export function Login({setUser, setPassword}) {
export function Login({ userName, authState, onAuthChange }) {

    //     const [u, setU] = React.useState(' ');
    //     const [pw, setPW] = React.useState(' ');

    function logout() {
        // localStorage.removeItem("name");
        localStorage.removeItem("userName");
        // localStorage.removeItem("password");
        // localStorage.removeItem("passwordC");
        props.onLogout();
    }
    
    // function loginUser() {
    // // console.log('login' + text);
    // localStorage.setItem('user', u);
    // localStorage.setItem('password', pw);
    // setUser(u);
    // setPassword(pw);
    // }

    // function uChange(e) {
    //     setU(e.target.value);
    //     localStorage.setItem('user', u);
    //     // console.log(e.target.value);
    // }
    // function pwChange(e) {
    //     setPW(e.target.value);
    //     localStorage.setItem('password', pw);
    // }

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
                    {/* <div className="right_half_title">
                        Login
                    </div> */}

                    <div>
                        {authState !== AuthState.Unknown && <h1>Welcome to Love Notes</h1>}

                        {authState === AuthState.Authenticated && (
                            <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
                        )}

                        {authState === AuthState.Unauthenticated && (
                            <Unauthenticated
                                userName={userName}
                                onLogin={(loginUserName) => {
                                    onAuthChange(loginUserName, AuthState.Authenticated);
                                }}
                            />
                        )}
                    </div>





                    {/* <p className="assignment">Don't have an account? <NavLink onClick={clearCredentials} to="createAccount">Create one</NavLink>!</p>
                    <div className="input-group mb-3">
                        <span className="input-group-text">@</span>
                        <input className="form-control" type="username" onChange={uChange} placeholder="your@email.com" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">🔒</span>
                        <input className="form-control" type="password" onChange={pwChange} placeholder="password" />
                    </div> */}
                    {/* {localStorage.getItem('user') && localStorage.getItem('password') && <NavLink to="/people">
                        <button type="submit" className="btn btn-primary" onClick={loginUser}>
                            Login
                        </button>
                    </NavLink>} */}
                </div>
            </div>
        </div>
    </main>
  );
}