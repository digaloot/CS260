import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { CreateAccount } from './createAccount/createAccount';
import { People } from './people/people';
import { Dates } from './dates/dates';

export default function App() {

    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || ''); // this is the username / email address

    function logout() {
        fetch(`/api/auth/logout`, {
          method: 'delete',
        })
          .catch(() => {
            // Logout failed. Assuming offline
          })
          .finally(() => {
            localStorage.removeItem('userName');
            // props.onLogout();
          });
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
                                logout={logout}
                            />
                        } 
                        exact 
                    />
                    <Route 
                        path='/createAccount' 
                        element={
                            <CreateAccount 
                                setUserName={setUserName} 
                                logout={logout}
                            />
                        } 
                    />
                    <Route 
                        path='/people' 
                        element={
                            <People  
                                logout={logout}
                            />
                        } 
                    />
                    <Route 
                        path='/dates' 
                        element={
                            <Dates 
                            logout={logout}
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