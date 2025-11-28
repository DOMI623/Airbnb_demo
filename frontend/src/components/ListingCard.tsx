// src/components/ListingCard.tsx
import { type Listing } from "../types/listing";

interface Props {
  item: Listing;
}

export default function ListingCard({ item }: Props) {
  const { title, location, price, images, category } = item;

  return (
    <div
      className="
        bg-white rounded-xl overflow-hidden shadow-sm 
        hover:shadow-lg transition-all cursor-pointer
        hover:-translate-y-1
      "
    >
      <div className="w-full h-52 overflow-hidden">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-gray-600 text-sm">{location}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-500 text-sm capitalize">{category}</span>
          <span className="font-bold">${price}/noche</span>
        </div>
      </div>
    </div>
  );
}
