
export interface ReservationRequestDTO {
    customerDni: string;
    reservationDateTime: string;
    numberOfGuests: number;
    specialRequests: string;
}

export interface ReservationResponseDTO {
    reservationId: number;
    status: string;
    reservationDateTime: string;
    numberOfGuests: number;
    totalAmount: number;
    customerId: number;
    customerDni: string;
    firstName: string;
    lastName: string;
}

export interface ReservationErrorResponse {
    success: boolean;
    message: string;
    error: number;
    date: string;
}
