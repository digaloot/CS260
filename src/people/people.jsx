import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

export function People({ logout }) {

  const navigate = useNavigate();
  const state = location.state;
  const userName = localStorage.getItem('userName');
  const [nome, setNome] = React.useState(localStorage.getItem('nome') || ''); // this is their friendly name
  const [email, setEmail] = React.useState(localStorage.getItem('email') || '');
  const [relationship, setRelationship] = React.useState(localStorage.getItem('relationship') || '');
  const [people, setPeople] = React.useState([]);
  const [msg, setMsg] = React.useState('');
  const [author, setAuthor] = React.useState('');

  
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "blue",
        color: "black"
      }
    },
    headCells: {
      style: {
        fontSize: '16px',
        fontWeight: '600',
        textTransform: 'uppercase'
      }
    },
    cells: {
      style: {
        fontsize: '15px'
      }
    }
  };

  const columns = [
    {
    name: 'userNome',
    selector: row => row.userNome,
    sortable: true,
    width: "0px"
  },
  {
      name: 'Name',
      selector: row => row.nome,
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true
    },
    {
      name: 'Relationship',
      selector: row => row.relationship,
      sortable: true
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
        <span onClick={() => handleDates(row)} className='btn btn-primary btn-sm'>Dates</span>
        &nbsp; &nbsp; &nbsp; 
        <span onClick={() => handleDelete(row)} className='btn btn-danger btn-sm'>Trash</span>
        </>
      ),
      ignoreRowClick: true,
    }
  ]


  React.useEffect(() => {
    if(!userName) {
      logout
      navigate("/")
    }
  })

  React.useEffect(() => {
    refresh()
  }, []);

  React.useEffect(() => {
      quote()
  }, []);

  React.useEffect(() => {
    setInterval(() => {
      quote()
    }, 10000);
  }, []);

  async function quote() {
    fetch('https://quote.cs260.click')
    .then((response) => response.json())
    .then((jsonResponse) => {
      setAuthor(jsonResponse.author)
      setMsg(jsonResponse.quote)
    });    
  }
  
  async function refresh() {
    const newData = {userNome: userName}
    // console.log(userName)
    fetch(`/api/peopleFiltered`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8', },
      body: JSON.stringify(newData),
    }).then((response) => {return response.json()}).then(json => {setPeople(json);})
  }

  async function handleDates(selectedRow) {
    navigate("/dates", {state:selectedRow.nome})
  }

  async function handleDelete(selectedRow) {
    await fetch('/api/deletePerson', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(selectedRow),
    })
    refresh()
  }
  
  async function savePerson() {
    const newPerson = { userNome: userName, nome: nome, email: email, relationship: relationship };
    await fetch('/api/addPerson', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newPerson),
    });
  }

  return (

    <main>
      <div className='header_text'>
        {/* Joke of the day.  */}
        *****  {author}  *****
        <br/>
        {msg}
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
      <form className="body_items" method="get">
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
          {nome && email && relationship && <NavLink to="/dates" state={nome}>
            <button type="submit" className="btn btn-primary" onClick={() => savePerson()}>
              Add 
            </button>
          </NavLink>}
        </div>
      </form>

     <div className="container mt-5'">
        <div>
          <DataTable
          columns = {columns}
          data = {people}
          fixedHeader
          pagination
          stripedRows 
          customStyles={customStyles}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[ 5, 10, 15, 20, 25, 50, 100 ]}
          ></DataTable>
        </div>
      </div>

    </main>
  );
}