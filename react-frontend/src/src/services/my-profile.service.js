import axios from "axios";

const MY_PROFILE_URL = "http://localhost:8080/api/users/myProfile";

class MyProfileService {
    static getMyProfile(username, accessToken) {
        const headers = {
            Authorization: "Bearer ${accessToken}",
        };

        return axios
            .get(MY_PROFILE_URL, {headers})
            .then((response) => response.data)
            .catch((error) => {
                throw error;
            });
    }
}

export default MyProfileService;