package com.example.project.service.impl;

import com.example.project.model.entity.ProductEntity;
import com.example.project.model.entity.ShoppingCartEntity;
import com.example.project.payload.response.ShoppingCartProductResponse;
import com.example.project.payload.response.ShoppingCartResponse;
import com.example.project.repository.ProductRepository;
import com.example.project.repository.ShoppingCartRepository;
import com.example.project.service.ShoppingCartService;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@AllArgsConstructor
public class ShoppingCartServiceImpl implements ShoppingCartService {
    private final ShoppingCartRepository shoppingCartRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Override
    public ShoppingCartResponse getShoppingCart(ObjectId userId) {
        ShoppingCartEntity shoppingCartEntity = getShoppingCartByUserId(userId);

        ShoppingCartResponse shoppingCartResponse = new ShoppingCartResponse();

        BigDecimal[] sumArr = shoppingCartEntity.getPriceAndWeightSummary();

        shoppingCartResponse.setTotalPrice(sumArr[0]);
        shoppingCartResponse.setTotalWeight(sumArr[1]);

        shoppingCartResponse.setTotalProducts(shoppingCartEntity.getTotalQuantity());


        for (ObjectId productId : shoppingCartEntity.getProductSummaryMap().keySet()) {
            ProductEntity product = getProductById(productId);

            ShoppingCartProductResponse cartProductResponse = modelMapper.map(product, ShoppingCartProductResponse.class);
            if (product.getImages().size() > 0) {
                cartProductResponse.setImage(product.getImages().get(0));
            }
            cartProductResponse.setProductId(product.getId().toString());
            cartProductResponse.setQuantity(shoppingCartEntity.getQuantityByProduct(productId));

            BigDecimal totalPriceByProduct = shoppingCartEntity.getPriceByProduct(productId);
            cartProductResponse.setPrice(product.getPrice().equals(totalPriceByProduct)
                    ? totalPriceByProduct.toString()
                    : String.format("%s (%s)", product.getPrice(), totalPriceByProduct.toString()));

            shoppingCartResponse.getProducts().add(cartProductResponse);
        }
        return shoppingCartResponse;
    }

    @Override
    public void addProductToCart(ObjectId productId, ObjectId userId) {
        ShoppingCartEntity shoppingCartEntity = getShoppingCartByUserId(userId);

        ProductEntity productEntity = getProductById(productId);

        shoppingCartEntity.addProduct(productEntity);

        shoppingCartRepository.save(shoppingCartEntity);
    }

    @Override
    public void removeProductFromCart(ObjectId productId, ObjectId userId) {
        ShoppingCartEntity shoppingCartEntity = getShoppingCartByUserId(userId);
        shoppingCartEntity.removeProduct(productId);

        shoppingCartRepository.save(shoppingCartEntity);
    }

    @Override
    public void removeAllProductsFromCart(ObjectId userId) {
        ShoppingCartEntity shoppingCartEntity = getShoppingCartByUserId(userId);
        shoppingCartEntity.clear();

        shoppingCartRepository.save(shoppingCartEntity);
    }

    @Override
    public void setProductQuantity(ObjectId productId, ObjectId userId, int quantity) {
        ShoppingCartEntity shoppingCartEntity = getShoppingCartByUserId(userId);
        ProductEntity productEntity = getProductById(productId);
        shoppingCartEntity.setProductQuantity(productEntity, quantity);

        shoppingCartRepository.save(shoppingCartEntity);
    }


    private boolean checkProductAvailability(ObjectId productId, int quantity) {
        ProductEntity productEntity = getProductById(productId);
        return productEntity.getQuantity() >= quantity;
    }

    private ProductEntity getProductById(ObjectId productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + productId));
    }

    private ShoppingCartEntity getShoppingCartByUserId(ObjectId userId) {
        ShoppingCartEntity shoppingCartEntity = shoppingCartRepository.findByUserId(userId)
                .orElse(null);
        if (shoppingCartEntity == null) {
            shoppingCartEntity = new ShoppingCartEntity();
            shoppingCartEntity.setUserId(userId);
        }
        return shoppingCartEntity;
    }


}
