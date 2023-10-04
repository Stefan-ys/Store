import React, { useState } from "react";
import ProductBox from "./product-box.util";
import styles from "../css/home.module.css";

const Slider = ({ products, itemsPerSlide }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const numSlides = Math.ceil(products.length / itemsPerSlide);

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % numSlides);
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? numSlides - 1 : prevIndex - 1
    );
  };

  if (!products || products.length === 0) {
    return null;
  }

  const startIdx = currentIndex * itemsPerSlide;
  const endIdx = Math.min((currentIndex + 1) * itemsPerSlide, products.length);
  const slideProducts = products.slice(startIdx, endIdx);

  return (
    <div className={styles.carousel}>
      <button className={styles.carouselPrev} onClick={handlePrevSlide}>
        Prev
      </button>
      <div className={styles.carouselInner}>
        <div className={styles.productRow}>
          {slideProducts.map((product) => (
            <ProductBox key={product.id} product={product} />
          ))}
        </div>
      </div>
      <button className={styles.carouselNext} onClick={handleNextSlide}>
        Next
      </button>
    </div>
  );
};

export default Slider;
