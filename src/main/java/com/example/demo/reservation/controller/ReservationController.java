package com.example.demo.reservation.controller;

import com.example.demo.reservation.dto.ReservationRequestDTO;
import com.example.demo.reservation.dto.ReservationResponseDTO;
import com.example.demo.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    // Buscar mi reservación por DNI
    @GetMapping("/search/{dni}")
    public ResponseEntity<ReservationResponseDTO> findReservationByDni(@PathVariable String dni) {
        ReservationResponseDTO reservation = reservationService.findReservationByDni(dni);
        if (reservation != null) {
            return ResponseEntity.ok(reservation);
        }
        return ResponseEntity.notFound().build();
    }

    // Cancelar mi reservación por DNI
    @PutMapping("/cancel/{dni}")
    public ResponseEntity<ReservationResponseDTO> cancelReservationByDni(@PathVariable String dni) {
        ReservationResponseDTO cancelledReservation = reservationService.cancelReservationByDni(dni);
        if (cancelledReservation != null) {
            return ResponseEntity.ok(cancelledReservation);
        }
        return ResponseEntity.notFound().build();
    }

    // Obtener todas las reservas (temporal para debugging)
    @GetMapping
    public ResponseEntity<java.util.List<ReservationResponseDTO>> getAllReservations() {
        try {
            return ResponseEntity.ok(reservationService.getAllReservations());
        } catch (Exception e) {
            System.err.println("Error getting all reservations: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

        // Listar todas las reservas pendientes por DNI (ordenadas desc)
        @GetMapping("/dni/{dni}/pending")
        public ResponseEntity<java.util.List<ReservationResponseDTO>> findPendingByDni(@PathVariable String dni) {
            return ResponseEntity.ok(reservationService.findPendingByDni(dni));
        }
}
