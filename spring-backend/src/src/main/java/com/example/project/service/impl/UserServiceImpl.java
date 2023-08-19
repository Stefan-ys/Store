package com.example.project.service.impl;

import com.example.project.model.embeddable.Address;
import com.example.project.payload.request.RegisterRequest;
import com.example.project.payload.response.UserResponse;
import com.example.project.model.entity.ProductEntity;
import com.example.project.model.entity.UserEntity;
import com.example.project.model.enums.RoleEnum;
import com.example.project.repository.ProductRepository;
import com.example.project.repository.RoleRepository;
import com.example.project.repository.UserRepository;
import com.example.project.service.UserService;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;


    @Override
    public void signUp(RegisterRequest signUpBindingModel) {
        UserEntity userEntity = new UserEntity();

        userEntity.setUsername(signUpBindingModel.getUsername());
        userEntity.setEmail(signUpBindingModel.getEmail());
        userEntity.setPassword(passwordEncoder.encode(signUpBindingModel.getPassword()));
        userEntity.getRoles().add(roleRepository.findByRole(RoleEnum.USER));

        userRepository.save(userEntity);
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream().map(this::convertToViewModel).toList();
    }


    @Override
    public UserResponse getUser(String username) {
        UserEntity userEntity = getUserByUsername(username);
        return convertToViewModel(userEntity);
    }

    @Override
    public boolean containsUsername(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    @Override
    public boolean containsEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @Override
    public void updateUserActivity(String username) {
        UserEntity userEntity = getUserByUsername(username);

        userEntity.setLastActiveDate(LocalDate.now());
        userRepository.save(userEntity);
    }

    @Override
    public MyProfileResponse getMyProfile(String username) {
        UserEntity userEntity = getUserByUsername(username);
        return modelMapper.map(userEntity, MyProfileResponse.class);

    }

    @Override
    public MyProfileResponse updateMyProfile(String username, MyProfileUpdateRequest myProfileRequest) {
        UserEntity userEntity = getUserByUsername(username);
        userEntity.setEmail(myProfileRequest.getEmail());
        userEntity.setPhoneNumber(myProfileRequest.getPhoneNumber());
        userEntity.setFirstName(myProfileRequest.getFirstName());
        userEntity.setLastName(myProfileRequest.getLastName());

//        Address address = new Address();
//        userEntity.getDeliveryInformation().setAddress(address);

        UserEntity updatedUserEntity = userRepository.save(userEntity);

        return modelMapper.map(updatedUserEntity, MyProfileResponse.class);

    }

    @Override
    public void addToCart(String username, ObjectId productId) {
        UserEntity userEntity = getUserByUsername(username);
        ProductEntity productEntity = productRepository.findById(productId).orElseThrow(() -> new IllegalArgumentException("Product not found"));

        ShoppingCartItem item = new ShoppingCartItem();
        item.setProductId(productId);
        item.setPrice(productEntity.getPrice());
        item.setWeight(productEntity.getWeight());
        item.setQuantity(1);

        userEntity.getShoppingCart().addItem(item);
    }

    @Override
    public void removeFromCart(String username, ObjectId productId) {
        UserEntity userEntity = getUserByUsername(username);
        ShoppingCartItem item = new ShoppingCartItem();
        item.setProductId(productId);
        userEntity.getShoppingCart().removeItem(item);

    }

    @Override
    public void adjustProductQuantity(String username, ObjectId productId, int quantity) {
        if (quantity <= 0) {
            removeFromCart(username, productId);
            return;
        }
        UserEntity userEntity = getUserByUsername(username);
        ShoppingCartItem item = userEntity.getShoppingCart().getItem(productId);
        item.setQuantity(quantity);
    }


    private UserResponse convertToViewModel(UserEntity userEntity) {
        UserResponse viewModel = modelMapper.map(userEntity, UserResponse.class);
        viewModel.setRoles(userEntity
                .getRoles()
                .stream()
                .map(role -> role.getRole().toString())
                .collect(Collectors.toList()));
        LocalDate currentDate = LocalDate.now();
        LocalDate createdDate = userEntity.getCreatedDate();
        LocalDate activeDate = userEntity.getLastActiveDate();

        viewModel.setCreatedAt(createdDate +
                String.format("(%s days since)", ChronoUnit.DAYS.between(currentDate, currentDate)));
        viewModel.setLastActiveAt(activeDate +
                String.format("(%s days since)", ChronoUnit.DAYS.between(activeDate, currentDate)));

        return viewModel;
    }

    private UserEntity getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));
    }
}
