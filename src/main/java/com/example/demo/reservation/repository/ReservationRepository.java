package com.example.demo.reservation.repository;

import com.example.demo.reservation.entity.ReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<ReservationEntity, Integer> {

    // Buscar todas las reservaciones de un customer por DNI
    List<ReservationEntity> findByCustomerDni(String dni);

    // Buscar la reservación más reciente de un customer por DNI
    @Query("SELECT r FROM ReservationEntity r JOIN r.customer c WHERE c.dni = :dni ORDER BY r.createdAt DESC")
    Optional<ReservationEntity> findLatestByCustomerDni(@Param("dni") String dni);

    // Buscar la reservación más reciente no cancelada de un customer por DNI
    @Query("SELECT r FROM ReservationEntity r JOIN r.customer c WHERE c.dni = :dni AND LOWER(r.status) != 'cancelled' ORDER BY r.createdAt DESC")
    Optional<ReservationEntity> findLatestActiveByCustomerDni(@Param("dni") String dni);

    // Buscar reservaciones por status (para administración si es necesario)
    List<ReservationEntity> findByStatus(String status);

    // Contar reservaciones activas de un customer por DNI
    @Query("SELECT COUNT(r) FROM ReservationEntity r JOIN r.customer c WHERE c.dni = :dni AND LOWER(r.status) = 'pending'")
    long countActiveReservationsByCustomerDni(@Param("dni") String dni);

        @Query("SELECT r FROM ReservationEntity r JOIN r.customer c WHERE c.dni = :dni AND LOWER(r.status) = 'pending' ORDER BY r.createdAt DESC")
        java.util.List<ReservationEntity> findPendingByCustomerDniOrderByCreatedAtDesc(@Param("dni") String dni);

}
