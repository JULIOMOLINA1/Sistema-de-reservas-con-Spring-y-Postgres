package com.example.demo.customer.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

@Getter
@Setter
public class CustomerRequestDTO {

    @NotBlank(message = "The name is required.")
    @Size(min=2, max = 25, message = "Name must be between 2 and 25 characters.")
    private String firstName;

    @NotBlank(message = "the last name is required.")
    @Size(min=2, max = 25, message = "Last name must be between 2 and 25 characters.")
    private String lastName;

    @NotBlank(message = "DNI is required.")
    @Size(min=8, max = 8, message = "DNI must be exactly 8 characters.")
    @Pattern(regexp = "\\d+", message = "DNI must contain only numbers.")
    private String dni;

    @NotBlank(message = "Phone number is required.")
    @Size(max = 9)
    @Pattern(regexp = "\\d+", message = "Phone must contain only numbers.")
    private String phoneNumber;

    @NotBlank(message = "Email is required.")
    @Email(message = "Invalid email format.")
    private String email;

    @NotNull(message = "Birth date is required.")
    @Past(message = "Birth date must be in the past.")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    private Boolean isActive;
}
