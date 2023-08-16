package com.example.project.exeption.custom;

import java.io.Serial;

public class InvalidInputException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 2L;

    public InvalidInputException(String msg) {
        super(msg);
    }
}
