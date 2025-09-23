package com.example.demo.reservation.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReservationRequestDTO {

    @NotNull(message = "DNI is required.")
    @Size(max = 8, message = "DNI must have a maximum of 8 characters.")
    private String customerDni;

    @NotNull(message = "The date and time of the reservation are required.")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime reservationDateTime;

    @NotNull(message = "the number of guests is required.")
    @Min(value = 1, message = "There must be at least one guest.")
    private Integer numberOfGuests;

    @Size(max = 100, message = "Special requests must be 100 characters or fewer.")
    private String specialRequests;

}
