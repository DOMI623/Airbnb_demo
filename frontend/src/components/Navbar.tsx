import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-red-500 cursor-pointer">
          <Link to="/dashboard">Airbnb</Link>
        </h1>

        {/* Search */}
        <div className="hidden sm:flex items-center gap-3 border px-4 py-2 rounded-full shadow-sm hover:shadow-md transition">
          <span className="text-sm">Cualquier lugar</span>
          <span className="text-sm text-gray-400">|</span>
          <span className="text-sm">Cualquier semana</span>
          <span className="text-sm text-gray-400">|</span>
          <span className="text-sm">¿Cuántos?</span>
        </div>

        {/* User area */}
        <div className="flex items-center gap-3">
          <button className="text-sm font-semibold hover:bg-gray-100 px-3 py-2 rounded-full">
            Airbnb tu alojamiento
          </button>

          <div className="flex items-center gap-2 border px-3 py-2 rounded-full hover:shadow-md transition cursor-pointer">
            <span className="material-icons">menu</span>
            <img
              src="https://i.pravatar.cc/40"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
