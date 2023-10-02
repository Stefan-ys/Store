import React from "react";
import ProductBox from "./product-box.util";

const Slider = ({ products, itemsPerSlide }) => {
  if (!products || products.length === 0) {
    return null;
  }

  const numSlides = Math.ceil(products.length / itemsPerSlide);

  const slides = [];
  for (let i = 0; i < numSlides; i++) {
    const startIdx = i * itemsPerSlide;
    const endIdx = Math.min((i + 1) * itemsPerSlide, products.length);
    const slideProducts = products.slice(startIdx, endIdx);

    slides.push(
      <div key={i} className="carousel-item">
        <div className="d-flex justify-content-between">
          {slideProducts.map((product) => (
            <ProductBox key={product.catalogNumber} product={product} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="carousel">
      <div className="carousel-inner">{slides}</div>
    </div>
  );
};

export default Slider;
