package com.example.demo.customer.service;


import com.example.demo.customer.dto.CustomerRequestDTO;
import com.example.demo.customer.dto.CustomerResponseDTO;
import com.example.demo.customer.entity.CustomerEntity;
import com.example.demo.customer.mapper.CustomerMapper;
import com.example.demo.customer.repository.CustomerRepository;
import com.example.demo.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


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

    //To search for a customer by DNI - return DTO
    public CustomerResponseDTO getCustomerByDni(String dni) {

        return customerRepository.findByDni(dni)
                .map(CustomerMapper::toResponseDTO)
                .orElseThrow(()-> new ResourceNotFoundException("Customer not found with DNI: "+dni));
    }

    //To find a CustomerEntity
    public CustomerEntity findByDni(String dni) {
        return customerRepository.findByDni(dni)
                .orElseThrow(()-> new ResourceNotFoundException("Customer not found with DNI: "+dni));
    }

    //To update an email
    public CustomerResponseDTO updateCustomerEmailByDni(String dni, String newEmail) {

        CustomerEntity customer = customerRepository.findByDni(dni)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with DNI: " + dni));

        customer.setEmail(newEmail);

        CustomerEntity updatedCustomer = customerRepository.save(customer);

        return CustomerMapper.toResponseDTO(updatedCustomer);
    }
}

