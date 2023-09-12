import React, { useState } from "react";
import styles from "../css/add-product.module.css";
import AdminProductService from "../services/admin-product.service";

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
        status: [],
        pictures: [],
        productLength: "",
        productHeight: "",
        productWidth: "",

    });
    const [picture, setPicture] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleStatusChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setProduct({
                ...product,
                status: [...product.status, name],
            });
        } else {
            setProduct({
                ...product,
                status: product.status.filter((status) => status !== name),
            });
        }
    };

    const handleAddPicture = () => {
        if (picture.trim() !== "") {
            setProduct({
                ...product,
                pictures: [...product.pictures, picture],
            });
            setPicture("");
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            console.log(product);
            AdminProductService.addProductService(product);
            setMessage("Product added successfully");
        } catch (error) {
            console.log(error);
            setMessage(
                error.response ? error.response.data.message : "An error has occurred."
            );
        } finally {
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
                    <label>Product Status:</label>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="COMING_SOON"
                                checked={product.status.includes("COMING_SOON")}
                                onChange={handleStatusChange}
                            />{" "}
                            COMING SOON
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="NEW"
                                checked={product.status.includes("NEW")}
                                onChange={handleStatusChange}
                            />{" "}
                            NEW
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="PROMOTION"
                                checked={product.status.includes("PROMOTION")}
                                onChange={handleStatusChange}
                            />{" "}
                            PROMOTION
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="SALE"
                                checked={product.status.includes("SALE")}
                                onChange={handleStatusChange}
                            />{" "}
                            SALE
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="LIMITED_STOCK"
                                checked={product.status.includes("LIMITED_STOCK")}
                                onChange={handleStatusChange}
                            />{" "}
                            LIMITED STOCK
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="OUT_OF_STOCK"
                                checked={product.status.includes("OUT_OF_STOCK")}
                                onChange={handleStatusChange}
                            />{" "}
                            OUT OF STOCK
                        </label>
                    </div>
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
                    <label htmlFor="productLength">Length:</label>
                    <input
                        type="number"
                        id="productLength"
                        name="productLength"
                        value={product.productLength}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productHeight">Height:</label>
                    <input
                        type="number"
                        id="productHeight"
                        name="productHeight"
                        value={product.productHeight}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productWidth">Width:</label>
                    <input
                        type="number"
                        id="productWidth"
                        name="productWidth"
                        value={product.productWidth}
                        onChange={handleChange}
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
                    <div>
                        {product.pictures.map((url, index) => (
                            <div key={index}>
                                <a href={url} target="_blank" rel="noopener noreferrer">
                                    {url}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="picture">Add Picture URL:</label>
                    <input
                        type="url"
                        id="picture"
                        name="picture"
                        value={picture}
                        onChange={(e) => setPicture(e.target.value)}
                    />
                    <button type="button" onClick={handleAddPicture}>
                        Add Picture
                    </button>
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
