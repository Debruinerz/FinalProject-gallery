import React from "react";
//import { useSpeechSynthesis } from "react-speech-kit";
import { useState,useEffect } from "react";
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'


const Admin = () => {
  const [employees, setEmployees] = useState([]);

  const getData = async (url) => {
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
    console.log(data);
    setEmployees(data);
  };

  const deleteEmployee = async (id) => {
    await fetch(`http://localhost:5000/api/employees/${id}`, {
      method: "DELETE",
    });
    const newEmployees = employees.filter((employee) => employee.EmployeeID !== id);
    setEmployees(newEmployees);
  };

  useEffect(() => {
    getData("http://localhost:5000/api/employees");
  }, []);
  return (
    <div>
      <Header/>
      <Navbar/>
      
      add user 
      delete user
      add admin 
      delete admin user
      change user details 
      change admin details 

      generate qr code 
      change content details 
      change preview content details 


      try use tabs -- react-tabs?    mui tabs? 



      <div className="App">
      <button onClick={() => getData("http://localhost:5000/api/employees")}>Get Employees</button>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.EmployeeID}>
              <td>{employee.FirstName}</td>
              <td>{employee.LastName}</td>
              <td>{employee.Age}</td>
              <td>{employee.Gender}</td>
              <td>
                <button onClick={() => deleteEmployee(employee.EmployeeID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  


      <Footer/>
    </div>
  );
};

export default Admin;
//
