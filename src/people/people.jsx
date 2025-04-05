import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

export function People({ logout }) {

  const navigate = useNavigate();
  const state = location.state;
  const [filterPeople, setFilterPeople] = React.useState({});
  // const [userNome, setUserNome] = React.useState({});
  const userName = localStorage.getItem('userName');
  const [nome, setNome] = React.useState(localStorage.getItem('nome') || ''); // this is their friendly name
  const [email, setEmail] = React.useState(localStorage.getItem('email') || '');
  const [relationship, setRelationship] = React.useState(localStorage.getItem('relationship') || '');
  const [filterAltPeople, setFilterAltPeople] = React.useState([]);
  const [people, setPeople] = React.useState([]);
  const [dates, setDates] = React.useState([]);
  const [msg, setMsg] = React.useState('...listening');

  
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
      const newMsg = `${randomName} ${randomCount}`;
      setMsg(newMsg);
    }, 3000);
  },[state])

  React.useEffect(() => {
    if(!userName) {
      logout
      navigate("/")
    }
  })

  // React.useEffect(() => {
  //   const datesText = localStorage.getItem('dates');
  //   if (datesText) {
  //     setDates(JSON.parse(datesText));
  //   }
  // }, []);

  /***********************************************************************/
  // React.useEffect(() => {
  //   fetch('/api/dates')
  //     .then((response) => response.json())
  //     .then((dates) => {
  //       setDates(dates);
  //     });
  // }, []);
  /***********************************************************************/

  // React.useEffect(() => {
  //   const peopleText = localStorage.getItem('people');
  //   if (peopleText) {
  //     setPeople(JSON.parse(peopleText));
  //     setFilterPeople(JSON.parse(peopleText));
  //     setFilterAltPeople(JSON.parse(peopleText));
  //   }
  // }, []);

  React.useEffect(() => {
    fetch('/api/people')
      .then((response) => response.json())
      .then((people) => {
        setPeople(people);
        });
  }, []);

    React.useEffect(
      () => {
        if (people) {
          if (filterPeople.filter)  {
            handleFilterU(undefined);
          }
        }
      },
      [filterPeople]
    ) 

  // const handleDates = (selectedRow) => {navigate("/dates", {state:selectedRow.nome});};

    async function handleDates(selectedRow) {
      // const response = await fetch(`/api/datesFiltered`, {
      //   method: 'post',
      //   headers: { 'Content-type': 'application/json; charset=UTF-8', },
      //   body: JSON.stringify(selectedRow),
      // });
      navigate("/dates", {state:selectedRow.nome})
    }

  async function handleDelete(selectedRow) {
    // const newPeople = people.filter( li => li !== selectedRow )
    // const allPeople = [...newPeople, ...filterAltPeople];
    // setPeople(newPeople);
    // localStorage.setItem('people', JSON.stringify(allPeople));

    await fetch('/api/deletePerson', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(selectedRow),
    })
    const response = await fetch('/api/people')
    const people = await response.json()
    setPeople(people);
    setFilterPeople(people);
    setFilterAltPeople(people);



    // const newDates = dates.filter( (li) => { return li.nome !== selectedRow.nome })
    // setDates(newDates);
    // localStorage.setItem('dates', JSON.stringify(newDates));
  }
  
  function handleFilter(event) {
    const newData = filterPeople.filter(row => {
      return  row.nome.toLowerCase().includes(event.target.value.toLowerCase()) && userName.toLowerCase() === (row.userNome.toLowerCase())
    })
    setPeople(newData)
  }

  function handleFilterU(event) {
    const filterData = filterPeople.filter(row => {
      return userName.toLowerCase() === (row.userNome.toLowerCase())
    })
    setPeople(filterData)

    const filterAltData = filterAltPeople.filter(row => {
      return userName.toLowerCase() !== (row.userNome.toLowerCase())
    })
    setFilterAltPeople(filterAltData)
  }

  async function savePerson() {
    const newPerson = { userNome: userName, nome: nome, email: email, relationship: relationship };
    // updatePeopleLocal(newPerson);
    await fetch('/api/addPerson', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newPerson),
    });
    // console.log(newPerson);

    // setPeople([...people, newPerson]);
    // setUserNome('');
  }

  // function updatePeopleLocal(newPerson) {
  //   let people = [];
  //   const peopleText = localStorage.getItem('people');
  //   if (peopleText) {
  //     people = JSON.parse(peopleText);
  //   }
  //   people.push(newPerson);
  //   localStorage.setItem('people', JSON.stringify(people));
  // }
  
  // console.log("username: ", userName)
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
        <div className='text-end' onChange = {handleFilter}>
          <input type = 'text'  placeholder="Search..."/>
        </div>
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