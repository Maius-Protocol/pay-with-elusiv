import React, { useContext, useState } from 'react';

const AppContext = React.createContext({});

const AppProvider = ({ children }) => {
  const [cluster, setCluster] = useState('devnet');

  return (
    <AppContext.Provider
      value={{
        cluster,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext<any>(AppContext);

  if (!context) {
  }
  return context;
}

export default AppProvider;
