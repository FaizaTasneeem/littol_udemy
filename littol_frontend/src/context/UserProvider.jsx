import { useState } from 'react';
import { UserContext } from './AppContext';

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  return (
    <UserContext.Provider value={{ user, accessToken, previewUrl, setUser, setAccessToken, setPreviewUrl }}>
      {children}
    </UserContext.Provider>
  );
}
