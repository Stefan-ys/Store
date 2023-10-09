package com.example.project.payload.request;

import com.example.project.model.embeddable.Address;
import com.example.project.model.enums.OrderStatusEnum;
import lombok.Data;
import org.bson.types.ObjectId;

import java.math.BigDecimal;
import java.util.Map;

@Data
public class OrderRequest {
    private Address deliveryAddress;
    private Address paymentAddress;
    private Map<ObjectId, Integer> products;
    private BigDecimal ProductsTotalWeight;
    private BigDecimal ProductsTotalPrice;
    private BigDecimal deliveryPrice;
    private BigDecimal totalPrice;
}
