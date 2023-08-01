import {createContext, useState} from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [authData, setAuthData] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    return (
        <AuthContext.Provider value={{authData, setAuthData}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;