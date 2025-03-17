import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import DataTable from 'react-data-table-component';

export function Dates( props ) {
  const location = useLocation();
  const state = location.state;
  console.log(state);

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
      name: 'Nome',
      selector: row => row.nome,
      sortable: true,
      width: "250px"
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

  const [filterDates, setFilterDates] = React.useState({});
  const [msg, setMsg] = React.useState('...listening');
  const [nome, setNome] = React.useState(localStorage.getItem('nome') || '');
  const [specialDay, setSpecialDay] = React.useState(localStorage.getItem('specialDay') || '');
  const [mmdd, setMMDD] = React.useState(localStorage.getItem('mmdd') || '');
  
    React.useEffect(() => {
      setInterval(() => {
        const names = [
          '12/25', 
          '7/4', 
          '1/1',
          '10/31'
        ];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const newMsg = `${randomName}`;
        setMsg(newMsg);
      }, 1000);
    },[state])


      async function saveDate() {
        const newdate = { nome: state, specialDay: specialDay, mmdd: mmdd };
        updateDatesLocal(newdate);
        setDates([...dates, newdate]);
        setNome('');
        setSpecialDay('');
        setMMDD('');
      }
    
      function updateDatesLocal(newdate) {
        let dates = [];
        const datesText = localStorage.getItem('dates');
        if (datesText) {
          dates = JSON.parse(datesText);
        }
        dates.push(newdate);
        localStorage.setItem('dates', JSON.stringify(dates));
      }
    
      React.useEffect(() => {
        const datesText = localStorage.getItem('dates');
        if (datesText) {
          setDates(JSON.parse(datesText));
        }
        setFilterDates(JSON.parse(datesText));
        // handleFilter(undefined);
      }, []);

      React.useEffect(
        () => {
        if (filterDates.filter)  {
          handleFilter(undefined);
        }},
        [state,filterDates] // <-- empty dependency array
      ) 

      const [dates, setDates] = React.useState([]);
      
      function handleDelete(selectedRow) {
        const newDates = dates.filter( li => li !== selectedRow)
        setDates(newDates);
        localStorage.setItem('dates', JSON.stringify(newDates));
      }

      function handleFilter(event) {
        const newData = filterDates.filter(row => {
          // return row.nome.toLowerCase().includes(event.target.value.toLowerCase())
          return row.nome.toLowerCase().includes(state.toLowerCase())
        })
        setDates(newData)
      }
    
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
        <div className='text-end' onChange = {handleFilter}>
          <input type = 'text'  placeholder="Search..."/>
        </div>
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