In this project, we will create a searching, sorting in ascending and sorting in descending operation in data contains in coloumn by using ReactJs.


#### Pre-requisites:

Basic and advanced JavaScript such as functions, types of variables, async and await etc.
ReactJS development setup for web development.
ReactJS Hooks such as useState Hook and useEffect Hook.
Basic CSS properties for styling and designing for the web application.


#### Approach:

Set up the development environment, install all the required dependencies.
Use CSS for stylings.
Create the data.json file to store all data.

Below is the step by the step implementation of the above approach:

**Step 1:** Create a React application using the following command:
        - npx create-react-app interview-task

**Step 2:** After creating our project folder i.e.interview task, move to it using the following command:
        - cd interview-task

**Project Structure:** It will look like the following:

- node_modules
- public
- src
  - App.css
  - App.js
  - App.test.js
  - index.css
  - index.js
  - logo.svg
  - setupTest.js
  - reportWebVitals.js
- .gitignore
- db.json
- {} package-lock.json
- {} package.json
    README.md


**Step 3:** install the axios and react UI kit to use in our project and also install json-server globally.
        - npm i axios mdb-react-ui-kit
        - npm install -g json-server
         

**Step 4:** go to package.json add below file in script:
              - "server" : "json-server --watch data.json --port 4000"
     
**Step 5:** now go to command prompt:
           - run " cd  our-folder-name" and press enter
           - run " npm run server"
  then copy the http request from resources i.e. http://localhost:4000/users and open it in chrome to check json object which store the data in the table.
           
   ```        Microsoft Windows [Version 10.0.19044.1766]
(c) Microsoft Corporation. All rights reserved.

C:\Users\akash>cd OneDrive\Desktop\React project\interview-task

C:\Users\akash\OneDrive\Desktop\React project\interview-task>npm run server

> interview-task@0.1.0 server
> json-server --watch db.json --port 4000


  \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:4000/users

  Home
  http://localhost:4000

  Type s + enter at any time to create a snapshot of the database
  Watching...
```


**Step 6:** Now go to the index.js and import mdb css kit
        - import "mdb-react-ui-kit/dist/css/mdb.min.css";
   
    
**Step 7:** Import react from react to create useffect function.Import axios from axios then create loadUseData function
        - import axios from 'axios';
        - import React, { useState, useEffect } from 'react'
        
 ``  useEffect(() => {
                    loadUsersData();
                    }, []);

         const loadUsersData = async () => {
         return await axios.get("http://localhost:4000/users")
          .then((response) => setData(response.data))
          .catch((err) => console.log(err));
         };
  ``
  
  
 **Step 8:** Create the table using iterator operator to create the rows according to given conditions:
 
 ``  <div style={{ marginTop: "25px" }}>
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
          `` 
    
    
 **Step 9:** Crate the handleSortasc and handleSortdesc function for sorting operation and use it in button tag to performer the sorting operation after click on the button
 
 ``  const handleSortasc = async (e) => {
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
  
  ``
  
  
  **Step 10:** Add the searcch fuctionality after creating creating search button in the form tag also add the reset functionality after created the reset button in the form tag.
  
  `` const handleReset = () => {
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
  
  ``
  
  `` <form style={{ margin: "auto", padding: "15px", maxWidth: "1000px", alignContent: "centre", }}
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
      
      ``
**Step 11:** Save all the files run the application:      
      
         **Step to Run Application:** Run the application using the following command from the root directory of the project:

        - npm start

**Output:** Now open your browser and go to http://localhost:3000/, you will see the output.

**Note:** If you not able to see table contain in the output then:
          - copy the http address i.e. http://localhost:4000/users  from command promt open it on chrome 
          - then you see the contain of the table
          - And perform the operation as you want.

