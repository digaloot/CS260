import React from 'react';
import { BrowserRouter, NavLink, useNavigate, Route, Routes, redirect } from 'react-router-dom';
import Button from "react-bootstrap/Button";

export function People({myName, userName, password}) {

  const navigate = useNavigate();

  const [nome, setNome] = React.useState(localStorage.getItem('nome') || ''); // this is their friendly name
  const [email, setEmail] = React.useState(localStorage.getItem('email') || '');
  const [relationship, setRelationship] = React.useState(localStorage.getItem('relationship') || '');
  const [people, setPeople] = React.useState([]);
  const [msg, setMsg] = React.useState('...listening');

  function logout() {
    localStorage.removeItem("myName");
    localStorage.removeItem("userName");
    localStorage.removeItem("password");
    localStorage.removeItem("passwordC");
    props.onLogout();
}

React.useEffect(() => {
    setInterval(() => {
      const names = [
        '  What do you call a dinosour that drives: "Tyrannosaurus Wrecks"..........Funny Score:', 
        '  What state is known for it\'s small drinks: "Minnesota"..........Funny Score:', 
        '  I told my wife she should embrace her mistakes.  She gave me a hug...........Funny Score:',
        '  What do you call a fake noodle?  "Impasta"..........Funny Score:',
        '  What did the big flower say to the little flower? "Hi Bud"..........Funny Score:',
        '  I went to buy some camouflage pants, but I could\'nt find any...........Funny Score:',
        '  I used to have a job at a calendar factory, but I got fired because I took a couple of days off...........Funny Score:'
      ];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCount = Math.floor(Math.random() * 100) + 1;
      const newMsg = `${randomName}  ${randomCount}`;
      setMsg(newMsg);
    }, 400000);
  })

  async function savePerson() {
    const newPerson = { nome: nome, email: email, relationship: relationship };
    updatePeopleLocal(newPerson);
  }

  function updatePeopleLocal(newPerson) {
    let people = [];
    const peopleText = localStorage.getItem('people');
    if (peopleText) {
      people = JSON.parse(peopleText);
    }

    // let found = false;
    // for (const [i, prevPerson] of people.entries()) {
    //   if (newPerson.person < prevPerson.person) {
    //     people.splice(i, 0, newPerson);
    //     found = true;
    //     break;
    //   }
    // }

    // if (!found) {
      people.push(newPerson);
    // }

    localStorage.setItem('people', JSON.stringify(people));
  }

  React.useEffect(() => {
    const peopleText = localStorage.getItem('people');
    if (peopleText) {
      setPeople(JSON.parse(peopleText));
    }
  }, []);

  const peopleRows = [];
  if (people.length) {
    for (const [i, person] of people.entries()) {
      peopleRows.push(
        <tr key={i}>
          {/* <td>{i}</td> */}
          <td>{person.nome.split('@')[0]}</td>
          <td>{person.email}</td>
          <td>{person.relationship}</td>
        </tr>
      );
    }
  } else {
    peopleRows.push(
      <tr key='0'>
        <td colSpan='4'>{myName} Add your first important person!</td>
      </tr>
    );
  }

  return (

    <main>
      <div className='header_text'>
        Joke of the day. {msg}
        <br/>
        <br/>
      </div>
      <div className='body_items'>
        <NavLink onClick={logout} to="/">
            <button type="submit" className="btn btn-primary">
              Logout 
            </button>
          </NavLink>
      </div>
      <div className="title">My Important People</div> <br/>
      <form className="body_items" method="get" action="dates.html" >
        <div id="picture">
          <img src="person.png" alt="person" width="100" height="100"/>To add a person to your table, fill in all boxes.
        </div>
        <div className="input-group mb-3">
          <div className="col-sm-2">
            <input className="name_box" type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="name" />
          </div>
        </div>
        <div className="input-group mb-3">
          <span>@  .</span>
          <input className="col-sm-2" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="their@email.com" />
        </div>
        <div>
          <span>Relationship: </span>
          <select 
            value={relationship} 
            onChange={(e) => setRelationship(e.target.value)} 
          >
            <option defaultValue="default"></option>
            <option value="Wife">Wife</option>
            <option value="Husband">Husband</option>
            <option value="Daughter">Daughter</option>
            <option value="Son">Son</option>
            <option value="Mother">Mother</option>
            <option value="Father">Father</option>
            <option value="Boss">Boss</option>
            <option value="Employee">Employee</option>
          </select>
        </div>
        <br/>
        <div className="body_items">
          {nome && email && relationship && <NavLink to="/dates">
            <button type="submit" className="btn btn-primary" onClick={() => savePerson()}>
              Add 
            </button>
          </NavLink>}
        </div>
      </form>

      <table className='table table-warning table-striped-columns'>
        <thead className='table-dark'>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Relationship</th>
          </tr>
        </thead>
        <tbody id='people'>{peopleRows}</tbody>
      </table>

    </main>
  );
}