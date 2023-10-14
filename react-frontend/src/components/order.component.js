import React, { useState, useEffect } from 'react';
import styles from '../css/order.module.css';
import { useShoppingCart } from '../hooks/shopping-cart.hook';
import { withRouter } from '../common/with-router';
import useAuth from "../hooks/auth.hook";
import ShoppingCartService from '../services/shopping-cart.service';
import UserService from '../services/user.service';
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";


const emptyAddress = {
    firstName: "", lastName: "", phoneNumber: "", email: "", country: "", state: "",
    town: "", postcode: "", street: "", number: "", floor: "", additionalInfo: "",
};

const emptyOrder = {
    products: [], deliveryPrice: 0,
    totalPrice: 0, totalProducts: 0, totalWeight: 0,
};

const fieldsArr = {
    addressField: true, deliveryField: false, paymentField: false,
}

const Order = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [orderContent, setOrderContent] = useState(emptyOrder);
    const [deliveryAddressData, setDeliveryAddressData] = useState(emptyAddress);
    const [paymentAddressData, setPaymentAddressData] = useState(emptyAddress);
    const [editMode, setEditMode] = useState(true);

    const [fields, setFields] = useState(fieldsArr);

    const { shoppingCart } = useShoppingCart();
    const { isLoggedIn } = useAuth();


    useEffect(() => {
        fetchOrderContent();
        if (!isLoggedIn) {
            fetchAddress();
        }
    }, []);


    const fetchOrderContent = async () => {
        setLoading(true);
        setMessage("");
        try {
            const orderContentData = await ShoppingCartService.getProducts();
            setOrderContent(orderContentData);
        } catch (error) {
            console.log(error);
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handlePlaceOrder = () => { }

    const fetchAddress = async () => {
        setLoading(true);
        setMessage("");
        try {
            const paymentAddress = await UserService.getMyAddress("payment");
            setPaymentAddressData(paymentAddress);
            const deliveryAddress = await UserService.getMyAddress("delivery");
            setDeliveryAddressData(deliveryAddress);
        } catch (error) {
            console.log(error)
            setMessage(error.message);
        } finally {
            setLoading((prevLoading) => ({ ...prevLoading, payment: false }));
        }
    }

    const handleSaveClick = async (param, data) => {
        setLoading(true);
        setMessage("");
        try {
            await UserService.updateMyAddress(data, param);
            setMessage("address updated successfully");
        } catch (error) {
            console.log(error);
            setMessage(error);
        } finally {
            setLoading(false);
        }
    }

    const handleAddressChange = (type) => (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        const addressData = type === "payment" ? paymentAddressData : deliveryAddressData;
        const updatedAddress = { ...addressData, [name]: value };
        if (type === "payment") {
            setPaymentAddressData(updatedAddress);
        } else if (type === "delivery") {
            setDeliveryAddressData(updatedAddress);
        }
    }

    const camelCaseToNormal = (fieldName) => {
        const words = fieldName
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .split(/[_\s]+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

        return words.join(" ");
    }

    const renderAddressContainer = (param, addressData) => (
        <div className={param === "payment" ? styles.paymentAddressContainer : styles.deliveryAddressContainer}>
            <div className={styles.addressBox}>
                <Form>
                    <h2>{camelCaseToNormal(param) + " Address"}</h2>
                    {message && <div className={styles.alert}>{message}</div>}
                    {Object.entries(addressData).map(([fieldName, fieldValue]) => (
                        <div className={styles.row} key={fieldName}>
                            <span className={styles.label}>{camelCaseToNormal(fieldName)}:</span>
                            {editMode ? (
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
                </Form>
            </div>
        </div>
    );

    const isAddressComplete = (address) => {
        const mandatoryFields = Object.keys(emptyAddress).slice(0, -2);
        return mandatoryFields.every(field => !!address[field]);
    }

    const isPaymentAddressComplete = isAddressComplete(paymentAddressData);
    const isDeliveryAddressComplete = isAddressComplete(deliveryAddressData);

    const isNextButtonEnabled = fields.addressField && isPaymentAddressComplete && isDeliveryAddressComplete;



    const renderButtons = (param, addressData) => {
        return (
            <div className={styles.buttonsContainer}>
                <button className={styles.prevNextButton} disabled>Previous</button>
                <button className={styles.prevNextButton} disabled={!isNextButtonEnabled}>Next</button>
            </div>
        );
    }
    const handlePrevClick = (fieldName) => {

    }

    const handleNextClick = (fieldName) => {

    }

    const renderFieldsContainer = () => {

        if (fields.addressField) {
            return (
                <div className={styles.addressFieldsContainer}>
                    <div className={styles.addressField}>
                        {renderAddressContainer("payment", paymentAddressData, "Payment")}
                    </div>
                    <div className={styles.addressField}>
                        {renderAddressContainer("delivery", deliveryAddressData, "Delivery")}
                    </div>
                </div>
            );
        } else if (fields.deliveryField) {

        } else if (fields.paymentField) {

        }
    }


    const renderShortlist = () => {
        return (
            <div className={styles.orderPresentationContainer}>
                <div className={styles.totalSummaryContainer}>
                    <div>Total Products: {orderContent.totalProducts}</div>
                    <div>Delivery Price: ${orderContent.deliveryPrice}</div>
                    <div>Total Price: ${orderContent.totalPrice}</div>
                </div>

                <div className={styles.productListContainer}>
                    <h2>Products</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderContent.products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.productName}</td>
                                    <td>{product.quantity}</td>
                                    <td>${product.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };



    return (
        <div className={styles.orderContainer}>
            <div className={styles.shortlist}>
                <h2>Summary</h2>
                {renderShortlist()}
            </div>

            <div className={styles.fieldsContainer}>
                <h2>Payment And Delivery</h2>
                {renderFieldsContainer()}
                {renderButtons()}
            </div>

            <button className={styles.placeOrderButton} onClick={handlePlaceOrder}>
                Place Order
            </button>
        </div>
    );
};


export default withRouter(Order);
