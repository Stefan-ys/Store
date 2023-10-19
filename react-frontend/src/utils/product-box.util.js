import styles from "../css/store.module.css";
import ProductTag from "./product-tag,util";
import {showRating} from "./rating.util";
import {useShoppingCart} from "../hooks/shopping-cart.hook";
import {Link} from "react-router-dom";
import Carousel from "./image-carousel.util";


const ProductBox = (product) => {

    product = product.product;

    const {addToShoppingCart} = useShoppingCart();

    return (
        <div key={product.id} className={styles.productBox}>
            <ProductTag tags={product.status || []}/>
            {product.images && product.images.length > 0 && <Carousel images={product.images}/>}
            <h3>{product.name}</h3>
            <p>Price: {product.price} $</p>
            <p>Category: {product.productCategory}</p>
            <p>Manufacturer: {product.manufacturer}</p>
            <p>{showRating(product.rating)}</p>
            <div>
                <Link to={`/product/${product.id}`} state={product} style={{textDecoration: 'none'}}>
                    <button className={styles.button}>
                        View Product
                    </button>
                </Link>
                <button className={styles.button} onClick={() => addToShoppingCart(product.id)}>Add to Cart</button>
            </div>
        </div>)
};

export default ProductBox;