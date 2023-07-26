
class AuthenticationService {
    static ROLES = {
        USER: "ROLE_USER",
        ADMIN: "ROLE_ADMIN",
        MODERATOR: "ROLE_MODERATOR"
    };


    static isAuthenticated() {
        const token = localStorage.getItem("accessToken");
        return !!token;
    }

    static hasRole(role) {
        const roles = JSON.parse(sessionStorage.getItem("roles"));
        return roles && roles.include(role);
    }

    static getUsername() {
        return sessionStorage.getItem("username") || "";
    }

    static setUpToken(jwtToken) {
        localStorage.setItem("accessToken", jwtToken);
    }

    static logout() {
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("roles");
        sessionStorage.removeItem("username");
        window.location.reload(false);
    }
}

export default AuthenticationService;