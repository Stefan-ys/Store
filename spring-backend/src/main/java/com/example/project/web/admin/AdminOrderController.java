package com.example.project.web.admin;

import com.example.project.payload.response.OrderResponse;
import com.example.project.repository.OrderRepository;
import com.example.project.service.OrderService;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/admin/order")
public class AdminOrderController {
    private final OrderService orderService;
    private final OrderRepository orderRepository;

    // Create

    // Retrieve

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get-orders{status}")
    public ResponseEntity<List<OrderResponse>> getOrders(@PathVariable String status) {
        try {
            List<OrderResponse> response;
            if (status.equalsIgnoreCase("ALL")) {
                response = orderService.getAllOrders();
            } else if (status.equalsIgnoreCase("ACTIVE")) {
                response = orderService.getActiveOrders();
            } else if (status.equalsIgnoreCase("CANCELLED")) {
                response = orderService.getCancelledOrders();
            } else if (status.equalsIgnoreCase("COMPLETED")) {
                response = orderService.getCompletedOrders();
            } else {
                throw new IllegalArgumentException("Bad order status");
            }
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get-user-orders{userId}")
    public ResponseEntity<List<OrderResponse>> getOrdersByUser(@PathVariable String userId) {
        try {
            List<OrderResponse> response = orderService.getOrdersByUser(new ObjectId(userId));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/change-status{orderId}")
    public ResponseEntity<Void> changeOrderStatus(@PathVariable String orderId, @RequestParam("status") String status) {
        try {
            orderService.updateOrderStatus(new ObjectId(orderId), status);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // Delete

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/delete-order{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String orderId) {
        try {
            orderService.removeOrder(new ObjectId(orderId));
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
