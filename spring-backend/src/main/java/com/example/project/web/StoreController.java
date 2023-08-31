package com.example.project.web;

import com.example.project.payload.response.ProductResponse;
import com.example.project.service.StoreService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/store")
public class StoreController {
    private final StoreService storeService;
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/all-products")
    public ResponseEntity<Map<String, Object>> getProductsPage(
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {

        try {
            List<ProductResponse> products = new ArrayList<>();
            Pageable paging = PageRequest.of(page, size);

            Page<ProductResponse> productsPage;
            if (status == null) {
                productsPage = storeService.getAllProducts(paging);
            } else {
                productsPage = storeService.getAllProductsByStatus(status, paging);
            }

            products = productsPage.getContent();
            Map<String, Object> response = new HashMap<>();
            response.put("products", products);
            response.put("currentPage", productsPage.getNumber());
            response.put("totalElements", productsPage.getTotalElements());
            response.put("totalPages", productsPage.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);



        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
