package com.example.demo.plate.mapper;

import com.example.demo.plate.dto.PlateResponseDTO;
import com.example.demo.plate.entity.CategoryEntity;
import com.example.demo.plate.entity.PlateEntity;
import org.springframework.stereotype.Component;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class PlateMapper {

    public static PlateResponseDTO toResponseDTO(PlateEntity plateEntity){

        PlateResponseDTO plateDto = new PlateResponseDTO();
        plateDto.setPlateId(plateEntity.getPlateId());
        plateDto.setName(plateEntity.getName());
        plateDto.setDescription(plateEntity.getDescription());
        plateDto.setPrice(plateEntity.getPrice());
        plateDto.setIsAvailable(plateEntity.getIsAvailable());

        //To convert categories entities to names
        if(plateEntity.getCategories() != null){
            Set<String> categoryNames = plateEntity.getCategories().stream()
                    .map(CategoryEntity::getName)
                    .collect(Collectors.toSet());
            plateDto.setCategories(categoryNames);
        }
        return plateDto;
    }
}
