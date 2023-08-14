package com.example.project.web;

import com.example.project.payload.response.ShoppingCartResponse;
import com.example.project.service.ShoppingCartService;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/shopping-cart")
public class ShoppingCartController {
    private final ShoppingCartService shoppingCartService;
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/get-products")
    public ResponseEntity<ShoppingCartResponse> getProductsFromCart() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("Get product");
        try {
            ShoppingCartResponse shoppingCartResponse = shoppingCartService.getShoppingCart(username);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(shoppingCartResponse);
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/add-product/{productId}")
    public ResponseEntity<String> addProductToCart(@PathVariable("productId") String productId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("add to cart");
        try {
            shoppingCartService.addProductToCart(new ObjectId(productId), username);
            return ResponseEntity.status(HttpStatus.CREATED).body("Product added to cart successfully");
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + exception.getMessage());
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + exception.getMessage());
        }
    }
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/remove-product/{productId}")
    public ResponseEntity<String> removeProductFromCart(@PathVariable("productId") String productId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("remove from cart");
        try {
            shoppingCartService.removeProductFromCart(new ObjectId(productId), username);
            return ResponseEntity.ok().body("Product removed from cart successfully");
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + exception.getMessage());
        }
    }
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/clear-cart")
    public ResponseEntity<String> removeAllProductsFromCart() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("clean");
        shoppingCartService.removeAllProductsFromCart(username);
        return ResponseEntity.ok().body("Cart cleared successfully");
    }
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/change-quantity/{productId}")
    public ResponseEntity<String> changeProductQuantityInCart(@PathVariable("productId") String productId, @RequestParam int quantity) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("change quantity");
        try {
            shoppingCartService.setProductQuantity(new ObjectId(productId), username, quantity);
            return ResponseEntity.ok().body("Product quantity changed successfully");
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + exception.getMessage());
        }
    }

//    @PostMapping("/transfer-to-user-cart")
//    public ResponseEntity<String> transferProductsToCart() {
//        String username = SecurityContextHolder.getContext().getAuthentication().getName();
//
//        try {
//            shoppingCartService.transferProductsToCart(username);
//            return ResponseEntity.ok().body("Products transferred to user's cart successfully");
//        } catch (Exception exception) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + exception.getMessage());
//        }
//    }
}

