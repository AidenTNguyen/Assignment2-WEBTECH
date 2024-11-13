import React, { createContext, useState, useContext } from 'react';

const AuthenticationContext = createContext();

export const useAuth = () => {
    return useContext(AuthenticationContext);
};

export const AuthenticationProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <AuthenticationContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationContext;
