package com.example.project.model.embeddable;

import com.example.project.model.entity.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Getter
public class ShoppingCart{
    private Set<ShoppingCartProduct> products = new HashSet<>();

    public BigDecimal getTotalPrice() {
        BigDecimal sum = new BigDecimal(0);
        for (ShoppingCartProduct product : this.products) {
            sum = sum.add(product.getPrice().multiply(new BigDecimal(product.getQuantity())));
        }
        return sum.setScale(2, RoundingMode.HALF_EVEN);
    }

    public BigDecimal getTotalWeight() {
        BigDecimal sum = new BigDecimal(0);
        for (ShoppingCartProduct product : this.products) {
            sum = sum.add(product.getWeight().multiply(new BigDecimal(product.getQuantity())));
        }
        return sum.setScale(3, RoundingMode.HALF_UP);
    }

    public ShoppingCartProduct getProduct(ObjectId productId) {
        for (ShoppingCartProduct cartProduct : this.products) {
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
        products.add(product);
    }

    public void removeProduct(ObjectId productId) {
        ShoppingCartProduct cartProduct = this.getProduct(productId);

        cartProduct.setQuantity(cartProduct.getQuantity() - 1);
        if (cartProduct.getQuantity() == 0) {
            products.remove(cartProduct);
        }
    }

    public void removeAll() {
        this.products = new HashSet<>();
    }

    public void setProductQuantity(ObjectId productId, int quantity) {
        ShoppingCartProduct cartProduct = getProduct(productId);
        cartProduct.setQuantity(quantity);
    }
}
