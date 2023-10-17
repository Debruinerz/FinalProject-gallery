import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import QRCode from "qrcode.react";
import CryptoJS from "crypto-js";
import Footer from "../../components/footer/Footer";
import useisAdmin from "../../components/isAdmin/isAdmin";
import "./admin.css";

const Admin = () => {
  const secretPass = "XkhZG4fW2t2W";
  const isAdminUser = useisAdmin();
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  ///////////////////////////////////////////////////////////////

  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);

  const getUsersData = async () => {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    });

    const userData = await response.json();

    // Decrypt user data
    const decryptedUserData = userData.map((user) => {
      const decryptedUserId = CryptoJS.AES.decrypt(
        user.userId,
        secretPass
      ).toString(CryptoJS.enc.Utf8);
      const decryptedUsername = CryptoJS.AES.decrypt(
        user.Username,
        secretPass
      ).toString(CryptoJS.enc.Utf8);
      const decryptedPassword = CryptoJS.AES.decrypt(
        user.Password,
        secretPass
      ).toString(CryptoJS.enc.Utf8);
      const decryptedFirstName = CryptoJS.AES.decrypt(
        user.FirstName,
        secretPass
      ).toString(CryptoJS.enc.Utf8);
      const decryptedLastName = CryptoJS.AES.decrypt(
        user.LastName,
        secretPass
      ).toString(CryptoJS.enc.Utf8);
      const decryptedEmail = CryptoJS.AES.decrypt(
        user.Email,
        secretPass
      ).toString(CryptoJS.enc.Utf8);
      const decryptedDOB = CryptoJS.AES.decrypt(user.DOB, secretPass).toString(
        CryptoJS.enc.Utf8
      );
      const decryptedPhoneNumber = CryptoJS.AES.decrypt(
        user.PhoneNumber,
        secretPass
      ).toString(CryptoJS.enc.Utf8);

      return {
        userId: decryptedUserId,
        Username: decryptedUsername,
        Password: decryptedPassword,
        FirstName: decryptedFirstName,
        LastName: decryptedLastName,
        Email: decryptedEmail,
        DOB: new Date(decryptedDOB),
        PhoneNumber: decryptedPhoneNumber,
      };
    });

    console.log(decryptedUserData);
    setUsers(decryptedUserData);

    const adminData = await fetch("http://localhost:5000/api/admin", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
    console.log(adminData);
    setAdmins(adminData);
  };

  const deleteUser = async (userId) => {
    try {
      const isAdmin = admins.some((admin) => admin.userId === userId);
      if (isAdmin) {
        alert("Cannot delete admin user.");
        return;
      }
      const confirmed = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmed) {
        await fetch(`http://localhost:5000/api/users/${userId}`, {
          method: "DELETE",
        });
        const newUsers = users.filter((user) => user.userId !== userId);
        setUsers(newUsers);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  useEffect(() => {
    getUsersData();
  }, []);

  // tab 2 /////////////////////////////////////////////////////////////////////////////
  const [showAddContentForm, setShowAddContentForm] = useState(false);

  const handleAddContentFormSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: e.target.title.value,
      textContent: e.target.textContent.value,
      imgRef: e.target.imgRef.value,
      imgAlt: e.target.imgAlt.value,
    };

    for (const key in formData) {
      if (
        formData[key].includes('""') ||
        formData[key].includes("''") ||
        formData[key].includes("'") ||
        formData[key].includes("`")
      ) {
        alert("Invalid input: The form  contains forbidden characters.");
        return;
      }
    }

    const newContent = {
      title: e.target.title.value,
      textContent: e.target.textContent.value,
      imgRef: e.target.imgRef.value,
      imgAlt: e.target.imgAlt.value,
    };

    try {
      const response = await fetch("http://localhost:5000/api/Content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContent),
      });

      if (response.ok) {
        setContent([...content, newContent]);
        setShowAddContentForm(false);
        window.location.reload();
      } else {
        console.error("Failed to add content to the database.");
      }
    } catch (error) {
      alert("An error occurred while adding content to the database.");
    }
  };

  // table content
  const [content, setContent] = useState([]);

  const getContentData = async () => {
    const data = await fetch("http://localhost:5000/api/Content", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
    console.log(data);
    setContent(data);
  };

  const deleteContent = async (contentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this content?"
    );
    if (confirmed) {
      await fetch(`http://localhost:5000/api/Content/${contentId}`, {
        method: "DELETE",
      });
      const newContent = content.filter((item) => item.ContentID !== contentId);
      setContent(newContent);
    }
  };

  //update form

  const [updateContentFormData, setUpdateContentFormData] = useState({
    title: "",
    textContent: "",
    imgRef: "",
    imgAlt: "",
  });

  const [selectedContentId, setSelectedContentId] = useState(null);

  const handleUpdateContentFormChange = (e) => {
    setUpdateContentFormData({
      ...updateContentFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateContentFormSubmit = async (e) => {
    e.preventDefault();

    if (
      updateContentFormData.title.includes('""') ||
      updateContentFormData.title.includes("''") ||
      updateContentFormData.title.includes("'") ||
      updateContentFormData.title.includes("`") ||
      updateContentFormData.textContent.includes('""') ||
      updateContentFormData.textContent.includes("''") ||
      updateContentFormData.textContent.includes("'") ||
      updateContentFormData.textContent.includes("`") ||
      updateContentFormData.imgRef.includes('""') ||
      updateContentFormData.imgRef.includes("''") ||
      updateContentFormData.imgRef.includes("'") ||
      updateContentFormData.imgRef.includes("`") ||
      updateContentFormData.imgAlt.includes('""') ||
      updateContentFormData.imgAlt.includes("''") ||
      updateContentFormData.imgAlt.includes("'") ||
      updateContentFormData.imgAlt.includes("`")
    ) {
      alert("Invalid input: The form data contains forbidden characters.");
      return;
    }

    const response = await fetch(
      `http://localhost:5000/api/updateContent/${selectedContentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateContentFormData),
      }
    );

    if (response.ok) {
      const updatedContent = content.map((item) => {
        if (item.ContentID === selectedContentId) {
          return { ...item, ...updateContentFormData };
        }
        return item;
      });
      setContent(updatedContent);
      setUpdateContentFormData({
        title: "",
        textContent: "",
        imgRef: "",
        imgAlt: "",
      });
      window.location.reload();
      setSelectedContentId(null);
    }
  };

  useEffect(() => {
    getContentData();
  }, []);

  // tab 3/////////////////////////////////////////////////////////////////////////////////////
  const [previewContent, setPreviewContent] = useState([]);

  const getPreviewData = async () => {
    const data = await fetch("http://localhost:5000/api/previewContent", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
    console.log(data);
    setPreviewContent(data);
  };

  const [updateFormData, setUpdateFormData] = useState({
    title: "",
    textContent: "",
    imgRef: "",
    imgAlt: "",
    type: "",
  });
  const [selectedPreviewId, setSelectedPreviewId] = useState(null);

  const handleUpdateFormChange = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();

    if (
      updateFormData.title.includes('""') ||
      updateFormData.title.includes("''") ||
      updateFormData.title.includes("'") ||
      updateFormData.title.includes("`") ||
      updateFormData.textContent.includes('""') ||
      updateFormData.textContent.includes("''") ||
      updateFormData.textContent.includes("'") ||
      updateFormData.textContent.includes("`") ||
      updateFormData.imgRef.includes('""') ||
      updateFormData.imgRef.includes("''") ||
      updateFormData.imgRef.includes("'") ||
      updateFormData.imgRef.includes("`") ||
      updateFormData.imgAlt.includes('""') ||
      updateFormData.imgAlt.includes("''") ||
      updateFormData.imgAlt.includes("'") ||
      updateFormData.imgAlt.includes("`")
    ) {
      alert("Invalid input: The form contains forbidden characters.");
      return;
    }

    const response = await fetch(
      `http://localhost:5000/api/previewContent/${selectedPreviewId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateFormData),
      }
    );

    if (response.ok) {
      const updatedPreviewContent = previewContent.map((item) => {
        if (item.previewID === selectedPreviewId) {
          return { ...item, ...updateFormData };
        }
        return item;
      });
      setPreviewContent(updatedPreviewContent);
      setUpdateFormData({
        title: "",
        textContent: "",
        imgRef: "",
        imgAlt: "",
        type: "",
      });
      window.location.reload();
      setSelectedPreviewId(null);
    }
  };

  useEffect(() => {
    getPreviewData();
  }, []);

  ///tab 4//////////////////////////////////////////////////////////////////////////////////////

  const [contact, setContact] = useState([]);

  const getContactData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/Contact", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      });

      const contactData = await response.json();

      // Decrypt contact IDs
      const decryptedContactData = contactData.map((message) => {
        const decryptedContactId = CryptoJS.AES.decrypt(
          message.contactID,
          secretPass
        ).toString(CryptoJS.enc.Utf8);

        const decryptedFirstName = CryptoJS.AES.decrypt(
          message.FirstName,
          secretPass
        ).toString(CryptoJS.enc.Utf8);

        const decryptedLastName = CryptoJS.AES.decrypt(
          message.LastName,
          secretPass
        ).toString(CryptoJS.enc.Utf8);

        const decryptedEmail = CryptoJS.AES.decrypt(
          message.Email,
          secretPass
        ).toString(CryptoJS.enc.Utf8);

        const decryptedText = CryptoJS.AES.decrypt(
          message.Text,
          secretPass
        ).toString(CryptoJS.enc.Utf8);

        const decryptedPhoneNumber = CryptoJS.AES.decrypt(
          message.PhoneNumber,
          secretPass
        ).toString(CryptoJS.enc.Utf8);

        return {
          contactID: decryptedContactId,
          FirstName: decryptedFirstName,
          LastName: decryptedLastName,
          Email: decryptedEmail,
          Text: decryptedText,
          PhoneNumber: decryptedPhoneNumber,
        };
      });

      setContact(decryptedContactData);
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
  };

  const deleteContact = async (contactID) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this contact message?"
    );
    if (confirmed) {
      await fetch(`http://localhost:5000/api/Contact/${contactID}`, {
        method: "DELETE",
      });
      const newContact = contact.filter(
        (message) => message.contactID !== contactID
      );
      setContact(newContact);
    }
  };

  useEffect(() => {
    getContactData();
  }, []);

  ////tab 5 ///////////////////////////////////////////////////////////////////////////////////////////

  const [text, setText] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      alert("No image selected.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);
    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Image uploaded successfully.");
        setSelectedImage(null);
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while uploading the image.");
    }
  };

  return (
    <div className={`admin`}>
      <div className="background">
        <Header />
        {isAdminUser ? (
          <div className="tabs-container">
            <div className="tab-header">
              <div
                className={`tab ${activeTab === 0 ? "active" : ""}`}
                onClick={() => handleTabClick(0)}
              >
                Users
              </div>
              <div
                className={`tab ${activeTab === 1 ? "active" : ""}`}
                onClick={() => handleTabClick(1)}
              >
                Content
              </div>
              <div
                className={`tab ${activeTab === 2 ? "active" : ""}`}
                onClick={() => handleTabClick(2)}
              >
                Previews
              </div>
              <div
                className={`tab ${activeTab === 3 ? "active" : ""}`}
                onClick={() => handleTabClick(3)}
              >
                Contact us
              </div>
              <div
                className={`tab ${activeTab === 4 ? "active" : ""}`}
                onClick={() => handleTabClick(4)}
              >
                QR code generator
              </div>
              <div
                className={`tab ${activeTab === 5 ? "active" : ""}`}
                onClick={() => handleTabClick(5)}
              >
                image upload
              </div>
            </div>

            {/* Tab content */}
            <div className="tab-content">
              {/* Content for Tab 1  users//////////////////////////////////////////////////// */}
              {activeTab === 0 && (
                <div className="content">
                  <table>
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.userId}>
                          <td>{user.Username}</td>
                          <td>{user.FirstName}</td>
                          <td>{user.LastName}</td>
                          <td>{user.Email}</td>
                          <td>{user.PhoneNumber}</td>
                          <td>
                            {user.isAdmin ? (
                              <button disabled>Delete</button>
                            ) : (
                              <button onClick={() => deleteUser(user.userId)}>
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Content for Tab 2   content////////////////////////////////////////////////////////////*/}
              {activeTab === 1 && (
                <div className="content">
                  <label>Actions available:</label>
                  <button onClick={() => setShowAddContentForm(true)}>
                    Add dynamic Content to Database
                  </button>
                  <br />
                  <br />
                  {showAddContentForm && (
                    <div className="add-content-form">
                      <h2>Add New Content</h2>
                      <div>
                        <form onSubmit={handleAddContentFormSubmit}>
                          <label htmlFor="title">Title:</label>
                          <input
                            type="text"
                            name="title"
                            required
                            maxLength={100}
                            style={{ marginLeft: "15%" }}
                          />
                          <br />
                          <label htmlFor="textContent">Text Content: </label>
                          <textarea
                            name="textContent"
                            required
                            maxLength={3000}
                            minLength={1}
                            style={{ marginLeft: "5%" }}
                          ></textarea>
                          <br />
                          <label htmlFor="imgRef">Image Reference:</label>
                          <input
                            type="text"
                            name="imgRef"
                            required
                            maxLength={100}
                            minLength={1}
                            style={{ marginLeft: "3%" }}
                          />
                          <br />
                          <label htmlFor="imgAlt">Image Alt:</label>
                          <input
                            type="text"
                            name="imgAlt"
                            required
                            maxLength={100}
                            minLength={1}
                            style={{ marginLeft: "10%" }}
                          />
                          <br />
                          <br />
                          <button type="button" className="cancel-button"
                            onClick={() => setShowAddContentForm(false)} > Cancel
                          </button>
                          <button type="submit" className="save-button">
                            Save
                          </button>
                        </form>
                      </div>
                    </div>
                  )}

                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Image Reference</th>
                        <th>Image Alt</th>
                        <th>Action</th>
                        <th>Text Content</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.map((item) => (
                        <tr key={item.ContentID}>
                          <td>{item.Title}</td>
                          <td>{item.imgRef}</td>
                          <td>{item.imgAlt}</td>
                          <td>
                            <button
                              onClick={() => deleteContent(item.ContentID)} >  Delete
                            </button>
                          </td>
                          <td style={{ padding: "10px" }}>
                            <button   className="edit-button"   onClick={() =>
                                setSelectedContentId(item.ContentID)  }   >   Edit
                            </button>
                          </td>
                          <td>{item.textContent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {selectedContentId && (
                    <div className="update-form">
                      <h2>Edit Content</h2>
                      <p>Currently editing: {selectedContentId}</p>
                      <form onSubmit={handleUpdateContentFormSubmit}>
                        <label htmlFor="title">Title:</label>
                        <input
                          type="text"
                          name="title"
                          value={updateContentFormData.title}
                          onChange={handleUpdateContentFormChange}
                          maxLength={100}
                          minLength={1}
                          required
                        />
                        <br />
                        <label htmlFor="textContent">Text Content:</label>
                        <textarea
                          name="textContent"
                          value={updateContentFormData.textContent}
                          onChange={handleUpdateContentFormChange}
                          maxLength={3000}
                          minLength={1}
                          required
                        ></textarea>
                        <br />
                        <label htmlFor="imgRef">Image Reference:</label>
                        <input
                          type="text"
                          name="imgRef"
                          value={updateContentFormData.imgRef}
                          onChange={handleUpdateContentFormChange}
                          maxLength={100}
                          minLength={1}
                          required
                        />
                        <br />
                        <label htmlFor="imgAlt">Image Alt:</label>
                        <input
                          type="text"
                          name="imgAlt"
                          value={updateContentFormData.imgAlt}
                          onChange={handleUpdateContentFormChange}
                          maxLength={100}
                          minLength={1}
                          required
                        />
                        <br />
                        <br />
                        <button type="button"  className="cancel-button"
                          onClick={() => setSelectedContentId(null)} > Cancel
                        </button>
                        <button type="submit" className="save-button">
                          Save
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* Content for Tab 3   preview ///////////////////////////////////////////////////////////////*/}
              {activeTab === 2 && (
                <div className="content">
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Image Reference</th>
                        <th>Image Alt</th>
                        <th>Type</th>
                        <th>Action</th>
                        <th>Text Content</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewContent.map((preview) => (
                        <tr key={preview.previewID}>
                          <td style={{ padding: "10px" }}>{preview.Title}</td>
                          <td style={{ padding: "10px" }}>{preview.imgRef}</td>
                          <td style={{ padding: "10px" }}>{preview.imgAlt}</td>
                          <td style={{ padding: "10px" }}>{preview.type}</td>
                          <td style={{ padding: "10px" }}>
                            <button className="edit-button" onClick={() =>
                                setSelectedPreviewId(preview.previewID)  } > Edit
                            </button>
                          </td>
                          <td style={{ padding: "10px" }}>
                            {preview.textContent}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {selectedPreviewId && (
                    <div className="update-form">
                      <h2>Edit Preview Content</h2>
                      <p>Currently editing row : {selectedPreviewId}</p>
                      <form onSubmit={handleUpdateFormSubmit}>
                        <label htmlFor="title">Title:</label>
                        <input
                          type="text"
                          name="title"
                          value={updateFormData.title}
                          onChange={handleUpdateFormChange}
                          maxLength={100}
                          minLength={1}
                          required
                        />
                        <br />
                        <label htmlFor="textContent">Text Content:</label>
                        <textarea
                          name="textContent"
                          value={updateFormData.textContent}
                          onChange={handleUpdateFormChange}
                          maxLength={3000}
                          minLength={1}
                          required
                        ></textarea>
                        <br />
                        <label htmlFor="imgRef">Image Reference:</label>
                        <input
                          type="text"
                          name="imgRef"
                          value={updateFormData.imgRef}
                          onChange={handleUpdateFormChange}
                          maxLength={100}
                          minLength={1}
                          required
                        />
                        <br />
                        <label htmlFor="imgAlt">Image Alt:</label>
                        <input
                          type="text"
                          name="imgAlt"
                          value={updateFormData.imgAlt}
                          onChange={handleUpdateFormChange}
                          maxLength={100}
                          minLength={1}
                          required
                        />
                        <br />
                        <br />
                        <button type="button"  className="cancel-button"
                          onClick={() => setSelectedPreviewId(null)} > Cancel
                        </button>
                        <button type="submit" className="save-button">
                          Save
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* Content for Tab 4   contact /////////////////////////////////////////////////////////////*/}
              {activeTab === 3 && (
                <div className="content">
                  <table>
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Text</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contact.map((contact) => (
                        <tr key={contact.contactID}>
                          <td>{contact.FirstName}</td>
                          <td>{contact.LastName}</td>
                          <td>{contact.Email}</td>
                          <td>{contact.Text}</td>
                          <td>{contact.PhoneNumber}</td>
                          <td>
                            <button  onClick={() => deleteContact(contact.contactID)} >Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {/* Content for Tab 5   content////////////////////////////////////////////////////////////*/}
              {activeTab === 4 && (
                <div className="content">
                  <h1>QR Code Generator</h1>
                  <div>
                    <label htmlFor="text">Enter text:</label>
                    <input
                      type="text"
                      id="text"
                      value={text}
                      onChange={handleTextChange}
                    />
                  </div>
                  <br />
                  <div>{text && <QRCode value={text} />}</div>
                </div>
              )}

              {/* Content for Tab 5   content////////////////////////////////////////////////////////////*/}
              {activeTab === 5 && (
                <div className="content">
                  image upload
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                  <div>
                    {selectedImage && (
                      <img
                        src={URL.createObjectURL(selectedImage)}alt="Uploaded" />
                    )}
                  </div>
                  <div>
                    <button onClick={uploadImage}>Upload Image</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // displayed if user is not an admin
          <div>
            <h2 className="check">
              The content of this page is not available to the current user.
            </h2>
          </div>
        )}
        <br />
        <Footer />
      </div>
    </div>
  );
};

export default Admin;

// might be useful when updating web app at later occassion 
// const deletePreview = async (previewId) => {
//   const popupConfirm = window.confirm(
//     "Are you sure you want to delete this preview?"
//   );
//   if (popupConfirm) {
//     await fetch(`http://localhost:5000/api/previewContent/${previewId}`, {
//       method: "DELETE",
//     });
//     const newPreviewContent = previewContent.filter(
//       (item) => item.previewID !== previewId
//     );
//     setPreviewContent(newPreviewContent);
//   }
// };

