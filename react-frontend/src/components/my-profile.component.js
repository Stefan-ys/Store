import React, { useState, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import isEmail from "validator/es/lib/isEmail";
import styles from "../css/my-profile.module.css";
import UserService from "../services/user.service";
import { withRouter } from "../common/with-router";
import data from "bootstrap/js/src/dom/data";

const required = (value) => {
    if (!value) {
        return <div className={styles.danger}>This field is required!</div>;
    }
};

const MyProfile = () => {
    const [messageProfile, setMessageProfile] = useState("");
    const [messagePayment, setMessagePayment] = useState("");
    const [messageDelivery, setMessageDelivery] = useState("");
    const [loading, setLoading] = useState(false);
    const [profileEditMode, setProfileEditMode] = useState(false);
    const [paymentEditMode, setPaymentEditMode] = useState(false);
    const [deliveryEditMode, setDeliveryEditMode] = useState(false);

    const [userData, setUserData] = useState({
        username: "john_doe",
        email: "john.doe@example.com",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "123-456-7890",
    });

    const [paymentAddress, setPaymentAddress] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        country: "",
        state: "",
        town: "",
        postcode: "",
        street: "",
        number: "",
        floor: "",
        additionalInfo: "",
    })
    const [deliveryAddress, setDeliveryAddress] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        country: "",
        state: "",
        town: "",
        postcode: "",
        street: "",
        number: "",
        floor: "",
        additionalInfo: "",
    })

    useEffect(() => {
        fetchMyProfileData();
    }, []);

    const fetchMyProfileData = async () => {
        setMessageProfile("");
        setMessageProfile("");
        setMessageDelivery("");
        setLoading(true);

        try {
            const profileData = await UserService.getMyProfile();
            setUserData({
                username: profileData.username,
                email: profileData.email,
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                phoneNumber: profileData.phoneNumber,
            });
        } catch (error) {
            const responseMessage = error.response?.data?.message || error.message || error.toString();
            console.log(responseMessage);
            setMessageProfile(responseMessage);
        };

        try {
            const paymentAddressData = await UserService.getMyAddress("payment");
            setPaymentAddress({
                firstName: paymentAddressData.firstName,
                lastName: paymentAddressData.lastName,
                phoneNumber: paymentAddressData.phoneNumber,
                email: paymentAddressData.email,
                country: paymentAddressData.country,
                state: paymentAddressData.state,
                town: paymentAddressData.town,
                postcode: paymentAddressData.postcode,
                street: paymentAddressData.street,
                number: paymentAddressData.number,
                floor: paymentAddressData.floor,
                additionalInfo: paymentAddressData.additionalInfo,
            });


        } catch (error) {
            const responseMessage = error.response?.data?.message || error.message || error.toString();
            console.log(responseMessage);
            setMessagePayment(responseMessage);
        };

        try {
            const deliveryAddressData = await UserService.getMyAddress("delivery");
            setDeliveryAddress({
                firstName: deliveryAddressData.firstName,
                lastName: deliveryAddressData.lastName,
                phoneNumber: deliveryAddressData.phoneNumber,
                email: deliveryAddressData.email,
                country: deliveryAddressData.country,
                state: deliveryAddressData.state,
                town: deliveryAddressData.town,
                postcode: deliveryAddressData.postcode,
                street: deliveryAddressData.street,
                number: deliveryAddressData.number,
                floor: deliveryAddressData.floor,
                additionalInfo: deliveryAddressData.additionalInfo,
            });
        } catch (error) {
            const responseMessage = error.response?.data?.message || error.message || error.toString();
            console.log(responseMessage);
            setMessageDelivery(responseMessage);
        };
        setLoading(false);

    };

    const handleEditProfileClick = (event) => {
        event.preventDefault();
        setProfileEditMode(!profileEditMode);
        setMessageProfile("");
    };

    const handleEditPaymentClick = (event) => {
        event.preventDefault();
        setPaymentEditMode(!paymentEditMode);
        setMessagePayment("");
    };

    const handleEditDeliveryClick = (event) => {
        event.preventDefault();
        setDeliveryEditMode(!deliveryEditMode);
        setMessageDelivery("");
    };

    const handleSaveClick = (param) => {
        setLoading(true);
        if (param === "profile") {
            try {
                UserService.updateMyProfile(userData);
                setMessageProfile("Profile data updated successfully.");
                setProfileEditMode(false);
            } catch (error) {
                const responseMessage = error.response?.data?.message || error.message || error.toString();
                setMessageProfile(responseMessage);
            } finally {
                setLoading(false);
            }
        }
        else if (param === "paymentAddress") {
            try {
                UserService.updateMyAddress(paymentAddress, "payment");
                setMessagePayment("Payment address updated successfully.");
                setPaymentEditMode(false);
            } catch (error) {
                const responseMessage = error.response?.data?.message || error.message || error.toString();
                setMessagePayment(responseMessage);
            } finally {
                setLoading(false);
            }
        } else if (param === "deliveryAddress") {
            try {
                UserService.updateMyAddress(deliveryAddress, "delivery");
                setMessageDelivery("Delivery address updated successfully.");
                setDeliveryEditMode(false);
            } catch (error) {
                const responseMessage = error.response?.data?.message || error.message || error.toString();
                setMessageDelivery(responseMessage);
            } finally {
                setLoading(false);
            }
        }

    };

    const handleAddressChange = (addressType) => (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        if (addressType === "payment") {
            setPaymentAddress((prevPaymentAddress) => ({
                ...prevPaymentAddress,
                [name]: value,
            }));
        } else if (addressType === "delivery") {
            setDeliveryAddress((prevDeliveryAddress) => ({
                ...prevDeliveryAddress,
                [name]: value,
            }));
        }
    };

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const camelCaseToNormal = (fieldName) => {
        return fieldName
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/^./, (str) => str.toUpperCase());
    };

    const buttons = (handleEditClick, editMode) => (
        <div className={styles.buttons}>
            {editMode && (
                <button
                    className={styles.cancelButton}
                    onClick={handleEditClick}
                    disabled={loading}
                >
                    Cancel
                </button>
            )}
            <button
                className={editMode ? styles.saveButton : styles.editButton}
                onClick={editMode ? handleSaveClick : handleEditClick}
                disabled={loading}
            >
                {loading ? "Loading..." : editMode ? "Save" : "Edit"}
            </button>
        </div>
    );

    const profileContainer = (
        <div className={styles.profileContainer}>
            <div className={styles.profileBox}>
                <Form>
                    <h2>My Profile</h2>
                    {messageProfile && <div className={styles.alert}>{messageProfile}</div>}
                    <div className={styles.row}>
                        <span className={styles.label}>Username:</span>
                        <span className={styles.value}>{userData.username}</span>
                    </div>
                    {Object.entries(userData).map(([fieldName, fieldValue]) => (
                        fieldName !== "username" && (
                            <div className={styles.row} key={fieldName}>
                                <span
                                    className={styles.label}>{camelCaseToNormal(fieldName)}:</span>
                                {profileEditMode ? (
                                    <Input
                                        type="text"
                                        name={fieldName}
                                        value={fieldValue}
                                        onChange={handleChange}
                                        className={styles.editInput}
                                    />
                                ) : (
                                    <span className={styles.value}>{fieldValue}</span>
                                )}
                            </div>
                        )))}
                    {buttons(handleEditProfileClick, profileEditMode)}
                </Form>
            </div>
        </div>
    );

    const addressContainer = (headerName, address, editMode, handleEditClick) => (
        <div className={headerName === "Payment Address" ? styles.paymentAddressContainer : styles.deliveryAddressContainer}>
            <div className={styles.addressBox}>
                <Form>
                    <h2>{headerName}</h2>
                    {(headerName === "Payment Address" ? messagePayment : messageDelivery) && <div className={styles.alert}>{headerName === "Payment Address" ? messagePayment : messageDelivery}</div>}
                    {Object.entries(address).map(([fieldName, fieldValue]) => (
                        <div className={styles.row} key={fieldName}>
                            <span className={styles.label}>{camelCaseToNormal(fieldName)}:</span>
                            {(headerName === "Payment Address" ? paymentEditMode : deliveryEditMode) ? (
                                <Input
                                    type="text"
                                    name={fieldName}
                                    value={fieldValue}
                                    onChange={handleAddressChange(headerName === "Payment Address" ? "payment" : "delivery")}
                                    className={styles.editInput}
                                />
                            ) : (
                                <span className={styles.value}>{fieldValue}</span>
                            )}
                        </div>
                    ))}
                    {buttons((headerName === "Payment Address" ? handleEditPaymentClick : handleEditDeliveryClick), (headerName === "Payment Address" ? paymentEditMode : deliveryEditMode))}
                </Form>
            </div>
        </div>
    );

    return (
        <section className={styles.section}>
            {profileContainer}
            {addressContainer("Payment Address", paymentAddress, paymentEditMode, handleEditPaymentClick)}
            {addressContainer("Delivery Address", deliveryAddress, deliveryEditMode, handleEditDeliveryClick)}
        </section>
    );
};

export default withRouter(MyProfile);
