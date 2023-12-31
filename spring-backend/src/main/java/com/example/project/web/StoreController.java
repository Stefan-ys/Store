package com.example.project.web;

import com.example.project.payload.response.ProductResponse;
import com.example.project.service.StoreService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/store")
public class StoreController {
    private final StoreService storeService;

    @GetMapping("/all-products")
    public ResponseEntity<Map<String, Object>> getProductsPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam() String[] categories,
            @RequestParam() String[] status,
            @RequestParam(defaultValue = "createdDate") String sortBy,
            @RequestParam(defaultValue = "asc") String sortOrder
    ) {
        try {
            Sort.Direction direction = sortOrder.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
            String property = switch (sortBy) {
                case "price" -> "price";
                case "name" -> "name";
                default -> "createdDate";
            };

            Pageable paging = PageRequest.of(page, size, direction, property);
            Page<ProductResponse> productsPage;

            productsPage = storeService.getProducts(paging, categories, status);

            return getMapResponseEntity(productsPage);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search-product{keyWord}")
    public ResponseEntity<Map<String, Object>> searchForProduct(
            @PathVariable("keyWord") String keyWord,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "createdDate") String sortBy,
            @RequestParam(defaultValue = "asc") String sortOrder
    ) {
        try {
            Sort.Direction direction = sortOrder.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
            String property = switch (sortBy) {
                case "price" -> "price";
                case "name" -> "name";
                default -> "createdDate";
            };

            Pageable paging = PageRequest.of(page, size, direction, property);
            Page<ProductResponse> productsPage;

            productsPage = storeService.searchForProduct(paging, keyWord);

            return getMapResponseEntity(productsPage);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // Helpers
    private ResponseEntity<Map<String, Object>> getMapResponseEntity(Page<ProductResponse> productsPage) {
        List<ProductResponse> products = productsPage.getContent();
        Map<String, Object> response = new HashMap<>();
        response.put("products", products);
        response.put("currentPage", productsPage.getNumber());
        response.put("totalElements", productsPage.getTotalElements());
        response.put("totalPages", productsPage.getTotalPages());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
