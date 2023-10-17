const multer = require("multer");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbOp = require("./dbfiles/dbOp");
const fs = require("fs");
const path = require("path");
const CryptoJS = require("crypto-js");

const secretPass = "XkhZG4fW2t2W";
const API_PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/api/users", function (req, res) {
  dbOp.getUser(function (err, users) {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      const encryptedUsers = users.map((user) => {
        const encryptedUserId = CryptoJS.AES.encrypt(
          user.userId.toString(),
          secretPass
        ).toString();
        const encryptedUsername = CryptoJS.AES.encrypt(
          user.Username,
          secretPass
        ).toString();
        const encryptedPassword = CryptoJS.AES.encrypt(
          user.Password,
          secretPass
        ).toString();
        const encryptedFirstName = CryptoJS.AES.encrypt(
          user.FirstName,
          secretPass
        ).toString();
        const encryptedLastName = CryptoJS.AES.encrypt(
          user.LastName,
          secretPass
        ).toString();
        const encryptedEmail = CryptoJS.AES.encrypt(
          user.Email,
          secretPass
        ).toString();
        const encryptedDOB = CryptoJS.AES.encrypt(
          user.DOB.toISOString(),
          secretPass
        ).toString();
        const encryptedPhoneNumber = CryptoJS.AES.encrypt(
          user.PhoneNumber,
          secretPass
        ).toString();

        return {
          userId: encryptedUserId,
          Username: encryptedUsername,
          Password: encryptedPassword,
          FirstName: encryptedFirstName,
          LastName: encryptedLastName,
          Email: encryptedEmail,
          DOB: encryptedDOB,
          PhoneNumber: encryptedPhoneNumber,
        };
      });

      res.json(encryptedUsers);
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
      const encryptedContactData = data.map((message) => {
        const encryptedContactID = CryptoJS.AES.encrypt(
          message.contactID.toString(),
          secretPass
        ).toString();
        const encryptedFirstName = CryptoJS.AES.encrypt(
          message.FirstName,
          secretPass
        ).toString();
        const encryptedLastName = CryptoJS.AES.encrypt(
          message.LastName,
          secretPass
        ).toString();
        const encryptedEmail = CryptoJS.AES.encrypt(
          message.Email,
          secretPass
        ).toString();
        const encryptedText = CryptoJS.AES.encrypt(
          message.Text,
          secretPass
        ).toString();
        const encryptedPhoneNumber = CryptoJS.AES.encrypt(
          message.PhoneNumber,
          secretPass
        ).toString();

        return {
          contactID: encryptedContactID,
          FirstName: encryptedFirstName,
          LastName: encryptedLastName,
          Email: encryptedEmail,
          Text: encryptedText,
          PhoneNumber: encryptedPhoneNumber,
        };
      });

      res.json(encryptedContactData);
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

// update

app.put("/api/previewContent/:id", function (req, res) {
  const previewID = req.params.id;
  const { title, textContent, imgRef, imgAlt } = req.body;
  dbOp.updatePreview(
    previewID,
    title,
    textContent,
    imgRef,
    imgAlt,
    function (err, result) {
      if (err) {
        res.status(500).send("Internal Server Error");
      } else if (result.affectedRows === 0) {
        res.status(404).send("Preview not found");
      } else {
        res
          .status(200)
          .json({ message: "Preview updated successfully", id: previewID });
      }
    }
  );
});

app.put("/api/updateContent/:id", function (req, res) {
  const contentID = req.params.id;
  const { title, textContent, imgRef, imgAlt } = req.body;
  dbOp.updateDynamic(
    contentID,
    title,
    textContent,
    imgRef,
    imgAlt,
    function (err, result) {
      if (err) {
        res.status(500).send("Internal Server Error");
      } else if (result.affectedRows === 0) {
        res.status(404).send("Content not found");
      } else {
        res
          .status(200)
          .json({ message: "Content updated successfully", id: contentID });
      }
    }
  );
});

// get content by title


app.get("/api/content/:title", function (req, res) {
  const title = req.params.title;
  dbOp.getContentByTitle(title, function (err, data) {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else if (!data) {
      res.status(404).send("Content not found");
    } else {
      res.json(data);
    }
  });
});

app.post("/api/contact", function (req, res) {
  const { firstName, lastName, email, text, phoneNumber } = req.body;

  const decryptedFirstName = CryptoJS.AES.decrypt(
    firstName,
    secretPass
  ).toString(CryptoJS.enc.Utf8);
  const decryptedLastName = CryptoJS.AES.decrypt(lastName, secretPass).toString(
    CryptoJS.enc.Utf8
  );
  const decryptedEmail = CryptoJS.AES.decrypt(email, secretPass).toString(
    CryptoJS.enc.Utf8
  );
  const decryptedText = CryptoJS.AES.decrypt(text, secretPass).toString(
    CryptoJS.enc.Utf8
  );
  const decryptedPhoneNumber = CryptoJS.AES.decrypt(
    phoneNumber,
    secretPass
  ).toString(CryptoJS.enc.Utf8);

  dbOp.addContact(
    decryptedFirstName,
    decryptedLastName,
    decryptedEmail,
    decryptedText,
    decryptedPhoneNumber,
    function (err, result) {
      if (err) {
        res.status(500).send("Internal Server Error");
      } else {
        res
          .status(200)
          .json({ message: "Contact added successfully", id: result.insertId });
      }
    }
  );
});

app.post("/api/content", function (req, res) {
  const { title, textContent, imgRef, imgAlt } = req.body;
  dbOp.addContent(title, textContent, imgRef, imgAlt, function (err, result) {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res
        .status(200)
        .json({ message: "Content added successfully", id: result.insertId });
    }
  });
});


app.post("/api/users", function (req, res) {
  const { username, password, firstName, lastName, email, dob, phoneNumber } =
    req.body;

  const decryptedUsername = CryptoJS.AES.decrypt(username, secretPass).toString(
    CryptoJS.enc.Utf8
  );
  const decryptedPassword = CryptoJS.AES.decrypt(password, secretPass).toString(
    CryptoJS.enc.Utf8
  );
  const decryptedFirstName = CryptoJS.AES.decrypt(
    firstName,
    secretPass
  ).toString(CryptoJS.enc.Utf8);
  const decryptedLastName = CryptoJS.AES.decrypt(lastName, secretPass).toString(
    CryptoJS.enc.Utf8
  );
  const decryptedEmail = CryptoJS.AES.decrypt(email, secretPass).toString(
    CryptoJS.enc.Utf8
  );
  const decryptedPhoneNumber = CryptoJS.AES.decrypt(
    phoneNumber,
    secretPass
  ).toString(CryptoJS.enc.Utf8);

  dbOp.addUser(
    decryptedUsername,
    decryptedPassword,
    decryptedFirstName,
    decryptedLastName,
    decryptedEmail,
    dob,
    decryptedPhoneNumber,
    function (err, result) {
      if (err) {
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).json({ result });
      }
    }
  );
});

app.post("/api/login", function (req, res) {
  const { username, password } = req.body;
  const decryptedPassword = CryptoJS.AES.decrypt(password, secretPass).toString(
    CryptoJS.enc.Utf8
  );

  dbOp.login(username, decryptedPassword, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(result);
    }
  });
});


// file upload save
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/images");
  },
  filename: function (req, file, cb) {
    const orgName = file.originalname;
    const filepath = path.extname(orgName);
    const Name = path.basename(orgName, filepath);
    const upload = "./src/images";

    let num = 1;
    let newName = orgName;
    while (fs.existsSync(path.join(upload, newName))) {
      newName = `${Name}(${num})${filepath}`;
      num++;
    }
    cb(null, newName);
  },
});

const upload = multer({ storage: storage });

// file upload
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }
  const filePath = req.file.path;
  res.status(200).json({ message: "File uploaded successfully", filePath });
});

//get the user ID based on the username

app.get("/api/username/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const userId = await dbOp.getUserIdByUsername(username);
    if (userId) {
      const encryptedUserId = CryptoJS.AES.encrypt(
        userId.toString(),
        secretPass
      ).toString();
      res.json({ encryptedUserId });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// check if the user ID is part of the admin table
app.get("/api/isadmin/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const isAdmin = await dbOp.checkAdmin(userId);
    res.json({ isAdmin });
  } catch (error) {
    console.error("Error checking admin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



app.put("/api/forgotpassword/:username", function (req, res) {
  const username = req.params.username;
  const { phoneNumber,newPassword } = req.body;
  
  const decryptphoneNumber = CryptoJS.AES.decrypt(
    phoneNumber,
    secretPass
  ).toString(CryptoJS.enc.Utf8);
  const decryptnewPassword = CryptoJS.AES.decrypt(
    newPassword,
    secretPass
  ).toString(CryptoJS.enc.Utf8);

  dbOp.updateUserPassword(
    username,
    decryptphoneNumber,
    decryptnewPassword,
    function (err, result) {
      if (err) {
        res.status(500).send("Internal Server Error");
      } else if (result.affectedRows === 0) {
        res.status(404).json("User not found");
      } else {
        res.status(200).json({ message: "Password updated successfully" });
      }
    }
  );
});

app.listen(API_PORT, () => console.log(`Server listening on port ${API_PORT}`));

// app.get('/api/username/:username', async (req, res) => {
//   const { username } = req.params;
//   try {
//     const userId = await dbOp.getUserIdByUsername(username);
//     if (userId) {
//       res.json({ userId });
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error fetching user ID:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// app.post("/api/login", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await dbOp.login(username, password);
//     if (user) {
//       res.status(200).json({ message: "Login successful" });
//     } else {
//       res.status(401).json({ message: "Invalid username or password" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// get

// app.get("/api/users", function (req, res) {
//   dbOp.getUser(function (err, data) {
//     if (err) {
//       res.status(500).send("Internal Server Error");
//     } else {
//       res.json(data);
//     }
//   });
// });
