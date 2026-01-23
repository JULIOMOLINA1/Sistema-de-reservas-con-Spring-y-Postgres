package com.example.demo.plate.repository;

import com.example.demo.plate.entity.PlateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import java.util.List;

public interface PlateRepository extends JpaRepository<PlateEntity, Integer> {

    //To list the available dishes
    @EntityGraph(attributePaths = {"categories"})
    List<PlateEntity> findByIsAvailableTrue();

    //To list plates by category
    @EntityGraph(attributePaths = {"categories"})
    List<PlateEntity> findByCategoriesCategoryIdAndIsAvailableTrue(Integer categoryId);

    //To list all plates with categories (for admin)
    @EntityGraph(attributePaths = {"categories"})
    @Override
    List<PlateEntity> findAll();

}
