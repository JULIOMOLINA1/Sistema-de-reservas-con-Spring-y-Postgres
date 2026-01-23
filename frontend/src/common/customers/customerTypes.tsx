

export interface CustomerRequestDTO {
    firstName: string;
    lastName: string;
    dni: string;
    phoneNumber: string;
    email: string;
    birthDate: string;
    isActive: boolean;
}

export interface CustomerResponseDTO {
    customerId: number;
    firstName: string;
    lastName: string;
    dni: string;
    phoneNumber: string;
    email: string;
    birthDate: string;
    isActive: boolean;
}

export interface AppErrorResponse {
    success: boolean;
    message: string;
    error: number;
    date: string;
}