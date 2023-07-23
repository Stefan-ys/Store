package com.example.project.model.dto.service;

import lombok.Data;

@Data
public class SignUpServiceModel {
    private String username;
    private String email;
    private String password;

    public SignUpServiceModel() {
    }

    public String getUsername() {
        return username;
    }

    public SignUpServiceModel setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public SignUpServiceModel setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public SignUpServiceModel setPassword(String password) {
        this.password = password;
        return this;
    }
}
