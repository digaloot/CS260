import React from 'react';
import { BrowserRouter, NavLink, Route, Routes, useLocation, Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import DataTable from 'react-data-table-component';
import './dates.css';

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
      name: 'Special Day',
      selector: row => row.day,
      sortable: true,
      width: "260px"
    },
    {
      name: 'mm/dd',
      selector: row => row.date,
      sortable: true
    }  ]

 const data = [
    {
      id: 1,
      day: 'Christmas',
      date: '12/25'
    },
    {
      id: 2,
      day: 'Anniversary',
      date: '8/22'
    }  
  ]

  const [records, setRecords] = React.useState(data);

  function handleFilter(event) {
    const newData = data.filter(row => {
      return row.day.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData)
  }

  const handleRowSelection = ({ selectedRows }) => {
    if (selectedRows.length > 0) {
      const selectedRow = selectedRows[0];
      // Do something with the selected row data, e.g.,
      console.log('Selected row:', selectedRow.day);
      // Pass the data to another component or update state
      // setSelectedData(selectedRow); 
    // } else {
    //     setSelectedData(null); // Clear data if no row is selected
    }
  };


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

    const [specialDay, setSpecialDay] = React.useState(' ');
    const [specialDate, setSpecialDate] = React.useState(' ');
    
    function dayChange(e) {
      setSpecialDay(e.target.value);
      localStorage.setItem('specialDay', specialDay);
      // console.log(e.target.value);
    }
    function dateChange(e) {
        setSpecialDate(e.target.value);
        localStorage.setItem('specialDate', specialDate);
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
      <div className="title">Your Special and Important Dates For {state}</div> <br/>

      <div className="container mt-5'">
        <span className="inline">
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <input className="text" type="text" onChange={dayChange} name="" placeholder="Add A Special Day"/>  
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <input className="text" type="text" onChange={dateChange} name="" placeholder="mm/dd"/>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <NavLink to="/dates"> <button type="submit" className="btn btn-primary"> Add </button> </NavLink>
        </span>
        <div className='text-end' onChange = {handleFilter}>
          <input type = 'text'  placeholder="Search..."/>
        </div>
        <div>
          <DataTable
          columns = {columns}
          data = {records}
          fixedHeader
          selectableRows
          selectableRowsSingle
          onSelectedRowsChange={handleRowSelection}
          pagination
          stripedRows 
          customStyles={customStyles}
          ></DataTable>
        </div>
      </div>

    </main>
  );
}