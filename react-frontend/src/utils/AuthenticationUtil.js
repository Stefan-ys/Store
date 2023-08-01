import {useContext} from "react";
import AuthContext from "../context/AuthProvider"

const AuthUtils = () => {
    const {authData, setAuthData} = useContext(AuthContext);

    const isAuthenticated = () => {
        return authData.accessToken !== undefined;
    };

    const isAdmin = () => {
        return authData.roles.includes("ROLE_ADMIN");
    };

    const isModerator = () => {
        return authData.roles.includes("ROLE_MODERATOR");
    };

    const getUsername = () => {
        return authData.username;
    };

    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        setAuthData({});
    };

    return {
        isAuthenticated,
        isAdmin,
        isModerator,
        getUsername,
        logout,
    };
};

export default AuthUtils;