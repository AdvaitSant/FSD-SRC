import React, { createContext, useState } from 'react';

// Create a User Context
export const UserContext = createContext();

// Create a User Provider Component
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};
