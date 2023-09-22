import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../css/product-view.module.css";
import Form from "react-validation/build/form";
import { withRouter } from "../common/with-router";
import ProductService from "../services/product.service";
import { showRating, rateProduct } from "../utils/rating.util";
import { useShoppingCart } from "../hooks/shopping-cart.hook";
import ProductTag from "../utils/product-tag,util";

const emptyProduct = {
    name: "",
    description: "",
    price: 0,
    category: "",
    manufacturer: "",
    rating: 0,
    usersRatingCount: 0,
    images: [],
    status: [],
    catalogNumber: "",
    comments: [],
};

const ProductView = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(emptyProduct);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [reviewExpanded, setReviewExpanded] = useState(false);
    const [comment, setComment] = useState("");
    const [commentAlert, setCommentAlert] = useState("");
    const [rating, setRating] = useState(0);
    const [selectedImage, setSelectedImage] = useState("");
    const [isEnlarged, setIsEnlarged] = useState(false);

    const { addToShoppingCart } = useShoppingCart();

    const maxCharacters = 300;

    const handleCommentChange = (value) => {
        const inputComment = value;
        if (inputComment.length > maxCharacters) {
            setCommentAlert(`You are over the limit of: ${maxCharacters} characters`);
        } else {
            setCommentAlert("");
        }
        setComment(inputComment);
    };

    useEffect(() => {
        fetchProductData();
    }, []);

    const fetchProductData = async () => {
        setLoading(true);
        setMessage("");

        try {
            const fetchedProduct = await ProductService.getProduct(productId);
            setProduct(fetchedProduct);
            setSelectedImage(fetchedProduct.images[0]);
        } catch (error) {
            console.log("Fetch product error:", error);
            setMessage(error.response ? error.response.data.message : "An error has occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleReviewClick = () => {
        setReviewExpanded(!reviewExpanded);
    };

    const handleSubmitReview = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await ProductService.submitReview(productId, comment, rating);
            setComment("");
            setRating(0);
            window.location.reload();
        } catch (error) {
            console.log(error.message);
            setMessage(error.response ? error.response.data.message : "An error has occurred.");
        } finally {
            setLoading(false);
        }
    };

    const addToCart = () => {
        addToShoppingCart(productId);
    };


    const toggleEnlargedView = () => {
        setIsEnlarged(!isEnlarged);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };


    return (
        <div className={styles.productContainer}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h2 className={styles.productName}>{product.name}</h2>
                    <ProductTag tags={product.status || []}/> 
                    {selectedImage && (
                        <div className={isEnlarged ? styles.enlargedImage : ''} onClick={toggleEnlargedView}>
                            <img
                                src={selectedImage}
                                alt="Selected Product"
                                className={isEnlarged ? styles.enlargedImageEnlarged : styles.enlargedImage}
                            />
                        </div>
                    )}

                    <div className={styles.carousel}>
                        {product.images.map((image, index) => (
                            <div
                                key={index}
                                className={`${styles.thumbnail} ${selectedImage === image ? styles.selectedThumbnail : ''}`}
                                onClick={() => handleImageClick(image)}
                            >
                                <img src={image} alt={`Product ${index + 1}`} className={styles.thumbnailImage} />
                            </div>
                        ))}
                    </div>
                    <p className={styles.productDescription}>{product.description}</p>
                    <p className={styles.productPrice}>Price: ${product.price}</p>
                    <p className={styles.productCategory}>Category: {product.productCategory}</p>
                    <p className={styles.manufacturer}>Manufacturer: {product.manufacturer}</p>
                    <p className={styles.productRating}>Rating: {showRating(product.rating, product.usersRatingCount)}</p>

                    <button className={styles.button} onClick={addToCart} disabled={loading}>
                        {loading ? "Adding to Cart..." : "Add to Cart"}
                    </button>

                    <div className={styles.reviewsSection}>
                        <h3>Product Reviews</h3>
                        {product.comments && product.comments.length > 0 ? (
                            <ul className={styles.reviewList}>
                                {product.comments.map((comment, index) => (
                                    <li key={index} className={styles.reviewItem}>
                                        <div className={styles.reviewHeader}>
                                            <p className={styles.commentUsername}>{comment.username}</p>
                                            <p className={styles.commentRating}>Rating: {comment.rating <= 0 ? "N/A" : showRating(comment.rating)}</p>
                                        </div>
                                        <p className={styles.commentText}>{comment.comment}</p>
                                        <p className={styles.commentDate}>Review Date: {comment.reviewDate}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No reviews available.</p>
                        )}
                        <button className={styles.button} onClick={handleReviewClick}>
                            Leave Review
                        </button>

                        {reviewExpanded && (
                            <div className={styles.writeReviewSection}>
                                <h3>Write a Review</h3>
                                {commentAlert && <p className={styles.errorMessage}>{commentAlert}</p>}
                                <Form onSubmit={handleSubmitReview}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="rating">Rating:</label>
                                        {rateProduct(rating, setRating)}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="comment">Comment:</label>
                                        <textarea
                                            id="comment"
                                            name="comment"
                                            rows="4"
                                            className={styles.inputField}
                                            onChange={(event) => handleCommentChange(event.target.value)}
                                        ></textarea>
                                    </div>
                                    <button type="submit" className={styles.submitReviewButton}>
                                        Submit Review
                                    </button>
                                    <button type="button" className={styles.button} onClick={handleReviewClick}>
                                        Cancel
                                    </button>
                                </Form>
                            </div>
                        )}
                    </div>
                    {message && <p className={styles.errorMessage}>{message}</p>}
                </>
            )}
        </div>
    );
};

export default withRouter(ProductView);
