import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { CreateAccount } from './createAccount/createAccount';
import { People } from './people/people';
import { Dates } from './dates/dates';

export default function App() {
    const [name, setName] = React.useState(localStorage.getItem('name') || null);
    const [user, setUser] = React.useState(localStorage.getItem('user') || null);
    const [password, setPassword] = React.useState(localStorage.getItem('password') || null);
    return (
        <BrowserRouter>
            <div className='body bg-white text-black'>    

                <Routes>
                    <Route path='/' element={<Login setUser={setUser} setPassword={setPassword}/>} exact />
                    <Route path='/createAccount' element={<CreateAccount setName={setName} setUser={setUser} setPassword={setPassword}/>} />
                    <Route path='/people' element={<People  user={user} password={password}/>} />
                    <Route path='/dates' element={<Dates />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer>
                    <br/><br/>
                    <hr />
                    <span className="text-reset">Author's Name: Adam Gleason</span>
                    <br />
                    <a href="https://github.com/digaloot/CS260">GitHub</a><br /><br /><br />
                    <div id="picture" className="love_notes_jpg"><img src="LoveNotes.jpg" alt="LoveNotes"  width="100" height="100" /><br/></div>          
                </footer>
            </div>
        </BrowserRouter>
    );
    
    function NotFound() {
        return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
    }
}