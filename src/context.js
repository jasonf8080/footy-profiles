//teamLogo setTeamLogo,  for the players team image on the next page
//teamID, setTeamID,    to go back to team page from the player page

// src/context/AppContext.js
import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
 
  const [teamLogo, setTeamLogo] = useState('')
  const [teamID, setTeamID] = useState('')

  return (
    <AppContext.Provider value={{ 
        teamLogo, setTeamLogo,
        teamID, setTeamID
        }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
