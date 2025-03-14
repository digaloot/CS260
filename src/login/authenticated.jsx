import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('password');
    props.onLogout();
  }

  return (
    <div>
      <div className='userName'>{props.userName}</div>
      <Button variant='primary' onClick={() => navigate('/people')}>
        People
      </Button>
      <Button variant='secondary' onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
