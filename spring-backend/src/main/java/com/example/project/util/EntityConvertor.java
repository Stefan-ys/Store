package com.example.project.util;

import com.example.project.model.entity.ProductEntity;
import com.example.project.payload.response.ProductResponse;
import lombok.experimental.UtilityClass;
import org.modelmapper.ModelMapper;

@UtilityClass
public class EntityConvertor {
    private final ModelMapper modelMapper= new ModelMapper();

    public static ProductResponse convertToProductResponse(ProductEntity product) {
        ProductResponse productResponse = modelMapper.map(product, ProductResponse.class);
        productResponse.setId(product.getId().toString());
        productResponse.setDimensions(String.format("%d/%d/%d", product.getDimensions().getLength(), product.getDimensions().getHeight(), product.getDimensions().getWidth()));
        return productResponse;
    }


}
