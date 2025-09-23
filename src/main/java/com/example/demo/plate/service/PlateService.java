package com.example.demo.plate.service;

import com.example.demo.plate.dto.PlateResponseDTO;
import com.example.demo.plate.entity.PlateEntity;
import com.example.demo.plate.mapper.PlateMapper;
import com.example.demo.plate.repository.PlateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PlateService {

    private final PlateRepository plateRepository;

    // Listar todos los platos disponibles
    public List<PlateResponseDTO> getAllPlates(){
        List<PlateEntity> plates = plateRepository.findByIsAvailableTrue();
        return plates.stream()
                .map(PlateMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    // Listar platos por categoría (por nombre)
    public List<PlateResponseDTO> getPlatesByCategory(String categoryName){
        List<PlateEntity> plates = plateRepository.findByCategoryNameAndIsAvailableTrue(categoryName);
        return plates.stream()
                .map(PlateMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    // Listar platos por ID de categoría
    public List<PlateResponseDTO> getPlatesByCategoryId(Integer categoryId){
        List<PlateEntity> plates = plateRepository.findByCategoriesCategoryIdAndIsAvailableTrue(categoryId);
        return plates.stream()
                .map(PlateMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    // Listar todas las categorías disponibles
    public List<String> getAllCategories(){
        List<PlateEntity> plates = plateRepository.findByIsAvailableTrue();
        return plates.stream()
                .filter(plate -> plate.getCategories() != null)
                .flatMap(plate -> plate.getCategories().stream())
                .map(category -> category.getName())
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

    // Obtener todos los platos para admin (incluyendo no disponibles)
    public List<PlateResponseDTO> getAllPlatesForAdmin(){
        List<PlateEntity> plates = plateRepository.findAll();
        return plates.stream()
                .map(PlateMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    // Cambiar disponibilidad de un plato (para admin)
    public PlateResponseDTO updatePlateAvailability(Integer plateId, Boolean isAvailable){
        PlateEntity plate = plateRepository.findById(plateId)
                .orElseThrow(() -> new RuntimeException("Plato no encontrado con ID: " + plateId));

        plate.setIsAvailable(isAvailable);
        plate.setUpdatedAt(java.time.LocalDateTime.now());

        PlateEntity savedPlate = plateRepository.save(plate);
        return PlateMapper.toResponseDTO(savedPlate);
    }
}
