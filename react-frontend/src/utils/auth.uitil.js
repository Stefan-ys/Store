class AuthUtil {
    isLoggedIn() {

        return sessionStorage.getItem("user") !== null;
    }

    getUsername() {
        if (this.isLoggedIn()) {
            console.log(JSON.parse(sessionStorage.getItem("user")));
            const user = JSON.parse(sessionStorage.getItem("user"));
            return user.username;
        }
        return "guest";
    }

    isAdmin() {
        if (this.isLoggedIn()) {
            const user = JSON.parse(sessionStorage.getItem("user"));
            return user.roles.includes("ROLE_ADMIN");
        }
        return false;
    }

    isModerator() {
        if (this.isLoggedIn()) {
            const user = JSON.parse(sessionStorage.getItem("user"));
            return user.roles.includes("ROLE_MODERATOR");
        }
        return false;
    }
}

export default new AuthUtil();