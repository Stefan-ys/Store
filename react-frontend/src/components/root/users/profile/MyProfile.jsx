import React, {useState} from "react";
import styles from "../../../../css/MyProfile.module.css";
import MyProfileService from "../../../../services/profile/MyProfileService";

const MyProfile = ({accessToken}) => {
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState({
        username: "john_doe",
        email: "john.doe@example.com",
        phoneNumber: "123-456-7890",
        address: {
            town: "New York",
            street: "Main Street",
            number: "123",
            postcode: "10001",
        },
        firstName: "John",
        lastName: "Doe",
    });

    const fetchMyProfileData = () => {
        MyProfileService.getMyProfile(accessToken)
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => {
                console.log("Error fetching user profile data: ", error);
            });
    }


    const handleEditClick = () => {
        setEditMode(!editMode);
    }
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
                    <span className={styles.label}>Telephone Number:</span>
                    {editMode ? (
                        <input
                            type="text"
                            name="phoneNumber"
                            value={userData.phoneNumber}
                            onChange={handleChange}
                            className={styles.editInput}
                        />
                    ) : (
                        <span className={styles.value}>{userData.phoneNumber}</span>
                    )}
                </div>
                <div className={styles.row}>
                    <span className={styles.label}>Address:</span>
                    {editMode ? (
                        <div>
                            <input
                                type="text"
                                name="town"
                                value={userData.address.town}
                                onChange={handleChange}
                                className={styles.editInput}
                            />
                            <input
                                type="text"
                                name="street"
                                value={userData.address.street}
                                onChange={handleChange}
                                className={styles.editInput}
                            />
                            <input
                                type="text"
                                name="number"
                                value={userData.address.number}
                                onChange={handleChange}
                                className={styles.editInput}
                            />
                            <input
                                type="text"
                                name="postcode"
                                value={userData.address.postcode}
                                onChange={handleChange}
                                className={styles.editInput}
                            />
                        </div>
                    ) : (
                        <span className={styles.value}>
              {userData.address.town}, {userData.address.street} {userData.address.number}, {userData.address.postcode}
            </span>
                    )}
                </div>
                <div className={styles.row}>
                    <span className={styles.label}>First Name:</span>
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
            <button
                className={editMode ? styles.saveButton : styles.editButton}
                onClick={editMode}>
                {editMode ? "Save" : "Edit"}
            </button>
        </div>
    );
};

export default MyProfile;