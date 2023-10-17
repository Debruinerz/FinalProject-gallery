const config = require('./dbConfig');
const sql=require("mssql/msnodesqlv8");
const { promisify } = require('util');

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
        const request = new sql.Request();
        request.query('SELECT * FROM Users', function (err, records) {
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


    //  add to contact us  
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

    // get contacts us 
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
    
    // possible add admin 
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


    // get admin records
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
  
  // possible delete admin in future update
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
  


    //update preview table
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


    // upodate dynamic content
    function updateDynamic(contentID, title, textContent, imgRef, imgAlt, callback) {
      sql.connect(config, function (err) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          var request = new sql.Request();
          request.query(
            `UPDATE DynamicContent
             SET Title = '${title}', textContent = '${textContent}', imgRef = '${imgRef}', imgAlt = '${imgAlt}'
             WHERE ContentID = ${contentID}`,
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

      // login
  function login(username, password, callback) {
      sql.connect(config, function (err) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          const request = new sql.Request();
          const query = `SELECT * FROM Users  WHERE Username = '${username}' AND Password = '${password}';`;
          
          request.query(query, function (err, records) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else {
              if (records.recordset.length > 0) {
                callback(null, { success: true, message: 'Login successful' });
              } else {
                callback(null, { success: false, message: 'Invalid credentials' });
              }
            }
          });
        }
      });
    } 


    
      // Function to get the user ID based on the username
  function getUserIdByUsername(username) {
    return new Promise((resolve, reject) => {
      sql.connect(config, function (err) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          var request = new sql.Request();
          request.query(`SELECT UserID FROM Users WHERE Username = '${username}'`, function (err, recordset) {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              const userId = recordset.recordset[0]?.UserID || null;
              resolve(userId);
            }
          });
        }
      });
    });
  }

  // Function to check if the user ID is an admin
  function checkAdmin(userId) {
    return new Promise((resolve, reject) => {
      sql.connect(config, function (err) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          var request = new sql.Request();
          request.query(`SELECT 1 FROM Admin WHERE UserID = ${userId}`, function (err, recordset) {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              const isAdmin = recordset.recordset.length > 0;
              resolve(isAdmin);
            }
          });
        }
      });
    });
  }

  function updateUserPassword(username,phoneNumber, newPassword, callback) {
    sql.connect(config, function (err) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        var request = new sql.Request();
        request.query(
          `UPDATE Users
          SET Password = '${newPassword}'
          WHERE Username = '${username}' AND PhoneNumber = '${phoneNumber}'`, 
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

  module.exports = {updateUserPassword,checkAdmin,getUserIdByUsername, login,getContentByTitle ,updatePreview,updateDynamic,addUser,deleteUser, addPreview, deletePreview,addContent,deleteContent,addContact,deleteContactUs, getContact,getUser,getPreview,getContent,getAdmin,deleteAdmin};


       //login
    // function login(username, password) {
    //   return new Promise((resolve, reject) => {
    //     sql.connect(config, function (err) {
    //       if (err) {
    //         console.log(err);
    //         reject(err);
    //       } else {
    //         var request = new sql.Request();
    //         request.query(
    //           `SELECT * FROM Users WHERE Username = '${username}' AND Password = '${password}'`,
    //           function (err, recordset) {
    //             if (err) {
    //               console.log(err);
    //               reject(err);
    //             } else {
    //               resolve(recordset.recordset[0]);
    //             }
    //           }
    //         );
    //       }
    //     });
    //   });
    // }

      // function getUser(callback) {
  //   sql.connect(config, function (err) {
  //     if (err) {
  //       console.log(err);
  //       callback(err, null);
  //     } else {
  //       var request = new sql.Request();
  //       request.query("select * from Users", function (err, records) {
  //         if (err) {
  //           console.log(err);
  //           callback(err, null);
  //         } else {
  //           callback(null, records.recordset);
  //         }
  //       });
  //     }
  //   });
  // }

  // function getEmployees(callback) {
//     sql.connect(config, function (err) {
//       if (err) {
//         console.log(err);
//         callback(err, null);
//       } else {
//         var request = new sql.Request();
//         request.query("select * from EmployeeDemos", function (err, records) {
//           if (err) {
//             console.log(err);
//             callback(err, null);
//           } else {
//             callback(null, records.recordset);
//           }
//         });
//       }
//     });
//   }

//   function addEmployee(firstName, lastName, age, gender, callback) {
//     sql.connect(config, function (err) {
//       if (err) {
//         console.log(err);
//         callback(err, null);
//       } else {
//         var request = new sql.Request();
//         request.query(
//           `INSERT INTO EmployeeDemos (FirstName, LastName, Age, Gender)
//            VALUES ('${firstName}', '${lastName}', '${age}', '${gender}')`,
//           function (err, result) {
//             if (err) {
//               console.log(err);
//               callback(err, null);
//             } else {
//               callback(null, result);
//             }
//           }
//         );
//       }
//     });
//   }

//   function deleteEmployee(id, callback) {
//     sql.connect(config, function (err) {
//       if (err) {
//         console.log(err);
//         callback(err, null);
//       } else {
//         var request = new sql.Request();
//         request.query(`DELETE FROM EmployeeDemos WHERE EmployeeID = ${id}`, function (err, result) {
//           if (err) {
//             console.log(err);
//             callback(err, null);
//           } else {
//             callback(null, result);
//           }
//         });
//       }
//     });
//   }
