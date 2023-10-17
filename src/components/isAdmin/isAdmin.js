import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../pages/auth/Auth';
import CryptoJS from "crypto-js";

const useIsAdmin = () => {
    const { loggedIn } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
  
    useEffect(() => {
        const fetchAdminStatus = async () => {
            try {
              const loggedInUser = loggedIn 
              if (loggedInUser) {
                const userId = await getUserId(loggedInUser);
                if (userId) {
                  const isAdminUser = await checkAdmin(userId);
                  setIsAdmin(isAdminUser);
                } else {
                  setIsAdmin(false); 
                }
              }
            } catch (error) {
              console.error('Error:', error);
              setIsAdmin(false); 
            }
          };
        fetchAdminStatus();
      }, [loggedIn]);
  

const secretPass = 'XkhZG4fW2t2W';

// get user based on username
const getUserId = async (username) => {
  try {
    const response = await fetch(`http://localhost:5000/api/username/${username}`);
    const data = await response.json();
    if (data && data.encryptedUserId) {
      const bytes = CryptoJS.AES.decrypt(data.encryptedUserId, secretPass);
      const decryptedUserId = parseInt(bytes.toString(CryptoJS.enc.Utf8), 10);
      return decryptedUserId;
    }
    return null;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

  // check if admin based on userid

  const checkAdmin = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/isadmin/${userId}`);
      const data = await response.json();
      if (data && data.isAdmin) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };

  return isAdmin;
};

export default useIsAdmin
