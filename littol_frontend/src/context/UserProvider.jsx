import { useState, useEffect } from 'react';
import { UserContext } from './AppContext';
import { sendEditProfileRequest } from '../services/authService';

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    async function updateProfile() {
      if (user){
        try {
            const response = await sendEditProfileRequest(user);
            console.log("✅ User updated successfully !!!", response);
        }
        catch (err) {
            console.log("❌ User update failed. Please try again...", err);
        }
      } 
    };
    updateProfile();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, accessToken, setUser, setAccessToken }}>
      {children}
    </UserContext.Provider>
  );
}
