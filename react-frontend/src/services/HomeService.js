import axios from "axios";

const HomeService = () => {
    return axios
        .get("http://localhost:8080/")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            return error;
        });
};

export default HomeService;
