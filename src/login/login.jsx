import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


export function Login({ setUserName, logout }) {

  const [users, setUsers] = React.useState([]);
  const [u, setU] = React.useState('');
  const [pw, setPW] = React.useState('');
  const [filterUsers, setFilterUsers] = React.useState({});
  const [noUser, setNoUser] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [displayWrongPW, setDisplayWrongPW] = useState(false);
  const navigate = useNavigate();

    function loginUser() {
        if(!wrongPassword && !noUser) {
            localStorage.setItem('userName', u);
            setUserName(u);
            navigate('/people')
        }
        else
            setDisplayWrongPW(true)
    }

    function uChange(e) {
        setU(e.target.value);
        setDisplayWrongPW(false)
    }
    function pwChange(e) {
        setPW(e.target.value);
        setDisplayWrongPW(false)
    }

    React.useEffect(() => {
      const usersText = localStorage.getItem('users');
      if (usersText) {
        setUsers(JSON.parse(usersText));
        setFilterUsers(JSON.parse(usersText));
      }
    }, []);

    React.useEffect(
        () => {
            if (users && u) {
                if (filterUsers.filter)  {
                handleUserFilter(undefined);
                }
            }
            if (users && pw) {
                if (filterUsers.filter)  {
                handlePWFilter(undefined);
                }
            }
        },
    ) 

    function handleUserFilter(event) {
        const filterData = filterUsers.filter(row => {return row.userName.toLowerCase() === u.toLowerCase()})
        if(!filterData.length) setNoUser(true)
        else setNoUser(false)
      }
      
    function handlePWFilter(event) {
        const filterData = filterUsers.filter(row => {return row.password.toLowerCase() === pw.toLowerCase()})
        if(!filterData.length) setWrongPassword(true)
        else setWrongPassword(false)
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
                    {/* <div>
                        {noUser && (
                            <div>
                                <p>Username does not exists.</p>
                            </div>
                        )}
                    </div> */}
                    <div>
                        {displayWrongPW && (
                            <div>
                                <p>Incorrect username or password.  Try again.</p>
                            </div>
                        )}
                    </div>
                    {/* { !noUser &&  u != '' && pw != '' && <NavLink to="/people"> */}
                        { u != '' && pw != '' && <button type="submit" className="btn btn-primary" onClick={loginUser}>
                            Login
                        </button>}
                    {/* </NavLink>} */}
                </div>
            </div>
        </div>
    </main>
  );
}