package com.example.demo.customer.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

@Getter
@Setter
public class CustomerRequestDTO {

    @NotNull(message = "The name is required.")
    @Size(max = 25)
    private String firstName;

    @NotNull(message = "the last name is required.")
    @Size(max = 25)
    private String lastName;

    @NotNull(message = "DNI is required.")
    @Size(max = 8)
    private String dni;

    @NotNull(message = "Phone number is required.")
    @Size(max = 11)
    private String phoneNumber;

    @NotNull(message = "An email is requiered.")
    private String email;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    private Boolean isActive;
}
