import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Aquí luego metemos navbar */}
      <Outlet />
    </div>
  );
}
