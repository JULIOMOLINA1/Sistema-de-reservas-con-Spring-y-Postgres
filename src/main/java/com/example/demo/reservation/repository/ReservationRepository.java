package com.example.demo.reservation.repository;

import com.example.demo.reservation.entity.ReservationEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<ReservationEntity, Integer> {

    //Buscar reservaciones por dni y listar
    @Query("SELECT r FROM ReservationEntity r JOIN r.customer c WHERE c.dni = :dni AND LOWER(r.status) = 'pending' ORDER BY r.createdAt DESC")
    List<ReservationEntity> findPendingByCustomerDniOrderByCreatedAtDesc(@Param("dni") String dni);

    @Transactional
    @Modifying
    @Query("DELETE FROM ReservationEntity r WHERE r.expirationDateTime < :now")
    void deleteByExpirationDateTimeBefore(LocalDateTime now);

    List<ReservationEntity> findByReservationDateTimeBetweenAndStatus(LocalDateTime start, LocalDateTime end, String status);
}
