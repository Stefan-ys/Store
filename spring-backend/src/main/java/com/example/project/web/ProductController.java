package com.example.project.web;

import com.example.project.payload.request.ReviewRequest;
import com.example.project.payload.response.ProductResponse;
import com.example.project.service.CommentService;
import com.example.project.service.ProductService;
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
    private final CommentService commentService;

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
        int rating = reviewRequest.getRating();
        String comment = reviewRequest.getComment();

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (rating > 0) {
            productService.rateProduct(productId, username, rating);
        }
        if (comment != null && comment.length() > 0) {
            commentService.commentProduct(productId, username, rating ,comment);
        }
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
