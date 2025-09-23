package com.example.demo.customer.service;


import com.example.demo.customer.dto.CustomerRequestDTO;
import com.example.demo.customer.dto.CustomerResponseDTO;
import com.example.demo.customer.entity.CustomerEntity;
import com.example.demo.customer.mapper.CustomerMapper;
import com.example.demo.customer.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    // Method that get DTO and return DTO
    public CustomerResponseDTO createCustomer(CustomerRequestDTO requestDTO) {

        CustomerEntity customerEntity = CustomerMapper.toEntity(requestDTO);

        CustomerEntity savedEntity = customerRepository.save(customerEntity);


        return CustomerMapper.toResponseDTO(savedEntity);
    }
    //To get all customers
    public List<CustomerResponseDTO> getAllCustomers() {
        List<CustomerEntity> customers = customerRepository.findAll();
        return customers.stream()
                .map(CustomerMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    //To search for a customer by DNI - return DTO
    public CustomerResponseDTO getCustomerByDni(String dni) {
        Optional<CustomerEntity> customerOptional = customerRepository.findByDni(dni);

        if (customerOptional.isPresent()) {
            return CustomerMapper.toResponseDTO(customerOptional.get());
        } else {
            throw new RuntimeException("Customer not found with DNI: " + dni);
        }
    }

    public CustomerEntity findByDni(String dni) {
        return customerRepository.findByDni(dni).orElse(null);
    }
    public CustomerEntity save(CustomerEntity customer) {
        return customerRepository.save(customer);
    }
    public CustomerResponseDTO updateCustomerEmailByDni(String dni, String newEmail) {

        CustomerEntity customer = customerRepository.findByDni(dni)
                .orElseThrow(() -> new RuntimeException("Customer not found with DNI: " + dni));

        customer.setEmail(newEmail);

        CustomerEntity updatedCustomer = customerRepository.save(customer);

        return CustomerMapper.toResponseDTO(updatedCustomer);
    }
}

