import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import QRCode from 'qrcode.react';

import Footer from '../../components/footer/Footer';
import './admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };


  ///////////////////////////////////////////////////////////////

  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);

  const getUsersData = async () => {
    const userData = await fetch('http://localhost:5000/api/users', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
    }).then((res) => res.json());
    console.log(userData);
    setUsers(userData);

    const adminData = await fetch('http://localhost:5000/api/admin', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
    }).then((res) => res.json());
    console.log(adminData);
    setAdmins(adminData);
  };

  const deleteUser = async (userId) => {
    const isAdmin = admins.some((admin) => admin.userId === userId);
    if (isAdmin) {
      alert('Cannot delete admin user.');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
      });
      const newUsers = users.filter((user) => user.userId !== userId);
      setUsers(newUsers);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  // tab 2 /////////////////////////////////////////////////////////////////////////////
  const [content, setContent] = useState([]);

  const getContentData = async () => {
    const data = await fetch('http://localhost:5000/api/Content', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
    }).then((res) => res.json());
    console.log(data);
    setContent(data);
  };

  const deleteContent = async (contentId) => {
    const confirmed = window.confirm('Are you sure you want to delete this content?');
    if (confirmed) {
      await fetch(`http://localhost:5000/api/Content/${contentId}`, {
        method: 'DELETE',
      });
      const newContent = content.filter((item) => item.ContentID !== contentId);
      setContent(newContent);
    }
  };

  useEffect(() => {
    getContentData();
  }, []);

  // tab 3/////////////////////////////////////////////////////////////////////////////////////
  const [previewContent, setPreviewContent] = useState([]);

  const getPreviewData = async () => {
    const data = await fetch('http://localhost:5000/api/previewContent', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
    }).then((res) => res.json());
    console.log(data);
    setPreviewContent(data);
  };

  const deletePreview = async (previewId) => {
    const popupConfirm = window.confirm('Are you sure you want to delete this preview?');
    if (popupConfirm) {
      await fetch(`http://localhost:5000/api/previewContent/${previewId}`, {
        method: 'DELETE',
      });
      const newPreviewContent = previewContent.filter((item) => item.previewID !== previewId);
      setPreviewContent(newPreviewContent);
    }
  };

  // update form 

  const [updateFormData, setUpdateFormData] = useState({
    title: '',
    textContent: '',
    imgRef: '',
    imgAlt: '',
    type: '',
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
      alert("Invalid input: The form data contains forbidden characters.");
      return;
    }

    const response = await fetch(`http://localhost:5000/api/previewContent/${selectedPreviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateFormData),
    });

    if (response.ok) {
      const updatedPreviewContent = previewContent.map((item) => {
        if (item.previewID === selectedPreviewId) {
          return { ...item, ...updateFormData };
        }
        return item;
      });
      setPreviewContent(updatedPreviewContent);
      setUpdateFormData({
        title: '',
        textContent: '',
        imgRef: '',
        imgAlt: '',
        type: '',
      });
      setSelectedPreviewId(null);
    }
  };

  useEffect(() => {
    getPreviewData();
  }, []);

///tab 4//////////////////////////////////////////////////////////////////////////////////////

const [contact, setContact] = useState([]);

const getContactData= async () => {
  const data = await fetch('http://localhost:5000/api/Contact', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
    },
  }).then((res) => res.json());
  console.log(data);
  setContact(data);
};

const deleteContact = async (contactID) => {
  const confirmed = window.confirm('Are you sure you want to delete this contact message?');
  if (confirmed) {
    await fetch(`http://localhost:5000/api/Contact/${contactID}`, {
      method: 'DELETE',
    });
    const newContact = contact.filter((message) => message.contactID !== contactID);
    setContact(newContact);
  }
};

useEffect(() => {
  getContactData();
}, []);


////tab 5 ///////////////////////////////////////////////////////////////////////////////////////////

const [text, setText] = useState('');

const handleTextChange = (event) => {
  setText(event.target.value);
};



  return (
    <div className='background'>
      <Header/>
    <div className="tabs-container">
      <div className="tab-header">
        {/* Tab headers */}
        <div
          className={`tab ${activeTab === 0 ? 'active' : ''}`} onClick={() => handleTabClick(0)}
        >
          Users
        </div>
        <div
          className={`tab ${activeTab === 1 ? 'active' : ''}`}onClick={() => handleTabClick(1)}
        >
          Content
        </div>
        <div
          className={`tab ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}
        >
          Previews
        </div>
        <div
          className={`tab ${activeTab === 3 ? 'active' : ''}`} onClick={() => handleTabClick(3)}
        >
          Contact us
        </div>
        <div
          className={`tab ${activeTab === 4 ? 'active' : ''}`} onClick={() => handleTabClick(4)}
        >
          QR code generator 
        </div>
        <div
          className={`tab ${activeTab === 5 ? 'active' : ''}`} onClick={() => handleTabClick(5)}
        >
          image upload
        </div>

      </div>

      {/* Tab content */}
      <div className="tab-content">
        {/* Content for Tab 1  users//////////////////////////////////////////////////// */}
        {activeTab === 0 && 
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
                          <button onClick={() => deleteUser(user.userId)}>Delete</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            
            
            </div>}



        {/* Content for Tab 2   content////////////////////////////////////////////////////////////*/} 
        {activeTab === 1 && 
            <div className="content">
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
                        <button onClick={() => deleteContent(item.ContentID)}>Delete</button>
                      </td>
                      <td>{item.textContent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            

            
            </div>}



        {/* Content for Tab 3   preview ///////////////////////////////////////////////////////////////*/}
        {activeTab === 2 && 
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
                  {previewContent.map((item) => (
                     <tr key={item.previewID}>
                     <td style={{ padding: '10px' }}>{item.Title}</td>
                     <td style={{ padding: '10px' }}>{item.imgRef}</td>
                     <td style={{ padding: '10px' }}>{item.imgAlt}</td>
                     <td style={{ padding: '10px' }}>{item.type}</td>
                     <td style={{ padding: '10px' }}>
                       
                       <button className="edit-button" onClick={() => setSelectedPreviewId(item.previewID)}>
                          Edit
                        </button>
                     </td>
                     <td style={{ padding: '10px' }}>{item.textContent}</td>
                   </tr>
                  ))}
                </tbody>
              </table>
              {selectedPreviewId && (
                <div className="update-form">
                  <h2>Edit Preview Content</h2>
                  <p>Currently editing row : {selectedPreviewId}</p> {/* Add this line */}
                  <form onSubmit={handleUpdateFormSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input
                      type="text"
                      name="title"
                      value={updateFormData.title}
                      onChange={handleUpdateFormChange}
                      required
                    />
                     <br/>
                    <label htmlFor="textContent">Text Content:</label>
                    <textarea
                      name="textContent"
                      value={updateFormData.textContent}
                      onChange={handleUpdateFormChange}
                      required
                    ></textarea>
                     <br/>
                    <label htmlFor="imgRef">Image Reference:</label>
                    <input
                      type="text"
                      name="imgRef"
                      value={updateFormData.imgRef}
                      onChange={handleUpdateFormChange}
                      required
                    />
                     <br/>
                    <label htmlFor="imgAlt">Image Alt:</label>
                    <input
                      type="text"
                      name="imgAlt"
                      value={updateFormData.imgAlt}
                      onChange={handleUpdateFormChange}
                      required
                    />
                    <br/>
                    
                    <br/>
                    <button type="button" className="cancel-button" onClick={() => setSelectedPreviewId(null)}>Cancel</button> 
                    <button type="submit" className="save-button">Save</button>

                  </form>
                </div>
              )}

            </div>}




         {/* Content for Tab 4   contact /////////////////////////////////////////////////////////////*/}
         {activeTab === 3 && 
            <div className="content">
                <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th><br/>
                  <th>Text</th>
                  <th>Phone Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {contact.map((message) => (
                  <tr key={message.contactID}>
                    <td>{message.FirstName}</td>
                    <td>{message.LastName}</td>
                    <td>{message.Email}</td> <br/>
                    <td>{message.Text}</td>
                    <td>{message.PhoneNumber}</td>
                    <td>
                      <button onClick={() => deleteContact(message.contactID)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


            </div>}

          {/* Content for Tab 5   content////////////////////////////////////////////////////////////*/} 
          {activeTab === 4 && 
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
                <br/>
                <div>
                  {text && <QRCode value={text} />}
                </div>

            </div>}

          {/* Content for Tab 5   content////////////////////////////////////////////////////////////*/} 
          {activeTab === 5 && 
            <div className="content">
              image upload
            
            </div>} 

      </div>
    </div>


      <br/>
    <Footer/>
    </div>
  );
};

export default Admin;
