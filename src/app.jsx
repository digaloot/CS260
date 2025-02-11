import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return (
        // <BrowserRouter>
            <div className='body bg-white text-black'>    
                <footer>
                    <br/><br/>
                    <hr />
                    <span className="text-reset">Author's Name: Adam Gleason</span>
                    <br />
                    <a href="https://github.com/digaloot/CS260">GitHub</a><br /><br /><br />
                    <div id="picture" className="love_notes_jpg"><img src="LoveNotes.jpg" alt="LoveNotes"  width="100" height="100" /><br/></div>          
                </footer>
            </div>
        // </BrowserRouter>
    );
    
}