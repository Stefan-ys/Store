import axios from "axios";

const HOME_URL = "http://localhost:8080/api/home";

const HomeService = () => {
    return axios
        .get(HOME_URL)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            return error;
        });
};

export default HomeService;
