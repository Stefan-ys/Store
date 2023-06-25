class AuthenticationService {
    registerSuccessfulLoginUser(username) {
        sessionStorage.setItem("authenticatedUser", username);
        sessionStorage.setItem("role", "user");
        console.log("Successful login");
    }

    logout() {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload(false);
    }

    isUserLoggedIn() {
        let role = sessionStorage.getItem("role");
        return role === "user";
    }

    getLoggedInUser() {
        let username = sessionStorage.getItem("authenticatedUser");
        return username == null ? "" : username;
    }

    setUpToken(jwtToken) {
        localStorage.setItem("token", jwtToken);
    }
}

export default new AuthenticationService();