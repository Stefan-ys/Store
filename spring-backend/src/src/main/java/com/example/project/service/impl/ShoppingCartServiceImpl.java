package com.example.project.service.impl;

import com.example.project.model.embeddable.ShoppingCartProduct;
import com.example.project.model.entity.ProductEntity;
import com.example.project.model.entity.UserEntity;
import com.example.project.payload.response.ShoppingCartProductResponse;
import com.example.project.payload.response.ShoppingCartResponse;
import com.example.project.repository.ProductRepository;
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
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Override
    public ShoppingCartResponse getShoppingCart(String username) {
        UserEntity userEntity = userRepository.findByUsername(username).orElseThrow();
        ShoppingCartResponse shoppingCartResponse = new ShoppingCartResponse();

        shoppingCartResponse.setTotalPrice(userEntity.getShoppingCart().getTotalPrice());
        shoppingCartResponse.setTotalWeight(userEntity.getShoppingCart().getTotalWeight());


        Set<ShoppingCartProduct> shoppingCartProducts = userEntity.getShoppingCart().getProducts();
        for (ShoppingCartProduct product : shoppingCartProducts) {
            ShoppingCartProductResponse cartProductResponse = modelMapper.map(product, ShoppingCartProductResponse.class);
            cartProductResponse.setProductId(product.getProductId().toString());
            shoppingCartResponse.getProducts().add(cartProductResponse);
        }
        return shoppingCartResponse;
    }

    @Override
    public void addProductToCart(ObjectId productId, String username) {
        UserEntity userEntity = getUserByUsername(username);
        ProductEntity productEntity = getProductById(productId);

        ShoppingCartProduct product = modelMapper.map(productEntity, ShoppingCartProduct.class);
        userEntity.getShoppingCart().addProduct(product);

        userRepository.save(userEntity);
    }

    @Override
    public void removeProductFromCart(ObjectId productId, String username) {
        UserEntity userEntity = getUserByUsername(username);
        ShoppingCartProduct cartProduct = new ShoppingCartProduct();
        cartProduct.setProductId(productId);
        userEntity.getShoppingCart().removeProduct(productId);

        userRepository.save(userEntity);
    }

    @Override
    public void removeAllProductsFromCart(String username) {
        UserEntity userEntity = getUserByUsername(username);
        userEntity.getShoppingCart().removeAll();
        userRepository.save(userEntity);
    }

    @Override
    public void setProductQuantity(ObjectId productId, String username, int quantity) {
        if (checkProductAvailability(productId, quantity)) {
            //TO DO
            System.out.println("Not enough quantity of product");
        }
        if (quantity <= 0) {
            removeProductFromCart(productId, username);
            return;
        }
        UserEntity userEntity = getUserByUsername(username);

        userEntity.getShoppingCart().setProductQuantity(productId, quantity);
        userRepository.save(userEntity);
    }

    @Override
    public void transferProductsToCart(String username, ShoppingCartResponse products) {

    }

    private boolean checkProductAvailability(ObjectId productId, int quantity) {
        ProductEntity productEntity = getProductById(productId);
        return productEntity.getQuantity() >= quantity;
    }

    private UserEntity getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));
    }

    private ProductEntity getProductById(ObjectId productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + productId));
    }
}
