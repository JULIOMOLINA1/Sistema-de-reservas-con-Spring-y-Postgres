package com.example.demo.reservation.entity;

import com.example.demo.customer.entity.CustomerEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
@Getter
@Setter
public class ReservationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Integer reservationId;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private CustomerEntity customer;

    @Column(name = "reservation_date_time", nullable = false)
    private LocalDateTime reservationDateTime;

    @Column(name = "expiration_date_time", nullable = false)
    private LocalDateTime expirationDateTime;

    @Column(name = "number_of_guests")
    private Integer numberOfGuests;

    @Column(name = "used_date_time")
    private LocalDateTime usedDateTime;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "special_requests")
    private String specialRequests;

    @Column(name = "total_amount")
    private BigDecimal totalAmount;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;

    public ReservationEntity(){}

    public ReservationEntity(Integer reservationId, CustomerEntity customer, LocalDateTime reservationDateTime, LocalDateTime expirationDateTime, Integer numberOfGuests, LocalDateTime usedDateTime, String status, String specialRequests, BigDecimal totalAmount, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.reservationId = reservationId;
        this.customer = customer;
        this.reservationDateTime = reservationDateTime;
        this.expirationDateTime = expirationDateTime;
        this.numberOfGuests = numberOfGuests;
        this.usedDateTime = usedDateTime;
        this.status = status;
        this.specialRequests = specialRequests;
        this.totalAmount = totalAmount;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
