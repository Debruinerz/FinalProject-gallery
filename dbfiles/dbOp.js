const config = require('./dbConfig');
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


    //  Users 
  function addUser(username,password,firstName, lastName, email, dob, phoneNumber, callback) {
    sql.connect(config, function (err) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        var request = new sql.Request();
        request.query(
          `INSERT INTO Users (Username,Password,FirstName, LastName, Email, DOB, PhoneNumber)
           VALUES ('${username}','${password}','${firstName}', '${lastName}', '${email}', '${dob}', '${phoneNumber}')`,
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

  function deleteUser(id, callback) {
    sql.connect(config, function (err) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        var request = new sql.Request();
        request.query(`DELETE FROM Users WHERE userId = ${id}`, function (err, result) {
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



// dynamic content

function addContent(title,textContent,imgRef,imgAlt, callback) {
  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      var request = new sql.Request();
      request.query(
        `INSERT INTO DynamicContent (Title,textContent,imgRef,imgAlt)
         VALUES ('${title}','${textContent}','${imgRef}', '${imgAlt}')`,
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

function deleteContent(id, callback) {
  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      var request = new sql.Request();
      request.query(`DELETE FROM DynamicContent WHERE ContentId = ${id}`, function (err, result) {
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


    //   contact us  
    function addContactUs(firstName, lastName, email, text, phoneNumber, callback) {
      sql.connect(config, function (err) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          var request = new sql.Request();
          request.query(
            `INSERT INTO contactUs (FirstName, LastName, Email, Text, PhoneNumber)
             VALUES ('${firstName}', '${lastName}', '${email}', '${text}', '${phoneNumber}')`,
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
  
    function deleteContactUs(id, callback) {
      sql.connect(config, function (err) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          var request = new sql.Request();
          request.query(`DELETE FROM contactUs WHERE contactID = ${id}`, function (err, result) {
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
  
  
    //  preview content 
    function addPreview(title,textContent,imgRef,imgAlt,type, callback) {
      sql.connect(config, function (err) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          var request = new sql.Request();
          request.query(
            `INSERT INTO previewContent (Title,textContent,imgRef,imgAlt)
             VALUES ('${title}','${textContent}','${imgRef}', '${imgAlt}', '${type}')`,
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
    
    function deletePreview(id, callback) {
      sql.connect(config, function (err) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          var request = new sql.Request();
          request.query(`DELETE FROM previewContent WHERE previewId = ${id}`, function (err, result) {
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
    
  
  
  
   module.exports = {getEmployees , addEmployee, deleteEmployee,addUser,deleteUser, addPreview, deletePreview,addContent,deleteContent,addContactUs,deleteContactUs};