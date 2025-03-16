import React from 'react';
import { BrowserRouter, NavLink, Route, Routes, useLocation, Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import DataTable from 'react-data-table-component';
import { useRef, useEffect, useState } from "react"
// import './dates.css';

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
      selector: row => row.specialDay,
      sortable: true,
      width: "260px"
    },
    {
      name: 'mm/dd',
      selector: row => row.mmdd,
      sortable: true
    }  ]


  const handleRowSelection = ({ selectedRows }) => {
    if (selectedRows.length > 0) {
      const selectedRow = selectedRows[0];
      // Do something with the selected row data, e.g.,
      console.log('Selected row:', selectedRow.specialDay, selectedRow);
      // Pass the data to another component or update state
      // setSelectedData(selectedRow); 
      handleDelete(selectedRow);
    // } else {
    //     setSelectedData(null); // Clear data if no row is selected
    }
  };

  const [msg, setMsg] = React.useState('...listening');
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
      }, 400000);
    })


      async function saveDate() {
        const newdate = { specialDay: specialDay, mmdd: mmdd };
        updateDatesLocal(newdate);
        setDates([...dates, newdate]);
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
      }, []);

      const [dates, setDates] = React.useState([]);
      
      const dateRows = [];
      if (dates.length) {
        for (const [i, date] of dates.entries()) {
          dateRows.push(
            <tr key={i}>
              <td>{date.specialDay}</td>
              <td>{date.mmdd}</td>
            </tr>
          );
        }
      } else {
        dateRows.push(
          <tr key='0'>
            <td colSpan='2'>Add your first important date!</td>
          </tr>
        );
      }

      function handleDelete(selectedRow) {
        const newDates = dates.filter( li => li !== selectedRow)
        setDates(newDates);
        localStorage.setItem('dates', JSON.stringify(newDates));
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
          <button type="submit" className="btn btn-primary" onClick={(refreshPage) => saveDate()}> Add </button> or click the check box to delete a date.
        </span>
        <div>
          <DataTable
          columns = {columns}
          data = {dates}
          fixedHeader
          selectableRows
          selectableRowsSingle
          onSelectedRowsChange={handleRowSelection}
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