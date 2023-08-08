import React, {useState, useEffect} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import isEmail from "validator/es/lib/isEmail";
import CheckButton from "react-validation/build/button";
import styles from "../css/my-profile.module.css";
import UserService from "../services/user.service";


const MyProfileComponent = () => {

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [userData, setUserData] = useState({
        username: "john_doe",
        email: "john.doe@example.com",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "123-456-7890",
        address: {
            town: "New York",
            street: "Main Street",
            number: "123",
            postcode: "10001",
        },
    });

    useEffect(() => {
        fetchMyProfileData();
    }, []);

    const fetchMyProfileData = () => {
        setLoading(true);
        UserService.getMyProfile()
            .then((data) => {
                userData.username = data.username;
                userData.email = data.email;
                userData.firstName = data.firstName;
                userData.lastName = data.lastName;
                userData.phoneNumber = data.phoneNumber;
                setLoading(false);
            })
            .catch((error) => {
                // console.log("Error fetching user profile data: ", error);
                setMessage(error.response ? error.response.data.message : "An error has occurred.");
                setLoading(false);
            });
    };


    const handleEditClick = () => {
        setEditMode(!editMode);
        setMessage("");
    };

    const handleSaveClick = () => {
        setLoading(true);

        const requestData = {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            phoneNumber: userData.phoneNumber,
            address: {
                town: userData.address.town,
                street: userData.address.street,
                number: userData.address.number,
                postcode: userData.address.postcode,
            },
        };

        UserService.updateMyProfile(requestData)
            .then((data) => {
                setUserData(data);
                setEditMode(false);
                setLoading(false);
                setMessage("Profile updated successfully");
            })
            .catch((error) => {
                // console.log("Error updating user profile: ", error);
                setMessage(error.response ? error.response.data.message : "An error has occurred.");
                setLoading(false);
            });
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.profileBox}>
                <div className={styles.row}>
                    <span className={styles.label}>Username:</span>
                    <span className={styles.value}>{userData.username}</span>
                </div>
                <div className={styles.row}>
                    <span className={styles.label}>Email:</span>
                    {editMode ? (
                        <input
                            type="text"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            className={styles.editInput}
                        />
                    ) : (
                        <span className={styles.value}>{userData.email}</span>
                    )}
                </div>
                <div className={styles.row}>
                    <span className={styles.label}>Phone number:</span>
                    {editMode ? (
                        <input
                            type="text"
                            name="phoneNumber"
                            value={userData.phoneNumber}
                            onChange={handleChange}
                            className={styles.editInput}
                        />
                    ) : (
                        <span className={styles.value}>{userData.firstName}</span>
                    )}
                </div>
                <div className={styles.row}>
                    <span className={styles.label}>First name:</span>
                    {editMode ? (
                        <input
                            type="text"
                            name="firstName"
                            value={userData.firstName}
                            onChange={handleChange}
                            className={styles.editInput}
                        />
                    ) : (
                        <span className={styles.value}>{userData.firstName}</span>
                    )}
                </div>
                <div className={styles.row}>
                    <span className={styles.label}>Last Name:</span>
                    {editMode ? (
                        <input
                            type="text"
                            name="lastName"
                            value={userData.lastName}
                            onChange={handleChange}
                            className={styles.editInput}
                        />
                    ) : (
                        <span className={styles.value}>{userData.lastName}</span>
                    )}
                </div>
            </div>
            {message && <div className={styles.alert}>{message}</div>}
            <button
                className={editMode ? styles.saveButton : styles.editButton}
                onClick={editMode ? handleSaveClick : handleEditClick}
                disabled={loading}
            >
                {loading ? "Loading..." : editMode ? "Save" : "Edit"}
            </button>
        </div>
    );
};

export default MyProfileComponent;