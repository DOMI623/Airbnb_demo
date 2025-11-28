export interface Listing {
    _id: string;
    title: string;
    description: string;
    location: string;
    price: number;
    images: string[];
    category: string;
    createdAt: string;
    updatedAt: string;

    // extra temporal para frontend
    rating?: number;
}
