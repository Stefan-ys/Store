package com.example.project.service.impl;

import com.example.project.model.dto.binding.SignUpBindingModel;
import com.example.project.model.dto.view.MyProfileViewModel;
import com.example.project.model.dto.view.UserViewModel;
import com.example.project.model.embeddable.ShoppingCartItem;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    public void signUp(SignUpBindingModel signUpBindingModel) {
        UserEntity userEntity = new UserEntity();

        userEntity.setUsername(signUpBindingModel.getUsername());
        userEntity.setEmail(signUpBindingModel.getEmail());
        userEntity.setPassword(passwordEncoder.encode(signUpBindingModel.getPassword()));
        userEntity.getRoles().add(roleRepository.findByRole(RoleEnum.USER));

        userRepository.save(userEntity);
    }

    @Override
    public List<UserViewModel> getAllUsers() {
        return userRepository.findAll().stream().map(this::convertToViewModel).toList();
    }


    @Override
    public UserViewModel getUser(String username) {
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
    public MyProfileViewModel getMyProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity userEntity = getUserByUsername(authentication.getName());
        return modelMapper.map(userEntity, MyProfileViewModel.class);

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


    private UserViewModel convertToViewModel(UserEntity userEntity) {
        UserViewModel viewModel = modelMapper.map(userEntity, UserViewModel.class);
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
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }
}
