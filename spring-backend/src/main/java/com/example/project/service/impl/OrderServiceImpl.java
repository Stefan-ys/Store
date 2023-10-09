package com.example.project.service.impl;

import com.example.project.model.entity.OrderEntity;
import com.example.project.model.enums.OrderStatusEnum;
import com.example.project.payload.request.OrderRequest;
import com.example.project.payload.response.OrderResponse;
import com.example.project.repository.OrderRepository;
import com.example.project.repository.ProductRepository;
import com.example.project.service.OrderService;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ModelMapper modelMapper;

    // Create

    @Override
    public void createOrder(OrderRequest orderRequest) {
        OrderEntity orderEntity = modelMapper.map(orderRequest, OrderEntity.class);
        orderEntity.setOrderStatus(OrderStatusEnum.ACTIVE);
        orderRepository.save(orderEntity);
    }

    // Retrieve

    @Override
    public OrderResponse getOrder(ObjectId orderId) {
        return modelMapper.map(getOrderById(orderId), OrderResponse.class);
    }

    @Override
    public List<OrderResponse> getOrdersByUser(ObjectId userId) {
        return orderRepository
                .findAllByUserId(userId)
                .stream()
                .map(order -> modelMapper.map(order, OrderResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse> getActiveOrders() {
        return orderRepository
                .findAllByOrderStatus(OrderStatusEnum.ACTIVE)
                .stream()
                .map(order -> modelMapper.map(order, OrderResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse> getCancelledOrders() {
        return orderRepository
                .findAllByOrderStatus(OrderStatusEnum.CANCELLED)
                .stream()
                .map(order -> modelMapper.map(order, OrderResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse> getCompletedOrders() {
        return orderRepository
                .findAllByOrderStatus(OrderStatusEnum.COMPLETED)
                .stream()
                .map(order -> modelMapper.map(order, OrderResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        return orderRepository
                .findAll()
                .stream()
                .map(order -> modelMapper.map(order, OrderResponse.class))
                .collect(Collectors.toList());
    }

    // Update

    @Override
    public void updateOrderStatus(ObjectId orderId, String orderStatus) {
        OrderEntity orderEntity = getOrderById(orderId);
        if (orderStatus.equalsIgnoreCase("ACTIVE")) {
            orderEntity.setOrderStatus(OrderStatusEnum.ACTIVE);
        } else if (orderStatus.equalsIgnoreCase("CANCELED")) {
            orderEntity.setCanceledDate(LocalDateTime.now());
            orderEntity.setOrderStatus(OrderStatusEnum.CANCELLED);
        } else if (orderStatus.equalsIgnoreCase("COMPLETED")) {
            orderEntity.setCompletedDate(LocalDateTime.now());
            orderEntity.setOrderStatus(OrderStatusEnum.COMPLETED);
        } else {
            return;
        }
        orderRepository.save(orderEntity);
    }


    // Delete
    @Override
    public void removeOrder(ObjectId orderId) {
        orderRepository.deleteById(orderId);
    }

    // Helpers

    private OrderEntity getOrderById(ObjectId orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with id " + orderId));
    }
}
