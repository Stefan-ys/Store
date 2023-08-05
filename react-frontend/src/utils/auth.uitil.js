const AuthUtil = {
    isLoggedIn() {
        return !!sessionStorage.getItem("user");
    },

    getUsername() {
        try {
            const user = JSON.parse(sessionStorage.getItem("user"));
            return user.username;
        } catch (error) {
            return "guest";
        }
    },

    isAdmin() {
        try {
            const user = JSON.parse(sessionStorage.getItem("user"));
            return user.roles.includes("ROLE_ADMIN");
        } catch (error) {
            return false;
        }

    },

    isModerator() {
        try {
            const user = JSON.parse(sessionStorage.getItem("user"));
            return user.roles.includes("ROLE_MODERATOR");
        } catch (error) {
            return false;
        }
    },
}

export default AuthUtil;