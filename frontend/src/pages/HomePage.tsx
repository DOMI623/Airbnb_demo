import { useListings } from "../hooks/useListings";
import ListingCard from "../components/ListingCard";

const categories = [
  {
    name: "Apartamentos",
    image: "https://cdn.plusval.com.do/landings/13602/1666738244-thumb.jpg",
  },
  {
    name: "Villas",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  },
  {
    name: "Cabañas",
    image:
      "https://a0.muscache.com/im/pictures/miso/Hosting-47940297/original/38b40999-8d3b-4090-b6f9-0914138f790e.jpeg",
  },
  {
    name: "Lofts",
    image: "https://images.unsplash.com/photo-1599423300746-b62533397364",
  },
];

export default function HomePage() {
  const { listings, loading, error } = useListings();

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  const featuredListings = listings.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative rounded-lg overflow-hidden mb-10">
        <img
          src="https://images.unsplash.com/photo-1502672023488-70e25813eb80"
          alt="Hero"
          className="w-full h-64 sm:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-3xl sm:text-5xl text-white font-bold text-center">
            Encuentra tu alojamiento ideal
          </h1>
        </div>
      </section>

      {/* Categorías con imágenes */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Categorías</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="relative rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {cat.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Destacados */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map((listing) => (
            <ListingCard key={listing._id} item={listing} />
          ))}
        </div>
      </section>
    </div>
  );
}
