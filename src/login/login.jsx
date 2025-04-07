import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthState } from "../authState";


export function Login({ logout, setAuthState, setUserName }) {

    const [e, setE] = React.useState('');
    const [pw, setPW] = React.useState('');
    const [displayWrongPW, setDisplayWrongPW] = useState(false);
    const navigate = useNavigate();
    // const [authState, setAuthState] = React.useState(currentAuthState);

    async function loginUser() {
        const response = await fetch(`/api/auth/login`, {
          method: 'post',
          headers: { 'Content-type': 'application/json; charset=UTF-8', },
          body: JSON.stringify({ email: e, password: pw }),
        });
        if (response?.status === 200) {
            setDisplayWrongPW(false);
            localStorage.setItem('userName', e);
            setAuthState(AuthState.Authenticated);
            setUserName(e);
            navigate("/people")
        } else {
            const body = await response.json();
            setDisplayWrongPW(true);
        }
      }
        
    function uChange(e) {
        setE(e.target.value);
        setDisplayWrongPW(false)
    }
    function pwChange(e) {
        setPW(e.target.value);
        setDisplayWrongPW(false)
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
                    <div>
                        {displayWrongPW && (
                            <div>
                                <p>Incorrect username or password.  Try again.</p>
                            </div>
                        )}
                    </div>
                    <button disabled={e == '' || pw == '' } type="submit" className="btn btn-primary" onClick={loginUser}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    </main>
  );
}