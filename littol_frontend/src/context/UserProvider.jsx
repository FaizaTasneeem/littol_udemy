import { useState } from 'react';
import { UserContext } from './AppContext';

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  return (
    <UserContext.Provider value={{ user, accessToken, setUser, setAccessToken }}>
      {children}
    </UserContext.Provider>
  );
}
