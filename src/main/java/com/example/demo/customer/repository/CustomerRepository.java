package com.example.demo.customer.repository;

import com.example.demo.customer.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<CustomerEntity, Integer> {

    //For looking for a client by dni
    Optional<CustomerEntity> findByDni(String dni);

    //For looking for a client by email
    Optional<CustomerEntity>findByEmail(String email);


}




