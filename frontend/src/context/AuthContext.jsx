import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeSocket, disconnectSocket } from '../utils/socket';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
    token: '',
  });
  const [socket, setSocket] = useState(null);

  return (
    <AuthContext.Provider value={{  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};