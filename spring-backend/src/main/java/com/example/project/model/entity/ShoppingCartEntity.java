package com.example.project.model.entity;

import com.example.project.model.embeddable.ShoppingCartProduct;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Document(collection = "shopping_carts")
@Getter
@Setter
public class ShoppingCartEntity extends BaseEntity {

    private ObjectId userId;
    private Set<ProductEntity> products = new HashSet<>();

    private Map<ObjectId, Integer> productQuantityMap = new HashMap<>();
    private int productsCount;


    public BigDecimal getTotalPrice() {
        BigDecimal sum = new BigDecimal(0);
        for (ProductEntity product : this.products) {
            sum = sum.add(product.getPrice().multiply(new BigDecimal(product.getQuantity())));
        }
        return sum.setScale(2, RoundingMode.HALF_EVEN);
    }

    public BigDecimal getTotalWeight() {
        BigDecimal sum = new BigDecimal(0);
        for (ProductEntity product : this.products) {
            sum = sum.add(product.getWeight().multiply(new BigDecimal(product.getQuantity())));
        }
        return sum.setScale(3, RoundingMode.HALF_UP);
    }

    public ProductEntity getProduct(ObjectId productId) {
        for (ProductEntity cartProduct : this.products) {
            if (cartProduct.getId().equals(productId)) {
                return cartProduct;
            }
        }
        return null;
    }

    public void addProduct(ProductEntity product) {
        this.productQuantityMap.putIfAbsent(product.getId(), 0);
        this.productQuantityMap.put(product.getId(), this.productQuantityMap.get(product.getId()) + 1);
        this.productsCount++;
        this.products.add(product);
    }

    public void removeProduct(ObjectId productId) {
        this.productsCount -= productQuantityMap.get(productId);
        this.productQuantityMap.remove(productId);
        this.products.remove(this.getProduct(productId));
    }

    public void clear() {
        this.productsCount = 0;
        this.productQuantityMap = new HashMap<>();
        this.products = new HashSet<>();
    }

    public void setProductQuantity(ObjectId productId, int quantity) {
        if (quantity <= 0) {
            this.removeProduct(productId);
            return;
        }
        this.productsCount -= this.productQuantityMap.get(productId) + quantity;
        this.productQuantityMap.put(productId, quantity);
    }
}
