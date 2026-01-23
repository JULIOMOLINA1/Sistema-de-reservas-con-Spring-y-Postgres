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
import com.example.demo.shared.exception.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final CustomerService customerService;

    // Crear reservación (el sistema reconoce al customer por DNI)
    public ReservationResponseDTO createReservation(ReservationRequestDTO requestDTO){
        // Buscar customer por DNI
        CustomerEntity customer = customerService.findByDni(requestDTO.getCustomerDni());

        if (customer == null) {
            throw new ResourceNotFoundException("Customer not found with DNI: " + requestDTO.getCustomerDni() + ". Please create the customer first.");
        }

        // Crear la reservación
        ReservationEntity reservationEntity = ReservationMapper.toEntity(requestDTO, customer);
        ReservationEntity savedEntity = reservationRepository.save(reservationEntity);

        return ReservationMapper.toResponseDTO(savedEntity);
    }

    // Buscar mis reservaciones por DNI
    public List<ReservationResponseDTO> findPendingByDni(String dni) {
        log.info("Starting reservation lookup for customer with DNI: {} ", dni);

        return reservationRepository.findPendingByCustomerDniOrderByCreatedAtDesc(dni)
                .stream()
                .map(ReservationMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    // Cancelar mi reservación por DNI
    @Transactional
    public void cancelReservationById(Integer reservationId) {

        log.info("Cancellation request received for ID: {}", reservationId);

        ReservationEntity reservationToCancel = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No active reservation was found to cancel for ID: " +reservationId
                ));

        reservationToCancel.setStatus(ReservationStatus.CANCELLED.getValue());
        reservationRepository.save(reservationToCancel);
    }

    // Obtener todas las reservas (temporal para debugging)
    public List<ReservationResponseDTO> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(ReservationMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    // Para eliminar las reservaciones pasadas automaticamente
    @Scheduled(fixedRate = 3600000)
    public void deleteExpiredReservations(){
        LocalDateTime now = LocalDateTime.now();
        reservationRepository.deleteByExpirationDateTimeBefore(now);
        log.info("Expired reservations were eliminated before: {}", now);
    }

    // Para listar las reservaciones del día(solo ADMIN)
    public List<ReservationResponseDTO> getReservationsForDay(LocalDate specificDate){

        LocalDateTime start=specificDate.atStartOfDay();

        LocalDateTime end=specificDate.atTime(LocalTime.MAX);

        return reservationRepository.findByReservationDateTimeBetweenAndStatus(start, end, "pending")
                .stream()
                .map(ReservationMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}
