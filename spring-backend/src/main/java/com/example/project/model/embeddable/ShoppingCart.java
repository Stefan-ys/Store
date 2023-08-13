package com.example.project.model.embeddable;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Getter
public class ShoppingCart {
    private Set<ShoppingCartProduct> products = new HashSet<>();
    private BigDecimal totalPrice;
    private BigDecimal totalWeight;

    public ShoppingCartProduct getProduct(ObjectId productId) {
        for (ShoppingCartProduct cartProduct : products) {
            if (cartProduct.getProductId().equals(productId)) {
                return cartProduct;
            }
        }
        return null;
    }

    public void addProduct(ShoppingCartProduct product) {
        for (ShoppingCartProduct cartProduct : products) {
            if (cartProduct.equals(product)) {
                cartProduct.setQuantity(cartProduct.getQuantity() + 1);
                return;
            }
        }
        this.totalPrice = this.totalPrice.add(product.getPrice());
        this.totalPrice = this.totalPrice.setScale(2, RoundingMode.HALF_UP);

        this.totalWeight = this.totalWeight.add(product.getWeight());
        this.totalWeight = this.totalWeight.setScale(3, RoundingMode.HALF_UP);

        products.add(product);
    }

    public void removeProduct(ObjectId productId) {
        ShoppingCartProduct cartProduct = this.getProduct(productId);

        this.totalPrice = this.totalPrice.subtract(cartProduct.getPrice());
        this.totalPrice = this.totalPrice.setScale(2, RoundingMode.HALF_UP);

        this.totalWeight = this.totalWeight.subtract(cartProduct.getWeight());
        this.totalWeight = this.totalWeight.setScale(3, RoundingMode.HALF_UP);

        cartProduct.setQuantity(cartProduct.getQuantity() - 1);
        if (cartProduct.getQuantity() == 0) {
            products.remove(cartProduct);
        }

        if (products.size() == 0) {
            this.totalPrice = BigDecimal.ZERO;
            this.totalWeight = BigDecimal.ZERO;
        }
    }

    public void removeAll() {
        this.products = new HashSet<>();
        this.totalPrice = BigDecimal.ZERO;
        this.totalWeight = BigDecimal.ZERO;
    }

    public void setProductQuantity(ObjectId productId, int quantity) {
        ShoppingCartProduct cartProduct = getProduct(productId);
        totalPrice = totalPrice.subtract(cartProduct.getPrice()
                .multiply(new BigDecimal(cartProduct.getQuantity())));
        totalWeight = totalWeight.subtract(cartProduct.getWeight()
                .multiply(new BigDecimal(cartProduct.getQuantity())));

        cartProduct.setQuantity(quantity);

        totalPrice = totalPrice.add(cartProduct.getPrice()
                .multiply(new BigDecimal(cartProduct.getQuantity())));
        totalWeight = totalWeight.add(cartProduct.getWeight()
                .multiply(new BigDecimal(cartProduct.getQuantity())));
    }
}
