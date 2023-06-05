const config =       require('./dbConfig');
   //const sql = require('mssql'); 
   const sql=require("mssql/msnodesqlv8");


function getEmployees(callback) {
    sql.connect(config, function (err) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        var request = new sql.Request();
        request.query("select * from EmployeeDemos", function (err, records) {
          if (err) {
            console.log(err);
            callback(err, null);
          } else {
            callback(null, records.recordset);
          }
        });
      }
    });
  }

  function addEmployee(firstName, lastName, age, gender, callback) {
    sql.connect(config, function (err) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        var request = new sql.Request();
        request.query(
          `INSERT INTO EmployeeDemos (FirstName, LastName, Age, Gender)
           VALUES ('${firstName}', '${lastName}', '${age}', '${gender}')`,
          function (err, result) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback(null, result);
            }
          }
        );
      }
    });
  }

  function deleteEmployee(id, callback) {
    sql.connect(config, function (err) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        var request = new sql.Request();
        request.query(`DELETE FROM EmployeeDemos WHERE EmployeeID = ${id}`, function (err, result) {
          if (err) {
            console.log(err);
            callback(err, null);
          } else {
            callback(null, result);
          }
        });
      }
    });
  }
   module.exports = {getEmployees , addEmployee, deleteEmployee};