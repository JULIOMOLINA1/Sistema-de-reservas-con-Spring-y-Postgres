package com.example.demo.reservation.enums;

public enum ReservationStatus {
    PENDING("pending"),
    CANCELLED("cancelled");

    private final String value;

    ReservationStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
