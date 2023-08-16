package com.example.project.exeption.custom;

import java.io.Serial;

public class UncheckedException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 5L;

    public UncheckedException(String msg) {
        super(msg);
    }
}
