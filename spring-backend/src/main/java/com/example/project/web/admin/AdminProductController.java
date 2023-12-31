package com.example.project.web.admin;

import com.example.project.payload.request.ProductRequest;
import com.example.project.payload.response.ProductResponseAdminTable;
import com.example.project.service.ProductService;
import com.example.project.service.StoreService;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
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
@RequestMapping("/api/admin/products")
public class AdminProductController {
    private final ProductService productService;
    private final StoreService storeService;

    // Create

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add-product")
    public ResponseEntity<String> addProduct(@RequestBody ProductRequest productRequest) {
        try {
            productService.addProduct(productRequest);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (ValidationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Retrieve

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all-products")
    public ResponseEntity<List<ProductResponseAdminTable>> getAllProducts() {
        try {
            List<ProductResponseAdminTable> response = productService.getAllProducts();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/edit{productId}")
    public ResponseEntity<Void> editProduct(@PathVariable ObjectId productId, @RequestBody @Valid ProductRequest productBindingModel) {
        productService.editProduct(productId, productBindingModel);
        return ResponseEntity.ok().build();
    }

    // Delete

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable ObjectId productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.ok().build();
    }
}
