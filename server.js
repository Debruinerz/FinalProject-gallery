

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




// get

app.get("/api/users", function (req, res) {
  dbOp.getUser(function (err, data) {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.json(data);
    }
  });
});

app.get("/api/previewContent", function (req, res) {
  dbOp.getPreview(function (err, data) {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.json(data);
    }
  });
});

app.get("/api/Content", function (req, res) {
  dbOp.getContent(function (err, data) {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.json(data);
    }
  });
});

app.get("/api/Contact", function (req, res) {
  dbOp.getContact(function (err, data) {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.json(data);
    }
  });
});

app.get("/api/admin", function (req, res) {
  dbOp.getAdmin(function (err, data) {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.json(data);
    }
  });
});

// delete

app.delete("/api/Content/:id", function (req, res) {
  const id = req.params.id;
  dbOp.deleteContent(id, function (err, result) {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Content not found");
    } else {
      res.status(200).json({ message: "Content deleted successfully", id });
    }
  });
});

app.delete("/api/users/:id", function (req, res) {
  const id = req.params.id;
  dbOp.deleteUser(id, function (err, result) {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Content not found");
    } else {
      res.status(200).json({ message: "Content deleted successfully", id });
    }
  });
});

app.delete("/api/Preview/:id", function (req, res) {
  const id = req.params.id;
  dbOp.deletePreview(id, function (err, result) {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Content not found");
    } else {
      res.status(200).json({ message: "Content deleted successfully", id });
    }
  });
});

app.delete("/api/Admin/:id", function (req, res) {
  const id = req.params.id;
  dbOp.deleteAdmin(id, function (err, result) {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Content not found");
    } else {
      res.status(200).json({ message: "Content deleted successfully", id });
    }
  });
});

app.delete("/api/Contact/:id", function (req, res) {
  const id = req.params.id;
  dbOp.deleteContactUs(id, function (err, result) {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Content not found");
    } else {
      res.status(200).json({ message: "Content deleted successfully", id });
    }
  });
});



// demo update 

app.put("/api/previewContent/:id", function (req, res) {
  const previewID = req.params.id;
  const { title, textContent, imgRef, imgAlt } = req.body;

  dbOp.updatePreview(previewID, title, textContent, imgRef, imgAlt, function (err, result) {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Preview not found");
    } else {
      res.status(200).json({ message: "Preview updated successfully", id: previewID });
    }
  });
});


// get content by title 

app.get('/api/content/:title', function (req, res) {
  const title = req.params.title;
  dbOp.getContentByTitle(title, function (err, data) {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else if (!data) {
      res.status(404).send('Content not found');
    } else {
      res.json(data);
    }
  });
});


// add 

app.post("/api/contact", function (req, res) {
  const { firstName, lastName, email, text, phoneNumber } = req.body;
  dbOp.addContact(firstName, lastName, email, text, phoneNumber, function (err, result) {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json({ message: "Contact added successfully", id: result.insertId });
    }
  });
});

// posts (add)

app.post("/api/users", function (req, res) {
  const {username,password,firstName, lastName, email, dob, phoneNumber} = req.body;
  dbOp.addUser(username,password,firstName, lastName, email, dob, phoneNumber, function (err, result) {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json({ message: "user added successfully", id: result.insertId });
    }
  });
});


app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await dbOp.login(username, password);
    if (user) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(API_PORT, () => console.log(`Server listening on port ${API_PORT}`));

