package com.example.project.web;

import com.example.project.payload.request.ProductRequest;
import com.example.project.payload.request.ReviewRequest;
import com.example.project.payload.response.ProductResponse;
import com.example.project.service.ProductService;
import jakarta.validation.Valid;
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
@RequestMapping("/api/product")
public class ProductController {
    private final ProductService productService;

    @GetMapping("/{productId}")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable("productId") String productId) {
        ProductResponse productResponse = productService.getProduct(new ObjectId(productId));
        if (productResponse == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }



    @PreAuthorize("isAuthenticated()")
    @PostMapping("/review")
    public ResponseEntity<Void> reviewProduct(@RequestBody ReviewRequest reviewRequest) {
        ObjectId productId = new ObjectId(reviewRequest.getProductId());
        String comment = reviewRequest.getComment();
        int rating = reviewRequest.getRating();

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (rating > 0) {
            productService.rateProduct(productId, username, rating);
        }
        if (comment != null && comment.length() > 0) {
            productService.commentProduct(productId, username, comment);
        }
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
