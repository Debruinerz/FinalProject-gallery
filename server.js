// const express = require("express");
// const cors = require("cors");
// //const sql = require("mssql/msnodesqlv8");
// const dbOp = require("./dbfiles/dbOp");

// const API_PORT = process.env.PORT || 5000;

// const app = express();

// app.use(cors());


// app.get("/api", function (req, res) {
//     dbOp.getEmployees(function (err, data) {
//       if (err) {
//         res.status(500).send("Error");
//       } else {
//         res.json(data);
//       }
//     });
//   });


// app.listen(API_PORT, () => console.log(`Server listening on port ${API_PORT}`));




const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbOp = require("./dbfiles/dbOp");

const API_PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/employees", function (req, res) {
  dbOp.getEmployees(function (err, data) {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.json(data);
    }
  });
});

app.post("/api/employees", function (req, res) {
  const { firstName, lastName, age, gender } = req.body;
  dbOp.addEmployee(firstName, lastName, age, gender, function (err, result) {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json({ message: "Employee added successfully", id: result.insertId });
    }
  });
});

app.delete("/api/employees/:id", function (req, res) {
  const id = req.params.id;
  dbOp.deleteEmployee(id, function (err, result) {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Employee not found");
    } else {
      res.status(200).json({ message: "Employee deleted successfully", id });
    }
  });
});

app.listen(API_PORT, () => console.log(`Server listening on port ${API_PORT}`));