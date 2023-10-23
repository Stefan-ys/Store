package com.example.project.model.entity;

import com.example.project.model.embeddable.Address;
import com.example.project.model.enums.OrderStatusEnum;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "orders")
@Data
public class OrderEntity extends BaseEntity {
    private ObjectId userId;
    private OrderStatusEnum orderStatus;
    private LocalDateTime orderDate;
    private LocalDateTime completedDate;
    private LocalDateTime canceledDate;
    private Address deliveryAddress;
    private Address paymentAddress;
    private Map<ObjectId, Integer> products = new HashMap<>();  // key -> product id; value -> product count;
    @NotNull
    private BigDecimal ProductsTotalWeight;
    @NotNull
    private BigDecimal ProductsTotalPrice;
    private String deliveryDetails;
    @NotNull
    private BigDecimal deliveryPrice;
    @NotNull
    private BigDecimal totalPrice;

}
