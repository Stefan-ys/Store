import axios from "axios";
import authHeader from "./auth-header";

const HOME_URL = "http://localhost:8080/api/home";

const getProducts = () => {
    return axios
        .get(HOME_URL + "/products", { headers: authHeader() })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            return error;
        });
};


const HomeService = { getProducts };
export default HomeService;
