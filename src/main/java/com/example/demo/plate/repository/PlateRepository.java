package com.example.demo.plate.repository;

import com.example.demo.plate.entity.PlateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface PlateRepository extends JpaRepository<PlateEntity, Integer> {

    //To list the available dishes
    @EntityGraph(attributePaths = {"categories"})
    List<PlateEntity> findByIsAvailableTrue();

    //To list plates by category
    @EntityGraph(attributePaths = {"categories"})
    List<PlateEntity> findByCategoriesCategoryIdAndIsAvailableTrue(Integer categoryId);

    //To list plates by category name
    @EntityGraph(attributePaths = {"categories"})
    @Query("SELECT p FROM PlateEntity p JOIN p.categories c WHERE c.name = :categoryName AND p.isAvailable = true")
    List<PlateEntity> findByCategoryNameAndIsAvailableTrue(@Param("categoryName") String categoryName);

    //To list all plates with categories (for admin)
    @EntityGraph(attributePaths = {"categories"})
    @Override
    List<PlateEntity> findAll();

}
