import axios from "axios";

const HomeService = () => {

    try {
        return axios.get("http://localhost:8080/").then(response => {
            return response.data
        });
    } catch (err) {
        let error = "";
        if (err.response) {
            error += err.response;
        }
        console.log(error);
        return error;
    }
};

export default HomeService;