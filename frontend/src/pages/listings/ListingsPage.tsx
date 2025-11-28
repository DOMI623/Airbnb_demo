// src/pages/listings/ListingPage.tsx
import ListingCard from "../../components/ListingCard";
import { useListings } from "../../hooks/useListings";

export default function ListingPage() {
  const { listings, loading, error } = useListings();

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Explora alojamientos</h1>

      <div
        className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-6
      "
      >
        {listings.map((listing) => (
          <ListingCard key={listing._id} item={listing} />
        ))}
      </div>
    </div>
  );
}
