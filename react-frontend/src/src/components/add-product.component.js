import React, { useState } from "react";
import axios from "axios";
import styles from "../css/add-product.module.css";
import authHeader from "../services/auth-header";

const AddProductComponent = () => {
    const [product, setProduct] = useState({
        name: "",
        catalogNumber: "",
        price: "",
        quantity: "",
        description: "",
        productCategory: "",
        manufacturer: "",
        weight: "",
        expirationDate: "",
    });
    const [pictures, setPictures] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setPictures([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("product", JSON.stringify(product));

            for (let i = 0; i < pictures.length; i++) {
                formData.append("pictures", pictures[i]);
            }

            await axios.post(
                "http://localhost:8080/api/admin/product/add-product",
                formData,
                {
                    headers: {
                        ...authHeader(),
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setMessage("Product added successfully");
            setLoading(false);
        } catch (error) {
            setMessage(
                error.response
                    ? error.response.data.message
                    : "An error has occurred."
            );
            setLoading(false);
        }
    };

    return (
        <div className={styles["add-product-container"]}>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="catalogNumber">Catalog Number:</label>
                    <input
                        type="text"
                        id="catalogNumber"
                        name="catalogNumber"
                        value={product.catalogNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productCategory">Product Category:</label>
                    <select
                        id="productCategory"
                        name="productCategory"
                        value={product.productCategory}
                        onChange={handleChange}
                    >
                        <option value="CIRCLES">CIRCLES</option>
                        <option value="RECTANGLES">RECTANGLES</option>
                        <option value="SQUARES">SQUARES</option>
                        <option value="TRIANGLES">TRIANGLES</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="manufacturer">Manufacturer:</label>
                    <input
                        type="text"
                        id="manufacturer"
                        name="manufacturer"
                        value={product.manufacturer}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="weight">Weight:</label>
                    <input
                        type="number"
                        id="weight"
                        name="weight"
                        value={product.weight}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="expirationDate">Expiration Date:</label>
                    <input
                        type="datetime-local"
                        id="expirationDate"
                        name="expirationDate"
                        value={product.expirationDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pictures">Product Pictures:</label>
                    <input
                        type="file"
                        id="pictures"
                        name="pictures"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Product"}
                </button>
                {message && <div className="alert alert-info">{message}</div>}
            </form>
        </div>
    );
};

export default AddProductComponent;
