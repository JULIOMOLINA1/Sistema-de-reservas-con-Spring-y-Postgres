

export interface PlateResponseDTO {
    plateId: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    isAvailable: boolean;
    categories: string[];
}