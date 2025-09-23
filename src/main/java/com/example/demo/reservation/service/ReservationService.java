package com.example.demo.reservation.service;

import com.example.demo.customer.entity.CustomerEntity;
import com.example.demo.customer.repository.CustomerRepository;
import com.example.demo.customer.service.CustomerService;
import com.example.demo.reservation.dto.ReservationRequestDTO;
import com.example.demo.reservation.dto.ReservationResponseDTO;
import com.example.demo.reservation.entity.ReservationEntity;
import com.example.demo.reservation.enums.ReservationStatus;
import com.example.demo.reservation.mapper.ReservationMapper;
import com.example.demo.reservation.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final CustomerService customerService;


    // 1. Crear reservación (el sistema reconoce al customer por DNI)
    public ReservationResponseDTO createReservation(ReservationRequestDTO requestDTO){
        // Buscar customer por DNI
        CustomerEntity customer = customerService.findByDni(requestDTO.getCustomerDni());

        if (customer == null) {
            throw new RuntimeException("Customer not found with DNI: " + requestDTO.getCustomerDni() + ". Please create the customer first.");
        }

        // Crear la reservación
        ReservationEntity reservationEntity = ReservationMapper.toEntity(requestDTO, customer);
        ReservationEntity savedEntity = reservationRepository.save(reservationEntity);

        return ReservationMapper.toResponseDTO(savedEntity);
    }
    // 2. Buscar mi reservación por DNI
    public ReservationResponseDTO findReservationByDni(String dni) {
        try {
            Optional<ReservationEntity> reservation = reservationRepository.findLatestByCustomerDni(dni);
            return reservation.map(ReservationMapper::toResponseDTO).orElse(null);
        } catch (Exception e) {
            System.err.println("Error finding reservation by DNI: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // 3. Cancelar mi reservación por DNI
    public ReservationResponseDTO cancelReservationByDni(String dni) {
        Optional<ReservationEntity> reservation = reservationRepository.findLatestActiveByCustomerDni(dni);

        if (!reservation.isPresent()) {
            return null;
        }

        ReservationEntity reservationToCancel = reservation.get();
        reservationToCancel.setStatus(ReservationStatus.CANCELLED.getValue());
        ReservationEntity savedReservation = reservationRepository.save(reservationToCancel);

        return ReservationMapper.toResponseDTO(savedReservation);
    }

    // 4. Obtener todas las reservas (temporal para debugging)
    public java.util.List<ReservationResponseDTO> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(ReservationMapper::toResponseDTO)
                .collect(java.util.stream.Collectors.toList());
    }

        public java.util.List<ReservationResponseDTO> findPendingByDni(String dni) {
            return reservationRepository.findPendingByCustomerDniOrderByCreatedAtDesc(dni)
                    .stream()
                    .map(ReservationMapper::toResponseDTO)
                    .collect(java.util.stream.Collectors.toList());
        }

}
