package com.example.project.web;

import com.example.project.payload.request.ProductRequest;
import com.example.project.payload.response.ProductResponse;
import com.example.project.service.ProductService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/products")
public class ProductController {
    private final ProductService productService;

    @GetMapping("/{productId}")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable ObjectId productId) {
        ProductResponse productViewModel = productService.getProduct(productId);
        return ResponseEntity.ok(productViewModel);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        List<ProductResponse> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductResponse>> getProductsByCategory(@PathVariable String category) {
        List<ProductResponse> products = productService.getProductsByCategory(category);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ProductResponse>> getProductsByStatus(@PathVariable String status) {
        List<ProductResponse> products = productService.getProductsByStatus(status);
        return ResponseEntity.ok(products);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add-product")
    public ResponseEntity<Void> addProduct(@RequestBody @Valid ProductRequest productBindingModel) {
        productService.addProduct(productBindingModel);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/edit-product/{productId}")
    public ResponseEntity<Void> editProduct(@PathVariable ObjectId productId, @RequestBody @Valid ProductRequest productBindingModel) {
        productService.editProduct(productId, productBindingModel);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete-product/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable ObjectId productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.ok().build();
    }



}
