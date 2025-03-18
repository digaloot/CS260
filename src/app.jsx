import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { CreateAccount } from './createAccount/createAccount';
import { People } from './people/people';
import { Dates } from './dates/dates';

export default function App() {

    const [myName, setMyName] = React.useState(localStorage.getItem('myName') || ''); // this is the friendly name
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || ''); // this is the username / email address
    const [password, setPassword] = React.useState(localStorage.getItem('password') || '');


    function logout() {
        localStorage.removeItem("myName");
        localStorage.removeItem("userName");
        localStorage.removeItem("password");
        localStorage.removeItem("passwordC");
        props.onLogout();
    }

    return (
        <BrowserRouter>
            <div className='body bg-white text-black'>    

                <Routes>
                    <Route 
                        path='/' 
                        element={
                            <Login 
                                setUserName={setUserName} 
                                setPassword={setPassword}
                                logout={logout}
                            />
                        } 
                        exact 
                    />
                    <Route 
                        path='/createAccount' 
                        element={
                            <CreateAccount 
                                setMyName={setMyName}
                                setUserName={setUserName} 
                                setPassword={setPassword}
                            />
                        } 
                    />
                    <Route 
                        path='/people' 
                        element={
                            <People  
                                myName={myName} 
                                userName={userName} 
                                password={password}
                                logout={logout}
                            />
                        } 
                    />
                    <Route 
                        path='/dates' 
                        element={
                            <Dates 
                            />
                        } 
                    />
                    <Route 
                        path='*' 
                        element={
                            <NotFound 
                            />
                        }
                    />
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