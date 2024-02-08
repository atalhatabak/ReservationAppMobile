// AppContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface UserData {
  apiUrl: string;
  name: string;
  role: string;
  token: string;
  user_id: string;
  data: string;
}

interface AppContextProps {
  appData: UserData;
  setAppData: React.Dispatch<React.SetStateAction<UserData>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC = ({ children }) => {
  const [appData, setAppData] = useState<UserData>({
    apiUrl:"http://10.0.2.2:8000",
    name: '',
    role: '',
    token: '',
    user_id: '',
    data:'' ,
  });

  const value: AppContextProps = {
    appData,
    setAppData,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
