// src/services/listings.ts
import { type Listing } from "../types/listing";

const BASE_URL = "http://localhost:3000/api/listings";

export async function getAllListings(): Promise<Listing[]> {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
        throw new Error("Error al obtener los listings");
    }

    const json = await response.json();

    return json.data; // 👈 AQUÍ ESTÁ EL ARRAY REAL
}
