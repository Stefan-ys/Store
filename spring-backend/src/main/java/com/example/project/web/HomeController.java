package com.example.project.web;

import com.example.project.model.enums.ProductStatusEnum;
import com.example.project.payload.response.ProductResponse;
import com.example.project.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/home")
public class HomeController {
    private final ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<Map<String, List<ProductResponse>>> home() {
        try {
            Map<String, List<ProductResponse>> products = new HashMap<>();
            products.put("NEW", productService.getHomePageProductsByStatus(ProductStatusEnum.NEW, PageRequest.of(0, 8)));
            products.put("PROMOTION", productService.getHomePageProductsByStatus(ProductStatusEnum.PROMOTION, PageRequest.of(0, 8)));
            products.put("COMING_SOON", productService.getHomePageProductsByStatus(ProductStatusEnum.COMING_SOON, PageRequest.of(0, 8)));
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
