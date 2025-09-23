package com.example.demo.customer.dto;

import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

@Getter
@Setter
public class CustomerResponseDTO {
    private Integer customerId;
    private String firstName;
    private String lastName;
    private String dni;
    private String phoneNumber;
    private String email;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
    
    private Boolean isActive;
}
