package com.example.demo.reservation.dto;

import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class ReservationResponseDTO {

    private Integer reservationId;
    private String status;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime reservationDateTime;
    private Integer numberOfGuests;
    private BigDecimal totalAmount;

    private Integer customerId;
    private String customerDni;
    private String firstName;
    private String lastName;

}
