package com.example.project.service.impl;

import com.example.project.model.entity.ProductEntity;
import com.example.project.payload.response.ProductResponse;
import com.example.project.repository.CommentRepository;
import com.example.project.repository.OrderRepository;
import com.example.project.repository.ProductRepository;
import com.example.project.repository.UserRepository;
import com.example.project.service.SearchBarService;

import com.example.project.util.EntityConvertor;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.TextQuery;
import org.springframework.stereotype.Service;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SearchBarServiceImpl implements SearchBarService {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final CommentRepository commentRepository;
    private final ModelMapper modelMapper;
    private MongoTemplate mongoTemplate;

    @Override
    public Page<ProductResponse> searchForProduct(Pageable pageable, String keyWord) {
        Page<ProductEntity> products = productRepository.searchByNameIgnoreCaseContaining(keyWord, pageable);

        List<ProductResponse> productResponses = products.getContent().stream()
                .map(EntityConvertor::convertToProductResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(productResponses, pageable, products.getTotalElements());
    }
}
