package com.example.demo.shared.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> manageNotFound(ResourceNotFoundException ex){
        return buildResponse(ex.getMessage(), HttpStatus.NOT_FOUND, 404);
    }

    @ExceptionHandler({BadCredentialsException.class, UsernameNotFoundException.class})
    public ResponseEntity<Map<String, Object>> handleUnauthorized(Exception ex){
        return buildResponse("Incorrect credentials", HttpStatus.UNAUTHORIZED, 401);
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<Map<String, Object>> handleDisabled(DisabledException ex){
        return buildResponse("Unavailability account", HttpStatus.FORBIDDEN, 403);
    }

    @ExceptionHandler(org.springframework.security.access.AccessDeniedException.class)
    public ResponseEntity<Map<String, Object>> handleAccessDenied(Exception ex){
        return buildResponse("Acceso denegado: No tienes permisos suficientes", HttpStatus.FORBIDDEN, 403);
    }

    private ResponseEntity<Map<String, Object>> buildResponse(String message, HttpStatus status, int errorCode) {
        Map<String, Object> answer = new HashMap<>();
        answer.put("success", false);
        answer.put("message", message);
        answer.put("error", errorCode);
        answer.put("date", LocalDateTime.now());
        return new ResponseEntity<>(answer, status);
    }
}
