package com.example.project.service.impl;

import com.example.project.model.entity.ProductEntity;
import com.example.project.model.entity.ShoppingCartEntity;
import com.example.project.model.entity.UserEntity;
import com.example.project.payload.response.ShoppingCartProductResponse;
import com.example.project.payload.response.ShoppingCartResponse;
import com.example.project.repository.ProductRepository;
import com.example.project.repository.ShoppingCartRepository;
import com.example.project.repository.UserRepository;
import com.example.project.service.ShoppingCartService;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@AllArgsConstructor
public class ShoppingCartServiceImpl implements ShoppingCartService {
    private final ShoppingCartRepository shoppingCartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Override
    public ShoppingCartResponse getShoppingCart(ObjectId userId) {
        ShoppingCartEntity shoppingCartEntity = shoppingCartRepository.findById(
                getUserById(userId).getShoppingCartId()
        ).orElseThrow();

        ShoppingCartResponse shoppingCartResponse = new ShoppingCartResponse();

        shoppingCartResponse.setTotalPrice(shoppingCartEntity.getTotalPrice());
        shoppingCartResponse.setTotalWeight(shoppingCartEntity.getTotalWeight());

        Set<ProductEntity> products = shoppingCartEntity.getProducts();
        for (ProductEntity product : products) {
            ShoppingCartProductResponse cartProductResponse = modelMapper.map(product, ShoppingCartProductResponse.class);
            cartProductResponse.setProductId(product.getId().toString());
            cartProductResponse.setQuantity(shoppingCartEntity.getProductQuantityMap().get(product.getId()));
            shoppingCartResponse.getProducts().add(cartProductResponse);
        }
        return shoppingCartResponse;
    }

    @Override
    public void addProductToCart(ObjectId productId, ObjectId userId) {
        ShoppingCartEntity shoppingCartEntity = getShoppingCartByUserId(userId);

        if (shoppingCartEntity == null) {
            shoppingCartEntity = new ShoppingCartEntity();
            shoppingCartEntity.setId(userId);
        }

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
        shoppingCartEntity.setProductQuantity(productId, quantity);

        shoppingCartRepository.save(shoppingCartEntity);
    }


    private boolean checkProductAvailability(ObjectId productId, int quantity) {
        ProductEntity productEntity = getProductById(productId);
        return productEntity.getQuantity() >= quantity;
    }


    private UserEntity getUserById(ObjectId userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id " + userId));
    }

    private ProductEntity getProductById(ObjectId productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + productId));
    }

    private ShoppingCartEntity getShoppingCartByUserId(ObjectId userId) {
        return shoppingCartRepository.findByUserId(userId)
                .orElse(null);
    }
}
