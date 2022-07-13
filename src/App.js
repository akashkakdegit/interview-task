import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css';
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, } from "mdb-react-ui-kit";

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    loadUsersData();
  }, []);

  const loadUsersData = async () => {
    return await axios.get("http://localhost:4000/users")
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  };
  console.log("data", data);

  const handleReset = () => {
    loadUsersData();
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    return await axios.get(`http://localhost:4000/users?q=${value}`)
      .then((response) => {
        setData(response.data);
        setValue("");
      })
      .catch((err) => console.log(err));
  };

  const handleSortasc = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    return await axios.get(`http://localhost:4000/users?_sort=${value}&_order=asc`)
      .then((response) => {
        setData(response.data);

      })
      .catch((err) => console.log(err));
  };

  const handleSortdesc = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    return await axios.get(`http://localhost:4000/users?_sort=${value}&_order=desc`)
      .then((response) => {
        setData(response.data);

      })
      .catch((err) => console.log(err));
  };

  return (
    <MDBContainer>
      <form style={{ margin: "auto", padding: "15px", maxWidth: "1000px", alignContent: "centre", }}
        className="d-flex input-group w-auto" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="search">Search</button>
        <button className="search" onClick={() => handleReset()}>Reset</button>
      </form>
      <div style={{ marginTop: "25px" }}>
        <MDBRow>
          <MDBCol size="12">
            <MDBTable className='table-bordered'>
              <MDBTableHead>
                <tr>
                  <th scope="col"><span className='spa' >Topic</span><button className='asc' onClick={handleSortasc} value="topic">ACS</button>
                    <button className='asc' onClick={handleSortdesc} value="topic">DESC</button></th>
                  <th scope="col"><span className='spa' >Active Members</span><button className='asc' onClick={handleSortasc} value="activeMembers">ASC</button>
                    <button className='asc' onClick={handleSortdesc} value="activeMembers">DESC</button></th>
                  <th scope="col"><span className='spa' >Status</span><button className='asc' onClick={handleSortasc} value="status">ASC</button>
                    <button className='asc' onClick={handleSortdesc} value="status">DESC</button></th>
                  <th scope="col"><span className='spa' >Upvotes</span><button className='asc' onClick={handleSortasc} value="upvotes">ASC</button>
                    <button className='asc' onClick={handleSortdesc} value="upvotes">DESC</button></th>
                </tr>
              </MDBTableHead>
              {data.length === 0 ? (
                <MDBTableBody className="align-center mb-0">
                  <tr>
                    <td colSpan={9} className="text-center mb-0">No Data Found</td>
                  </tr>
                </MDBTableBody>) : (
                data.map((item, id) => (
                  <MDBTableBody key={id}>
                    <tr>
                      <td>{item.topic}</td>
                      <td>{item.activeMembers}</td>
                      <td>{item.status}</td>
                      <td>{item.upvotes}</td>
                    </tr>

                  </MDBTableBody>
                ))
              )
              }
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>
  );
}

export default App;
