package com.example.project.payload.response;

import lombok.Data;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.ArrayList;

@Data
public class JwtResponse {
    private String accessToken;
    private String type = "Bearer";
    private ObjectId id;
    private String username;
    private String email;
    private List<String> roles = new ArrayList<>();

}
