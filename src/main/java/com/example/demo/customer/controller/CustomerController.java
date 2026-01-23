package com.example.demo.customer.controller;

import com.example.demo.customer.dto.CustomerRequestDTO;
import com.example.demo.customer.dto.CustomerResponseDTO;
import com.example.demo.customer.service.CustomerService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    private final CustomerService customerService;

    //To create a customer
    @PostMapping
    public ResponseEntity<CustomerResponseDTO> createCustomer(@Valid @RequestBody CustomerRequestDTO dto){
        return ResponseEntity.ok(customerService.createCustomer(dto));
    }

    //To search customers
    @GetMapping("/dni/{dni}")
    public ResponseEntity<CustomerResponseDTO> getCustomerByDni(@PathVariable String dni){
        return ResponseEntity.ok(customerService.getCustomerByDni(dni));
    }

    //to update customer's email
    @PutMapping("/dni/{dni}/email")
    public ResponseEntity<CustomerResponseDTO> updateCustomerEmailByDni(
            @PathVariable String dni,
            @Valid @RequestBody EmailRequest request) {

       CustomerResponseDTO updatedEmail= customerService.updateCustomerEmailByDni(dni, request.email());
       return ResponseEntity.ok(updatedEmail);
    }
    public record EmailRequest(@NotBlank @Email String email){}
}
