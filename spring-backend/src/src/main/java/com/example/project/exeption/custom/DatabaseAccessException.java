package com.example.project.exeption.custom;

import java.io.Serial;

public class DatabaseAccessException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 4L;

    public DatabaseAccessException(String msg) {
        super(msg);
    }
}
