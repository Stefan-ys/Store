import React from "react";

import AuthService from "../../../services/AuthService";
import AuthUtils from "../../../utils/AuthenticationUtil";

const Logout = () => {
    const {logout} = AuthUtils();
    const handleLogout = async () => {
        try {
            await AuthService.logout();
            logout();
        } catch (error) {
            console.log("Error occurred during logout: ", error);
        }
    };

    React.useEffect(() => {
        handleLogout();
    }, []);

    return <div>Logging out...</div>;
};

export default Logout;