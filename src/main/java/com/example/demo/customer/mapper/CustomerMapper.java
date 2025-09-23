package com.example.demo.customer.mapper;

import com.example.demo.customer.dto.CustomerRequestDTO;
import com.example.demo.customer.dto.CustomerResponseDTO;
import com.example.demo.customer.entity.CustomerEntity;
import org.springframework.stereotype.Component;

@Component
public class CustomerMapper {

    public static CustomerResponseDTO toResponseDTO(CustomerEntity entity){
        CustomerResponseDTO dto = new CustomerResponseDTO();
        dto.setCustomerId(entity.getCustomerId());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setDni(entity.getDni());
        dto.setPhoneNumber(entity.getPhoneNumber());
        dto.setEmail(entity.getEmail());
        dto.setBirthDate(entity.getBirthDate());
        dto.setIsActive(entity.getIsActive());
        return dto;

    }

    public static CustomerEntity toEntity(CustomerRequestDTO dto){

        CustomerEntity entity = new CustomerEntity();
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setDni(dto.getDni());
        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setEmail(dto.getEmail());
        entity.setBirthDate(dto.getBirthDate());
        entity.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true);
        // createdAt y updatedAt se manejan automáticamente con JPA Auditing
        return entity;
    }
}
