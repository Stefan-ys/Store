package com.example.project.model.entity;


import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Document(collection = "shopping_carts")
@Getter
@Setter
public class ShoppingCartEntity extends BaseEntity {
    private ObjectId userId;
    private Map<ObjectId, ProductSummary> productSummaryMap = new HashMap<>();


    public BigDecimal[] getPriceAndWeightSummary() {
        BigDecimal[] sumPriceAndWeightArr = new BigDecimal[]{BigDecimal.ZERO, BigDecimal.ZERO};
        for (ProductSummary product : productSummaryMap.values()) {
            sumPriceAndWeightArr[0] = sumPriceAndWeightArr[0].add(product.getSumPrice());
            sumPriceAndWeightArr[1] = sumPriceAndWeightArr[1].add(product.getSumWeight());
        }
        return sumPriceAndWeightArr;
    }

    public int getTotalQuantity() {
        int sum = 0;
        for (ProductSummary product : productSummaryMap.values()) {
            sum += product.getQuantity();
        }
        return sum;
    }

    public int getQuantityByProduct(ObjectId productId) {
        if (!containsProduct(productId)) {
            return 0;
        }
        return productSummaryMap.get(productId).getQuantity();
    }

    public BigDecimal getPriceByProduct(ObjectId productId) {
        if (!containsProduct(productId)) {
            return BigDecimal.ZERO;
        }
        return productSummaryMap.get(productId).getSumPrice();
    }

    public Boolean containsProduct(ObjectId productId) {
        return productSummaryMap.containsKey(productId);
    }

    public void addProduct(ProductEntity product) {
        ObjectId productId = product.getId();
        productSummaryMap.putIfAbsent(productId, new ProductSummary());
        int quantity = productSummaryMap.get(productId).getQuantity() + 1;
        BigDecimal sumPrice = productSummaryMap.get(productId).getSumPrice().add(product.getPrice());
        BigDecimal sumWeight = productSummaryMap.get(productId).getSumWeight().add(product.getWeight());

        productSummaryMap.get(productId).setAll(quantity, sumPrice, sumWeight);
    }

    public void removeProduct(ObjectId productId) {
        productSummaryMap.remove(productId);
    }

    public void clear() {
        productSummaryMap = new HashMap<>();
    }

    public void setProductQuantity(ProductEntity product, int quantity) {
        ObjectId productId = product.getId();
        if (quantity <= 0) {
            this.removeProduct(productId);
            return;
        }
        BigDecimal sumPrice = product.getPrice().multiply(BigDecimal.valueOf(quantity));
        BigDecimal sumWeight = product.getWeight().multiply(BigDecimal.valueOf(quantity));
        productSummaryMap.get(productId).setAll(quantity, sumPrice, sumWeight);
    }


    @Getter
    private static class ProductSummary {
        private int quantity = 0;
        private BigDecimal sumPrice = BigDecimal.ZERO;
        private BigDecimal sumWeight = BigDecimal.ZERO;


        private void setAll(int quantity, BigDecimal sumPrice, BigDecimal sumWeight) {
            this.quantity = quantity;
            this.sumPrice = sumPrice;
            this.sumWeight = sumWeight;
        }
    }
}
