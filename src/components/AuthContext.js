// AuthContext.js
import React, { createContext, useContext } from 'react';
import LocalStorageDelete from "../Resources/localStorage";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children , setSignedIn }) => {
    const handleSignOut = () => {
            LocalStorageDelete();
            setSignedIn(false);
    };

    return (
        <AuthContext.Provider value={{ handleSignOut , setSignedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
