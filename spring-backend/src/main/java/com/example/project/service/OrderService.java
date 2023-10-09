package com.example.project.service;

import com.example.project.model.enums.OrderStatusEnum;
import com.example.project.payload.request.OrderRequest;
import com.example.project.payload.response.OrderResponse;
import org.bson.types.ObjectId;

import java.util.List;

public interface OrderService {

    // Create

    void createOrder(OrderRequest orderRequest);

    // Retrieve

    OrderResponse getOrder(ObjectId orderId);
    List<OrderResponse> getOrdersByUser(ObjectId userId);
    List<OrderResponse> getActiveOrders();
    List<OrderResponse> getCancelledOrders();
    List<OrderResponse> getCompletedOrders();
    List<OrderResponse> getAllOrders();

    // Update

    void updateOrderStatus(ObjectId orderId, String orderStatus);

    // Delete

    void removeOrder(ObjectId orderId);
}
