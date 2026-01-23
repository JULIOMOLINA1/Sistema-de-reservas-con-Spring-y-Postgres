import type {
  ReservationErrorResponse,
  ReservationRequestDTO,
  ReservationResponseDTO,
} from "@/common/reservations/reservationsTypes";
import { getToken } from "../auth/authService";

const App_URL = "http://localhost:8087/api/reservations";

export const getReservationsByDate = async (date: string): Promise<ReservationResponseDTO[]> => {
  const token = getToken();
  const response = await fetch(`${App_URL}/by-date/${date}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Error fetching reservations for the selected date.");
  }

  return response.json();
};

export const createReservation = async (
  data: ReservationRequestDTO
): Promise<ReservationResponseDTO> => {
  const response = await fetch(App_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = (await response
      .json()
      .catch(() => null)) as ReservationErrorResponse | null;

    if (errorData && errorData.message) {
      console.error(
        `Backend error (Code ${errorData.error}): ${errorData.message}`
      );
      throw new Error(errorData.message);
    }

    if (response.status === 404) {
      throw new Error("Customer not found with the provided DNI.");
    }

    if (response.status === 400) {
      throw new Error(
        "Validation error. Please check that the DNI has 8 digits and the date is correct."
      );
    }

    throw new Error("Could not create a reservation. Please check the data");
  }
  return response.json();
};

export const findPendingReservationsByDni = async (
  dni: string
): Promise<ReservationResponseDTO[]> => {
  const url = `${App_URL}/search/${dni}/pending`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = (await response
      .json()
      .catch(() => null)) as ReservationErrorResponse | null;

    if (errorData && errorData.message) {
      throw new Error(errorData.message);
    }

    if (response.status === 404) {
      throw new Error("It wasn't found any reservation for this DNI.");
    }

    throw new Error("Error searching reservations.");
  }

  return response.json();
};

export const cancelReservation = async (
  reservationId: number
): Promise<string> => {
  const url = `${App_URL}/cancel/${reservationId}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = (await response
      .json()
      .catch(() => null)) as ReservationErrorResponse | null;

    if (errorData && errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error("The reservation could not be cancel.");
  }

  return response.text();
};
