package com.example.project.validation;

import com.example.project.repository.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UniqueEmailAddressValidator implements ConstraintValidator<UniqueEmailAddress, String> {
    private final UserRepository userRepository;

    @Override
    public void initialize(UniqueEmailAddress constraintAnnotation) {
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        return !userRepository.existsByEmailIgnoreCase(email);
    }
}
