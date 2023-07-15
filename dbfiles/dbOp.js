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

  function getUser(callback) {
    sql.connect(config, function (err) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        var request = new sql.Request();
        request.query("select * from Users", function (err, records) {
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


function getContent(callback) {
  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      var request = new sql.Request();
      request.query("select * from DynamicContent", function (err, records) {
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
    function addContact(firstName, lastName, email, text, phoneNumber, callback) {
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

    // will eventually show all the details of the contact us
    function getContact(callback) {
      sql.connect(config, function (err) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          var request = new sql.Request();
          request.query("select * from contactUs", function (err, records) {
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
    // will be for current content being shown 
    function getPreview(callback) {
      sql.connect(config, function (err) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          var request = new sql.Request();
          request.query("SELECT * FROM previewContent WHERE type = 'current' OR type = 'future'", function (err, records) {
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
    
    //  admin 
    function addAdmin( userID, callback) {
      sql.connect(config, function (err) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          var request = new sql.Request();
          request.query(
            `INSERT INTO Users (userID)
             VALUES ('${userID}')`,
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
  
    function getAdminUser(callback) {
      sql.connect(config, function (err) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          var request = new sql.Request();
          request.query("select * from Admin", function (err, records) {
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

    function getAdmin(callback) {
      sql.connect(config, function (err) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          var request = new sql.Request();
          request.query("select * from Admin", function (err, records) {
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
  
  
    function deleteAdmin(id, callback) {
      sql.connect(config, function (err) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          var request = new sql.Request();
          request.query(`DELETE FROM Admin WHERE AdminId = ${id}`, function (err, result) {
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
  


    //update demo 
    function updatePreview(previewID, title, textContent, imgRef, imgAlt, callback) {
      sql.connect(config, function (err) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          var request = new sql.Request();
          request.query(
            `UPDATE previewContent
             SET Title = '${title}', textContent = '${textContent}', imgRef = '${imgRef}', imgAlt = '${imgAlt}'
             WHERE previewID = ${previewID}`,
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


    // content by title
    function getContentByTitle(title, callback) {
      sql.connect(config, function (err) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          var request = new sql.Request();
          request.query(`SELECT * FROM DynamicContent WHERE Title = '${title}'`, function (err, records) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback(null, records.recordset[0]);
            }
          });
        }
      });
    }


    //login
    function login(username, password) {
      return new Promise((resolve, reject) => {
        sql.connect(config, function (err) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            var request = new sql.Request();
            request.query(
              `SELECT * FROM Users WHERE Username = '${username}' AND Password = '${password}'`,
              function (err, recordset) {
                if (err) {
                  console.log(err);
                  reject(err);
                } else {
                  resolve(recordset.recordset[0]);
                }
              }
            );
          }
        });
      });
    }
  
   module.exports = {login,getContentByTitle ,updatePreview, getEmployees , addEmployee, deleteEmployee,addUser,deleteUser, addPreview, deletePreview,addContent,deleteContent,addContact,deleteContactUs, getContact,getUser,getPreview,getContent,getAdmin,getAdminUser,deleteAdmin};