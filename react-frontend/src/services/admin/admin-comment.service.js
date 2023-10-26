import axios from "axios";
import authHeader from "../auth-header";


const API_ADMIN_COMMENT_URL = "http://localhost:8080//api/admin/comments";

const getAllComments = () => {
    return axios
        .get(API_ADMIN_COMMENT_URL + "/all-comments", {headers: authHeader()})
        .then((response) => response.data)
        .catch((error) => {
            console.log("Axios error: ", error);
            throw error;
        });
};

const getCommentsByUser = (userId) => {
    return axios
        .get(API_ADMIN_COMMENT_URL + "/comments-by-user" + userId, {headers: authHeader()})
        .then((response) => response.data)
        .catch((error) => {
            console.log("Axios error: ", error);
            throw error;
        });
};

const deleteComment = (commentId) => {
    return axios
        .get(API_ADMIN_COMMENT_URL + "/delete-comment" + commentId, {headers: authHeader()})
        .then((response) => response.data)
        .catch((error) => {
            console.log("Axios error: ", error);
            throw error;
        });
};

const AdminCommentService = {getAllComments, getCommentsByUser, deleteComment};

export default AdminCommentService;