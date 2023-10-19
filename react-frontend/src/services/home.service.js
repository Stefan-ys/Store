import axios from "axios";
import authHeader from "./auth-header";


const API_HOME_URL = "http://localhost:8080/api/home";

const getProducts = () => {
    return axios
        .get(API_HOME_URL + "/products", { headers: authHeader() })
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
