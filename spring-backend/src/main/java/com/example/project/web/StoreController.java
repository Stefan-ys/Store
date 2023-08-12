package com.example.project.web;

import com.example.project.payload.request.ProductRequest;
import com.example.project.payload.response.ProductStoreResponse;
import com.example.project.service.ProductService;
import jakarta.validation.Valid;
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
@RequestMapping("api/store")
public class StoreController {
    private final ProductService productService;

    @GetMapping("/product/{productId}")
    public ResponseEntity<ProductStoreResponse> getProduct(@PathVariable String productId) {

        ProductStoreResponse productViewModel = productService.getProduct(new ObjectId(productId));
        return ResponseEntity.ok(productViewModel);
    }

    @GetMapping("/all-products")
    public ResponseEntity<List<ProductStoreResponse>> getAllProducts(String sortBy) {
        List<ProductStoreResponse> products = productService.getAllProducts(sortBy);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductStoreResponse>> getProductsByCategory(@PathVariable String category, String sortBy) {
        List<ProductStoreResponse> products = productService.getProductsByCategory(category, sortBy);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ProductStoreResponse>> getProductsByStatus(@PathVariable String status, String sortBy) {
        List<ProductStoreResponse> products = productService.getProductsByStatus(status, sortBy);
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
