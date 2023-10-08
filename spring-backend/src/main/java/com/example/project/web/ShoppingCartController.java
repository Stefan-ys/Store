package com.example.project.web;

import com.example.project.configuration.security.services.UserDetailsImpl;
import com.example.project.payload.response.ShoppingCartResponse;
import com.example.project.service.ShoppingCartService;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/shopping-cart")
public class ShoppingCartController {
    private final ShoppingCartService shoppingCartService;


    // Create

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/add-product/{productId}")
    public ResponseEntity<String> addProductToCart(@PathVariable("productId") String productId) {
        try {
            ObjectId userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
            shoppingCartService.addProductToCart(new ObjectId(productId), userId);
            return ResponseEntity.status(HttpStatus.CREATED).body("Product added to cart successfully");
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + exception.getMessage());
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + exception.getMessage());
        }
    }

    // Retrieve

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/get-products")
    public ResponseEntity<ShoppingCartResponse> getProductsFromCart() {
        try {
            ObjectId userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
            ShoppingCartResponse shoppingCartResponse = shoppingCartService.getShoppingCart(userId);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(shoppingCartResponse);
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/get-tmp-products")
    public ResponseEntity<ShoppingCartResponse> getTemporaryProducts(@RequestBody Map<String, Integer> products) {
        try {
            ShoppingCartResponse shoppingCartResponse = shoppingCartService.getTempShoppingCart(products);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(shoppingCartResponse);
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Update

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/change-quantity/{productId}")
    public ResponseEntity<String> changeProductQuantity(@PathVariable("productId") String productId, @RequestParam("quantity") int quantity) {
        try {
            ObjectId userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
            shoppingCartService.setProductQuantity(new ObjectId(productId), userId, quantity);
            return ResponseEntity.ok("Product quantity changed successfully");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body("Client error: " + ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body("Server error: " + ex.getMessage());
        }
    }

    // Delete

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/remove-product/{productId}")
    public ResponseEntity<String> removeProductFromCart(@PathVariable("productId") String productId) {
        try {
            ObjectId userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
            shoppingCartService.removeProductFromCart(new ObjectId(productId), userId);
            return ResponseEntity.ok().body("Product removed from cart successfully");
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + exception.getMessage());
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + exception.getMessage());
        }
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/clear-cart")
    public ResponseEntity<String> removeAllProductsFromCart() {
        ObjectId userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();

        shoppingCartService.removeAllProductsFromCart(userId);
        return ResponseEntity.ok().body("Cart cleared successfully");
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/transfer-to-cart")
    public ResponseEntity<String> transferProductsToCart(@RequestBody Map<String, Integer> products) {
        try {
            ObjectId userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();

            shoppingCartService.transferProductsToCart(products, userId);
            return ResponseEntity.ok().body("Products transferred to user's cart successfully");
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + exception.getMessage());
        }
    }
}

