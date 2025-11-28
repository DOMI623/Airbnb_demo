// src/hooks/useListings.ts

import { useEffect, useState } from "react";
import { getAllListings } from "../services/listing.service";
import { type Listing } from "../types/listing";

export function useListings() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchListings() {
            try {
                const data = await getAllListings();
                setListings(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Error inesperado");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchListings();
    }, []);

    return { listings, loading, error };
}
