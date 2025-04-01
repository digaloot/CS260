import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';

export function CreateAccount({setUserName, logout}) {

  const [users, setUsers] = React.useState([]);
  const [filterUsers, setFilterUsers] = React.useState({});
  const [n, setN] = React.useState('');
  const [u, setU] = React.useState('');
  const [pw, setPW] = React.useState('');
  const [pwc, setPWConfirm] = React.useState('');
  const state = location.state;
  const [isVisible, setIsVisible] = useState(false);

  function nChange(e) {
    setN(e.target.value);
  }

  function uChange(e) {
    setU(e.target.value);
  }

  function pwChange(e) {
        setPW(e.target.value);
  }

  function pwChangeConfirm(e) {
    setPWConfirm(e.target.value);
  }

  async function saveUser() {
    const newUser = { myName: n, userName: u, password: pw };
    updateUsersLocal(newUser);
    setUsers([...users, newUser]);
    localStorage.setItem('userName', u);
    setUserName(u);
  }

  function updateUsersLocal(newUser) {
    let users = [];
    const usersText = localStorage.getItem('users');
    if (usersText) {
      users = JSON.parse(usersText);
    }
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
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
            handleFilter(undefined);
          }
        }
      },
    ) 

    function handleFilter(event) {
      const filterData = filterUsers.filter(row => {return row.userName.toLowerCase() === u.toLowerCase()})
      if(filterData.length) setIsVisible(true)
      else setIsVisible(false)
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
                <li ><NavLink onClick={logout} to="/">Login</NavLink></li>
                <li><NavLink to="">Create Account</NavLink></li>
              </menu>
            </nav>
            <br/>
            <div className="right_half_title">
              Create an account
            </div>
            <p className="assignment">Create your account, it takes less than a minute.  If you already have an account, <NavLink  onClick={logout} to='/'>login</NavLink>!  All fields are required.  Passwords must match.</p>
            <div className="input-group mb-3">
              <input className="form-control" type="text" onChange={nChange} placeholder="your name" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">@</span>
                <input className="form-control" type="username" onChange={uChange} placeholder="your@email.com" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">🔒</span>
                <input className="form-control" type="password" onChange={pwChange} placeholder="password" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">🔒</span>
                <input className="form-control" type="password" onChange={pwChangeConfirm} placeholder="confirm password" />
            </div>
            <div>
              {isVisible && (
                <div>
                  <p>Username already exists.</p>
                </div>
              )}
            </div>
            {!isVisible && n != '' && u != '' && pw != '' && pw === pwc && <NavLink to="/people">
              <button type="submit" className="btn btn-primary" onClick={saveUser}>
                Sign Up
              </button>
            </NavLink>}
          </div>
        </div>
      </div>
    </main>
  );
}