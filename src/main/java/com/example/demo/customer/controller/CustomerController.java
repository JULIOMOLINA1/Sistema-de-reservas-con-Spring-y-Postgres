package com.example.demo.customer.controller;

import com.example.demo.customer.dto.CustomerRequestDTO;
import com.example.demo.customer.dto.CustomerResponseDTO;
import com.example.demo.customer.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    private final CustomerService customerService;

    //To create a customer
    @PostMapping
    public ResponseEntity<CustomerResponseDTO> createCustomer(@RequestBody CustomerRequestDTO dto){
        return ResponseEntity.ok(customerService.createCustomer(dto));
    }

    //To get all customers
    @GetMapping
    public ResponseEntity<java.util.List<CustomerResponseDTO>> getAllCustomers(){
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @GetMapping("dni/{dni}")
    public ResponseEntity<CustomerResponseDTO> getCustomerByDni(@PathVariable String dni){
        return ResponseEntity.ok(customerService.getCustomerByDni(dni));
    }
    @PutMapping("/dni/{dni}/email")
    public ResponseEntity<CustomerResponseDTO> updateCustomerEmailByDni(
            @PathVariable String dni,
            @RequestBody Map<String, String> emailUpdate) {

        String newEmail = emailUpdate.get("email");
        CustomerResponseDTO updatedCustomer = customerService.updateCustomerEmailByDni(dni, newEmail);
        return ResponseEntity.ok(updatedCustomer);
    }
}
