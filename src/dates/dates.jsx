import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Button from "react-bootstrap/Button";

export function Dates() {

    const [msg, setMsg] = React.useState('...listening');
  
    React.useEffect(() => {
      setInterval(() => {
        const names = [
          'Christmas', 
          'Anniversary', 
          'Birthday',
          'New Years'
        ];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const newMsg = `${randomName}`;
        setMsg(newMsg);
      }, 400000);
    })
  
  
  return (
    <main className='body_items'>
      <div className='header_text'>
      Fun fact.  The most frequently selected Important Date is: {msg}
        <br/>
        <br/>
      </div>
      <div className='body_items'>
        <NavLink to="/people">
          <button type="submit" className="btn btn-primary">
          Back to My Important People 
          </button>
        </NavLink>
      </div>
      <div className="title">Important Dates</div> <br/>
      <table><tbody>
        <tr className="heading">
          <th>Importance</th>
          <th>Next Date</th>
        </tr>
        <tr className="body_items">
          <td>Christmas</td>
          <td>12/25/2025</td>
        </tr>
        <tr className="body_items">
          <td>New Years</td>
          <td>1/1/2026</td>
        </tr>
        <tr className="body_items">
          <td>
            <select>
              <option value="Anniversary">
                Anniversary
              </option>
              <option value="birthday">
                Birthday
              </option>
              <option value="Christmas">
                Christmas
              </option>
            </select>
          </td>
          <td>    
            <div>
              <input className="form-control" type="date" id="Test_DatetimeLocal" />
              </div>
          </td>
        </tr>
      </tbody></table>
      <br/>
      <div className="body_items">
        <NavLink to="/dates">
          <button type="submit" className="btn btn-primary">
            Add 
          </button>
        </NavLink>
      </div>
    </main>
  );
}