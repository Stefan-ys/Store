package com.example.project.payload.response;

import com.example.project.model.embeddable.Address;
import com.example.project.model.enums.OrderStatusEnum;
import lombok.Data;
import org.bson.types.ObjectId;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

@Data
public class OrderResponse {
    private String userId;
    private String username;
    private String userFistAndLastName;
    private String userEmail;
    private String userPhoneNumber;
    private OrderStatusEnum orderStatus;
    private LocalDateTime orderDate;
    private LocalDateTime completedDate;
    private LocalDateTime canceledDate;
    private AddressResponse deliveryAddress;
    private AddressResponse paymentAddress;
    private Map<ObjectId, Integer> products;
    private BigDecimal ProductsTotalWeight;
    private BigDecimal ProductsTotalPrice;
    private BigDecimal deliveryPrice;
    private BigDecimal totalPrice;
}
