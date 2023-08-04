// import React from "react";
//
// import AuthService from "../services/auth.service";
// import AuthUtils from "../utils/auth.uitil";
//
// const LogoutComponent = () => {
//     const {logout} = AuthUtils();
//     const handleLogout = async () => {
//         try {
//             await AuthService.logout();
//             logout();
//         } catch (error) {
//             console.log("Error occurred during logout: ", error);
//         }
//     };
//
//     React.useEffect(() => {
//         handleLogout();
//     }, []);
//
//     return <div>Logging out...</div>;
// };
//
// export default LogoutComponent;