import type { PlateResponseDTO } from "@/common/plates/plateTypes";
import { getToken } from "../auth/authService";

const Api_URL = "http://localhost:8087/api/plates";

export const getPlatesByCategoryId = async (categoryId: number): Promise<PlateResponseDTO[]> => {
    const response = await fetch(`${Api_URL}/categories/${categoryId}`);
    if(!response.ok){
        throw new Error("Error loading dishes.");
    }
    return response.json();
};

export const getAllPlatesForAdmin = async (): Promise<PlateResponseDTO[]> => {
    const token = getToken();
    const response = await fetch(`${Api_URL}/admin/all`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if(!response.ok){
        throw new Error("Error loading all plates for admin.");
    }

    return response.json();
};

export const updatePlateAvailability = async (plateId: number, isAvailable: boolean): Promise<PlateResponseDTO> => {
    const token = getToken();
    const response = await fetch(`${Api_URL}/${plateId}/availability?isAvailable=${isAvailable}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if(!response.ok){
        throw new Error("Error updating plate availability.");
    }

    return response.json();
};
