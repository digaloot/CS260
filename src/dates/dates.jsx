import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

export function Dates({ logout }) {

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [dates, setDates] = React.useState([]);
  const userName = localStorage.getItem('userName');
  const [msg, setMsg] = React.useState('');
  const [specialDay, setSpecialDay] = React.useState(localStorage.getItem('specialDay') || '');
  const [mmdd, setMMDD] = React.useState(localStorage.getItem('mmdd') || '');
  
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
      name: 'Nome',
      selector: row => row.nome,
      sortable: true,
      width: "0px"
    },
    {
      name: 'Special Day',
      selector: row => row.specialDay,
      sortable: true,
      width: "260px"
    },
    {
      name: 'mm/dd',
      selector: row => row.mmdd,
      sortable: true
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
        <span onClick={() => handleDelete(row)} className='btn btn-danger btn-sm' >Trash</span>
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
    fetch('https://api.chucknorris.io/jokes/random?category=dev')
    .then((response) => response.json())
    .then((jsonResponse) => {
      setMsg(jsonResponse.value)
    });    
  }
  
  async function refresh() {
    const newData = {userNome: userName, nome: state}
    fetch(`/api/datesFiltered`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8', },
      body: JSON.stringify(newData),
    }).then((response) => {return response.json()}).then(json => {setDates(json);})
    setSpecialDay('')
    setMMDD('')
  }

  async function saveDate() {
    const newDate = { userNome: userName, nome: state, specialDay: specialDay, mmdd: mmdd };
    await fetch('/api/addDate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newDate),
    });
    refresh()
  }
    
  async function handleDelete(selectedRow) {
    await fetch('/api/deleteDate', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(selectedRow),
    })
    refresh()
  }

  return (
    <main className='body_items'>
      <div className='header_text'>
        {/* What if Chuck Norris had been computer science student?
        <br/>
        <br/> */}
        {msg}
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
      <br/>
      <div className="title">Your Special and Important Dates With {state}</div> <br/>

      <div className="container mt-5'">
        <span className="inline">
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <input className="test" type="text" value={specialDay} onChange={(e) => setSpecialDay(e.target.value)} placeholder="Add A Special Day" />
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <input className="text" type="text" value={mmdd} onChange={(e) => setMMDD(e.target.value)} placeholder="mm/dd" />
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <button disabled={!specialDay && !mmdd} type="submit" className="btn btn-primary" onClick={(refreshPage) => saveDate()}> Add </button>
        </span>
        <div>
          <DataTable
          columns = {columns}
          data = {dates}
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