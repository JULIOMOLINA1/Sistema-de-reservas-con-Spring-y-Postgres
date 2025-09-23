package com.example.demo.reservation.mapper;

import com.example.demo.customer.entity.CustomerEntity;
import com.example.demo.reservation.dto.ReservationRequestDTO;
import com.example.demo.reservation.dto.ReservationResponseDTO;
import com.example.demo.reservation.entity.ReservationEntity;
import com.example.demo.reservation.enums.ReservationStatus;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
public class ReservationMapper {

    public static ReservationEntity toEntity(ReservationRequestDTO reservationRequestDTO, CustomerEntity customer) {

        if (customer == null) {
            throw new IllegalArgumentException("Customer cannot be null");
        }

        ReservationEntity reservationEntity = new ReservationEntity();


        reservationEntity.setReservationDateTime(reservationRequestDTO.getReservationDateTime());
        reservationEntity.setNumberOfGuests(reservationRequestDTO.getNumberOfGuests());
        reservationEntity.setSpecialRequests(reservationRequestDTO.getSpecialRequests());

        reservationEntity.setCustomer(customer);

        reservationEntity.setStatus(ReservationStatus.PENDING.getValue());
        reservationEntity.setExpirationDateTime(reservationRequestDTO.getReservationDateTime().plusHours(2));

        reservationEntity.setUsedDateTime(null);
        reservationEntity.setTotalAmount(calculateTotalAmount(reservationRequestDTO.getNumberOfGuests()));

        return reservationEntity;
    }


    private static BigDecimal calculateTotalAmount(Integer numberOfGuests) {
        if (numberOfGuests == null) {
            return BigDecimal.ZERO;
        }
        // Price by person: S/ 100.00 (soles peruanos)
        BigDecimal pricePerPerson = new BigDecimal("100.00");
        return pricePerPerson.multiply(new BigDecimal(numberOfGuests));
    }

    public static ReservationResponseDTO toResponseDTO(ReservationEntity reservationEntity){
        ReservationResponseDTO reservationResponseDto = new ReservationResponseDTO();


        reservationResponseDto.setReservationId(reservationEntity.getReservationId());
        reservationResponseDto.setStatus(reservationEntity.getStatus());
        reservationResponseDto.setReservationDateTime(reservationEntity.getReservationDateTime());
        reservationResponseDto.setNumberOfGuests(reservationEntity.getNumberOfGuests());
        reservationResponseDto.setTotalAmount(reservationEntity.getTotalAmount());


        if (reservationEntity.getCustomer() != null) {
            reservationResponseDto.setCustomerId(reservationEntity.getCustomer().getCustomerId());
            reservationResponseDto.setCustomerDni(reservationEntity.getCustomer().getDni());
            reservationResponseDto.setFirstName(reservationEntity.getCustomer().getFirstName());
            reservationResponseDto.setLastName(reservationEntity.getCustomer().getLastName());
        }

        return reservationResponseDto;
    }

}
