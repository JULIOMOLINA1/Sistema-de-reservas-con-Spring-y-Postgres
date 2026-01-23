package com.example.demo.reservation.controller;

import com.example.demo.reservation.dto.ReservationRequestDTO;
import com.example.demo.reservation.dto.ReservationResponseDTO;
import com.example.demo.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    // Crear reservación (el sistema reconoce al customer por DNI)
    @PostMapping
    public ResponseEntity<ReservationResponseDTO> createReservation(@RequestBody ReservationRequestDTO reservationRequestDTO){
        return ResponseEntity.ok(reservationService.createReservation(reservationRequestDTO));
    }

    // Buscar mis reservaciones por DNI
    @GetMapping("/search/{dni}/pending")
    public ResponseEntity<List<ReservationResponseDTO>> findPendingByDni(@PathVariable String dni) {
        return ResponseEntity.ok(reservationService.findPendingByDni(dni));
    }

    // Cancelar mi reservación por DNI
    @PutMapping("/cancel/{reservationId}")
    public ResponseEntity<String> cancelReservationByDni(@PathVariable Integer reservationId) {
        reservationService.cancelReservationById(reservationId);
        return ResponseEntity.ok("The reservation has been canceled.");
    }

    // Obtener todas las reservaciones del día
    @GetMapping("/by-date/{date}")
    public ResponseEntity<List<ReservationResponseDTO>> getPendingByDay(
        @PathVariable("date") @DateTimeFormat(iso=DateTimeFormat.ISO.DATE) LocalDate date){

        List<ReservationResponseDTO> reservations=reservationService.getReservationsForDay(date);

        return ResponseEntity.ok(reservations);
    }
}
