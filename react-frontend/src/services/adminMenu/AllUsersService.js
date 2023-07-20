import axios from "axios";

const AllUsersService = async () => {
    try {
        const response = await axios.get("http://localhost:8080/users");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
export default AllUsersService;
