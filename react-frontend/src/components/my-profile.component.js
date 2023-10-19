import React, {useState, useEffect} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import styles from "../css/my-profile.module.css";
import UserService from "../services/user.service";
import Menu from "../utils/menu.util";
import {withRouter} from "../common/with-router";


const emptyProfile = {
    username: "", email: "", firstName: "",
    lastName: "", phoneNumber: "",
};

const emptyAddress = {
    firstName: "", lastName: "", phoneNumber: "", email: "", country: "", state: "",
    town: "", postcode: "", street: "", number: "", floor: "", additionalInfo: "",
};

const initialState = {profile: false, payment: false, delivery: false};

const MyProfile = () => {
    const [profileData, setProfileData] = useState(emptyProfile);
    const [paymentAddressData, setPaymentAddressData] = useState(emptyAddress);
    const [deliveryAddressData, setDeliveryAddressData] = useState(emptyAddress);
    const [visibility, setVisibility] = useState({...initialState, profile: true});
    const [loading, setLoading] = useState(initialState);
    const [message, setMessage] = useState(initialState);
    const [editMode, setEditMode] = useState(initialState);

    useEffect(() => {
        fetchMyProfileData();
    }, []);

    const fetchMyProfileData = async () => {
        setVisibility({...initialState, profile: true});
        setLoading({profile: true,});
        setMessage({profile: "",});

        try {
            const profile = await UserService.getMyProfile();
            setProfileData(profile);
        } catch (error) {
            handleErrorMessage("profile", error);
        } finally {
            setLoading((prevLoading) => ({...prevLoading, profile: false}));
        }
    };

    const fetchMyPaymentAddress = async () => {
        setVisibility({...initialState, payment: true});
        setLoading({payment: true,});
        setMessage({payment: "",});

        try {
            const paymentAddress = await UserService.getMyAddress("payment");
            setPaymentAddressData(paymentAddress);
        } catch (error) {
            handleErrorMessage("payment", error);
        } finally {
            setLoading((prevLoading) => ({...prevLoading, payment: false}));
        }
    };

    const fetchMyDeliveryAddress = async () => {
        setVisibility({...initialState, delivery: true});
        setLoading({delivery: true,});
        setMessage({delivery: "",});

        try {
            const deliveryAddress = await UserService.getMyAddress("delivery");
            setDeliveryAddressData(deliveryAddress);
        } catch (error) {
            handleErrorMessage("delivery", error);
        } finally {
            setLoading((prevLoading) => ({...prevLoading, delivery: false}));
        }
    };

    const handleErrorMessage = (type, error) => {
        const responseMessage = error.response?.data?.message || error.message || error.toString();
        setMessage((prevMessage) => ({...prevMessage, [type]: responseMessage}));
    };

    const handleEditClick = (param) => {
        setEditMode((prevEditMode) => ({...prevEditMode, [param]: !prevEditMode[param]}));
        setMessage((prevMessage) => ({...prevMessage, [param]: ""}));
    };

    const handleSaveClick = async (param, data) => {
        setLoading((prevLoading) => ({...prevLoading, [param]: true}));
        try {
            if (param === "profile") {
                await UserService.updateMyProfile(data);
            } else {
                await UserService.updateMyAddress(data, param);
            }
            setMessage((prevMessage) => ({...prevMessage, [param]: `${param} data updated successfully.`}));
            setEditMode((prevEditMode) => ({...prevEditMode, [param]: false}));
        } catch (error) {
            handleErrorMessage(param, error);
        } finally {
            setLoading((prevLoading) => ({...prevLoading, [param]: false}));
        }
    };

    const handleProfileChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        const updatedProfileData = {...profileData, [name]: value};
        setProfileData(updatedProfileData);
    };

    const handleAddressChange = (type) => (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        const addressData = type === "payment" ? paymentAddressData : deliveryAddressData;
        const updatedAddress = {...addressData, [name]: value};
        if (type === "payment") {
            setPaymentAddressData(updatedAddress);
        } else if (type === "delivery") {
            setDeliveryAddressData(updatedAddress);
        }
    };

    const camelCaseToNormal = (fieldName) => {
        const words = fieldName
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .split(/[_\s]+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

        return words.join(" ");
    };

    const menuItems = [
        {
            name: "My Profile",
            items: [
                {label: "My Profile", action: fetchMyProfileData,},
                {label: "Delivery Address", action: fetchMyDeliveryAddress},
                {label: "Payment Address", action: fetchMyPaymentAddress},
            ],
        },
        {
            name: "My Orders",
            items: [
                // { label: "All Order", action: "getMyOrders" },
                // { label: "Current Orders", action: "getMyCurrentOrders" },
                // { label: "Completed Orders", action: "getMyCompletedOrders" },
            ],
        },
        {
            name: "Notifications",
            action: "getMyNotifications",
        },
    ];

    const renderButtons = (param, data) => (
        <div className={styles.buttons}>
            {editMode[param] ? (
                <div className={styles.buttons}>
                    <button
                        className={styles.cancelButton}
                        onClick={() => handleEditClick(param)}
                        disabled={loading[param]}
                    >
                        Cancel
                    </button>
                    <button
                        className={styles.saveButton}
                        onClick={() => handleSaveClick(param, data)}
                        disabled={loading[param]}
                    >
                        Save
                    </button>
                </div>
            ) : (
                <button
                    className={styles.button}
                    onClick={() => handleEditClick(param)}
                    disabled={loading[param]}>
                    {loading[param] ? (<span className={styles.spinner}></span>) : <span> Edit </span>}
                </button>)}
        </div>
    );

    const renderProfileContainer = () => (
        <div className={styles.profileContainer}>
            <div className={styles.profileBox}>
                <Form>
                    <h2>My Profile</h2>
                    {message.profile && <div className={styles.alert}>{message.profile}</div>}
                    <div className={styles.row}>
                        <span className={styles.label}>Username:</span>
                        <span className={styles.value}>{profileData.username}</span>
                    </div>
                    {Object.entries(profileData).map(([fieldName, fieldValue]) => (
                        fieldName !== "username" && (
                            <div className={styles.row} key={fieldName}>
                                <span
                                    className={styles.label}>{camelCaseToNormal(fieldName)}:</span>
                                {editMode.profile ? (
                                    <Input
                                        type="text"
                                        name={fieldName}
                                        value={fieldValue}
                                        onChange={handleProfileChange}
                                        className={styles.editInput}
                                    />
                                ) : (
                                    <span className={styles.value}>{fieldValue}</span>
                                )}
                            </div>
                        )))}
                    {renderButtons("profile", profileData)}
                </Form>
            </div>
        </div>
    );

    const renderAddressContainer = (param, addressData) => (
        <div className={param === "payment" ? styles.paymentAddressContainer : styles.deliveryAddressContainer}>
            <div className={styles.addressBox}>
                <Form>
                    <h2>{camelCaseToNormal(param) + " Address"}</h2>
                    {message[param] && <div className={styles.alert}>{message[param]}</div>}
                    {Object.entries(addressData).map(([fieldName, fieldValue]) => (
                        <div className={styles.row} key={fieldName}>
                            <span className={styles.label}>{camelCaseToNormal(fieldName)}:</span>
                            {editMode[param] ? (
                                <Input
                                    type="text"
                                    name={fieldName}
                                    value={fieldValue}
                                    onChange={handleAddressChange(param)}
                                    className={styles.editInput}
                                />
                            ) : (
                                <span className={styles.value}>{fieldValue}</span>
                            )}
                        </div>
                    ))}
                    {renderButtons(param, addressData)}
                </Form>
            </div>
        </div>
    );

    return (<>
            <div className={styles['menu-page']}>
                <Menu menuItems={menuItems}/>
            </div>
            <section className={styles.section}>
                {visibility.profile && renderProfileContainer()}
                {visibility.payment && renderAddressContainer("payment", paymentAddressData)}
                {visibility.delivery && renderAddressContainer("delivery", deliveryAddressData)}
            </section>
        </>
    );
};

export default withRouter(MyProfile);

