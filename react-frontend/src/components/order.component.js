import React, { useState, useEffect } from 'react';
import styles from '../css/order.module.css';
import { withRouter } from '../common/with-router';
import useAuth from "../hooks/auth.hook";
import InfoButton from "../utils/info-button.util";
import ShoppingCartService from '../services/shopping-cart.service';
import UserService from '../services/user.service';
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import OrderService from '../services/order.service';


const emptyAddress = {
    firstName: "", lastName: "", phoneNumber: "", email: "", country: "", state: "",
    town: "", postcode: "", street: "", number: "", floor: "", additionalInfo: "",
};

const emptyOrder = {
    products: [], deliveryPrice: 0,
    totalPrice: 0, totalProducts: 0, totalWeight: 0,
};

const POSTEO_COST = 10;
const POSTEO_FREE_DELIVERY = 70;

const DELIVERO_COST = 15;
const DELIVERO_FREE_DELIVERY = 50;

const Order = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [orderContent, setOrderContent] = useState(emptyOrder);
    const [deliveryAddressData, setDeliveryAddressData] = useState(emptyAddress);
    const [paymentAddressData, setPaymentAddressData] = useState(emptyAddress);
    const [page, setPage] = useState(1);
    const [deliveryMethod, setDeliveryMethod] = useState("pickup");

    const { isLoggedIn } = useAuth();

    useEffect(() => {
        fetchOrderContent();
        fetchAddress();
    }, [isLoggedIn]);

    const fetchOrderContent = async () => {
        setLoading(true);
        setMessage("");
        try {
            let orderContentData;
            if (isLoggedIn) {
                orderContentData = await ShoppingCartService.getProducts();
            } else {
                const tempCart = JSON.parse(localStorage.getItem('tempCart')) || { products: {} };

                const tempCartObject = tempCart.products.reduce((acc, product) => {
                    acc[product.productId] = product.quantity;
                    return acc;
                }, {});
                orderContentData = await ShoppingCartService.getTmpProducts(tempCartObject);
            }
            setOrderContent(orderContentData);
        } catch (error) {
            console.log(error);
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePlaceOrder = () => {
        setLoading(true);
        setMessage("");
        try {
            OrderService.placeOrder(orderContent);    
        } catch (error) {
            console.log(error);
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchAddress = async () => {
        setLoading(true);
        setMessage("");
        try {
            let paymentAddress, deliveryAddress;
            if (isLoggedIn) {
                paymentAddress = await UserService.getMyAddress("payment");
                deliveryAddress = await UserService.getMyAddress("delivery");
            } else {
                paymentAddress = emptyAddress;
                deliveryAddress = emptyAddress;
            }

            setPaymentAddressData(paymentAddress);
            setDeliveryAddressData(deliveryAddress);
        } catch (error) {
            console.log(error)
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

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
    };

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
    };

    const camelCaseToNormal = (fieldName) => {
        const words = fieldName
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .split(/[_\s]+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

        return words.join(" ");
    };

    const renderAddressContainer = (param, addressData) => (
        <div className={param === "payment" ? styles.paymentAddressContainer : styles.deliveryAddressContainer}>
            <div className={styles.addressBox}>
                <Form>
                    <h2>{camelCaseToNormal(param) + " Address"}</h2>
                    {message && <div className={styles.alert}>{message}</div>}
                    {Object.entries(addressData).map(([fieldName, fieldValue]) => (
                        <div className={styles.row} key={fieldName}>
                            <span className={styles.label}>{camelCaseToNormal(fieldName)}:</span>
                            {fieldName !== "floor" && fieldName !== "additionalInfo" &&
                                <InfoButton text="obligatory field" style={{ color: 'red' }} />}
                            <Input
                                type="text"
                                name={fieldName}
                                value={fieldValue}
                                onChange={handleAddressChange(param)}
                                className={styles.editInput}
                            />
                        </div>
                    ))}
                </Form>
            </div>
            {isLoggedIn && (
                <div className={styles.button}>
                    <button
                        className={styles.placeOrderButton}
                        onClick={() => handleSaveClick(param, addressData)}
                        disabled={loading[param]}
                    >
                        Save Address Data To MyProfile
                    </button>
                </div>
            )}
        </div>
    );

    const isAddressCompleted = () => {
        const addressCheck = (address) => {
            const mandatoryFields = Object.keys(emptyAddress).slice(0, -2);
            return mandatoryFields.every(field => !!address[field]);
        };
        return addressCheck(paymentAddressData) && addressCheck(deliveryAddressData);
    };

    const renderDeliveryMethod = () => {
        return (
            <>
                <div>
                    <h3>Select Delivery Method</h3>

                    <div className={styles.deliveryOption}>
                        <div>
                            <input
                                type="radio"
                                id="pickup"
                                name="deliveryMethod"
                                value="pickup"
                                checked={deliveryMethod === "pickup"}
                                onChange={() => handleDeliveryMethodChange("pickup")}
                            />
                        </div>
                        <div>
                            <img src="logo-image2.jpg" alt="Pick up from store" />
                        </div>
                        <div>
                            <p>Delivery Price: $0</p>
                            <p>Take order from one of our stores</p>
                        </div>
                    </div>

                    <div className={styles.deliveryOption}>
                        <div>
                            <input
                                type="radio"
                                id="delivery1"
                                name="deliveryMethod"
                                value="delivery1"
                                checked={deliveryMethod === "delivery1"}
                                onChange={() => handleDeliveryMethodChange("delivery1")}
                            />
                        </div>
                        <div>
                            <img src="logo-image1.jpg" alt="POSTEO" />
                        </div>
                        <div>
                            <p>Delivery Price: ${POSTEO_COST}</p>
                            <p>Free shipping from order above ${POSTEO_FREE_DELIVERY}}</p>
                        </div>
                    </div>

                    <div className={styles.deliveryOption}>
                        <div>
                            <input
                                type="radio"
                                id="delivery2"
                                name="deliveryMethod"
                                value="delivery2"
                                checked={deliveryMethod === "delivery2"}
                                onChange={() => handleDeliveryMethodChange("delivery2")}
                            />
                        </div>
                        <div>
                            <img src="logo-image2.jpg" alt="DELIVERO" />
                        </div>
                        <div>
                            <p>Delivery Price: ${DELIVERO_COST}</p>
                            <p>Free shipping from order above ${DELIVERO_FREE_DELIVERY}</p>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const handleDeliveryMethodChange = (method) => {
        setDeliveryMethod(method);
        let cost = 0;
        switch (method) {
            case "pickup":
                cost = 0;
                break;
            case "delivery1":
                if (orderContent.totalPrice < POSTEO_FREE_DELIVERY) {
                    cost = POSTEO_COST;
                }
                break;
            case "delivery2":
                if (orderContent.totalPrice < DELIVERO_FREE_DELIVERY) {
                    cost = DELIVERO_COST;
                }
                break;
        }

        orderContent.deliveryPrice = cost;
    };

    const renderPaymentMethod = () => {
        return (<>
            <div>
                <h3>Select Payment Method</h3>
                <div className={styles.paymentOption}>
                    <input type="radio" id="paymentOnDelivery" name="paymentMethod" value="paymentOnDelivery" />
                    <label htmlFor="paymentOnDelivery">Payment on Delivery</label>
                </div>

                <div className={styles.paymentOption}>
                    <input type="radio" id="transferToBank" name="paymentMethod" value="transferToBank" />
                    <label htmlFor="transferToBank">Transfer on Bank Account</label>
                </div>
            </div>
        </>
        );
    };

    const renderPage = () => {
        if (page === 1) {
            return (
                <>
                    <div className={styles.addressFieldsContainer}>
                        <div className={styles.addressField}>
                            {renderAddressContainer("payment", paymentAddressData)}
                        </div>
                        <div className={styles.addressField}>
                            {renderAddressContainer("delivery", deliveryAddressData)}
                        </div>
                    </div>
                    <div className={styles.buttonsContainer}>
                        <button className={styles.nextButton} onClick={() => {
                            if (isAddressCompleted()) {
                                setPage(2);
                            }
                        }}
                            disabled={!isAddressCompleted()}>Next</button>
                    </div>
                </>
            );
        } else if (page === 2) {
            return (
                <>
                    <div className={styles.deliveryMethod}>
                        {renderDeliveryMethod()}
                    </div>
                    <div className={styles.buttonsContainer}>
                        <button className={styles.prevButton} onClick={() => setPage(1)}>Previous</button>
                        <button className={styles.nextButton} onClick={() => setPage(3)}>Next</button>
                    </div>
                </>);
        } else if (page === 3) {
            return (
                <>
                    <div className={styles.paymentMethod}>
                        {renderPaymentMethod()}
                    </div>
                    <div className={styles.buttonsContainer}>
                        <button className={styles.prevButton} onClick={() => setPage(2)}>Previous</button>
                    </div>
                </>
            );
        }
    };

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
            <div className={styles.fieldsContainer}>
                <h2>Payment And Delivery</h2>
                {renderPage()}
            </div>

            <div className={styles.shortlist}>
                <h2>Summary</h2>
                {renderShortlist()}
                <button className={styles.placeOrderButton} onClick={handlePlaceOrder}>
                    Place Order
                </button>
            </div>


        </div>
    );
};

export default withRouter(Order);