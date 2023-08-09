export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.accessToken) {
        console.log(JSON.stringify(user));
        return {Authorization: "Bearer " + user.accessToken};
    } else {
        return {};
    }
}