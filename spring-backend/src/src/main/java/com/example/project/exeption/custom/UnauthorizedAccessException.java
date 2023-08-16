package com.example.project.exeption.custom;

import java.io.Serial;

public class UnauthorizedAccessException extends RuntimeException{
    @Serial
    private static final long serialVersionUID = 3L;

    public UnauthorizedAccessException(String msg) {
        super(msg);
    }
}
