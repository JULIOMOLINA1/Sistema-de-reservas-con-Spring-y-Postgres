package com.example.demo.plate.controller;

import com.example.demo.plate.dto.PlateResponseDTO;
import com.example.demo.plate.service.PlateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/plates")
public class PlateController {
    private final PlateService plateService;

    @GetMapping
    public ResponseEntity<List<PlateResponseDTO>> getAllPlates(){
        return ResponseEntity.ok(plateService.getAllPlates() );
    }

    // Listar todas las categorías disponibles
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories(){
        return ResponseEntity.ok(plateService.getAllCategories());
    }

    // Listar platos por ID de categoría
    @GetMapping("/categories/{categoryId}")
    public ResponseEntity<List<PlateResponseDTO>> getPlatesByCategoryId(@PathVariable Integer categoryId){
        return ResponseEntity.ok(plateService.getPlatesByCategoryId(categoryId));
    }

    // Endpoint para admin: cambiar disponibilidad de un plato
    @PutMapping("/{plateId}/availability")
    public ResponseEntity<PlateResponseDTO> updatePlateAvailability(
            @PathVariable Integer plateId,
            @RequestParam Boolean isAvailable){
        return ResponseEntity.ok(plateService.updatePlateAvailability(plateId, isAvailable));
    }

    // Endpoint para admin: obtener todos los platos (incluyendo no disponibles)
    @GetMapping("/admin/all")
    public ResponseEntity<List<PlateResponseDTO>> getAllPlatesForAdmin(){
        return ResponseEntity.ok(plateService.getAllPlatesForAdmin());
    }
}
