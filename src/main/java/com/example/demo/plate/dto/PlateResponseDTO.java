package com.example.demo.plate.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Set;

@Getter
@Setter
public class PlateResponseDTO {

    private Integer plateId;
    private String name;
    private String description;
    private BigDecimal price;
    private Boolean isAvailable;
    private Set<String> categories;

}
