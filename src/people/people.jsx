import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Button from "react-bootstrap/Button";

export function People() {
  return (

    <main>
      <div className='header_text'>
        Joke of the day.  What do you call a dinosour that drives: "Tyrannosaurus Wrecks"
        <br/>
        <br/>
      </div>
      <div className='body_items'>
        <NavLink to="/">
            <button type="submit" className="btn btn-primary">
              Logout 
            </button>
          </NavLink>
      </div>
      <div className="title">My Important People</div> <br/>
      <form className="body_items" method="get" action="dates.html">
        <div>
          <img src="person.png" alt="person" width="100" height="100"/><br/>
          <div>Jane Doe</div>
          <div>jane@lovenotes.click</div>
          <div>Wife</div>
        </div>
        <div className="body_items">
          <NavLink to="/dates">
            <button type="submit" className="btn btn-primary">
              Dates 
            </button>
          </NavLink>
        </div>
      </form>
      <br/><br/><br/>
      
      <form className="body_items" method="get" action="dates.html" >
        <div id="picture">
          <img src="person.png" alt="person" width="100" height="100"/>
        </div>
        <div className="input-group mb-3">
          <div className="col-sm-2">
            <input className="name_box" type="text" placeholder="name" />
          </div>
        </div>
        <div className="input-group mb-3">
          <span>@  .</span>
          <input className="col-sm-2" type="text" placeholder="their@email.com" />
        </div>
        <div>
          <span>Relationship: </span>
          <select>
            <option defaultValue="Wife">Wife</option>
            <option value="Husband">Husband</option>
            <option value="Daughter">Daughter</option>
            <option value="Son">Son</option>
            <option value="Mother">Mother</option>
            <option value="Father">Father</option>
            <option value="Boss">Boss</option>
            <option value="Employee">Employee</option>
          </select>
        </div>
        <div className="body_items">
          <NavLink to="/dates">
            <button type="submit" className="btn btn-primary">
              Add 
            </button>
          </NavLink>
        </div>
      </form>
    </main>
  );
}