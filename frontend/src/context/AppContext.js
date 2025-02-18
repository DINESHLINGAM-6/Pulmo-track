"use client";  // Add this line at the top

import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [reports, setReports] = useState([]);

  return (
    <AppContext.Provider value={{ userData, setUserData, reports, setReports }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
