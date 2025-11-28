// src/pages/auth/RegisterPage.tsx
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { RegisterDto } from "../../types/user.types";
import api from "../../api/axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: RegisterDto = { name, email, password };

    try {
      await api.post("/users/register", payload);
      toast.success("Registro exitoso");
      navigate("/login");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl w-96 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h2>

        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700">
          Registrarme
        </button>

        <p className="text-center mt-4">
          ¿Ya tienes cuenta?{" "}
          <a className="text-blue-600" href="/login">
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  );
}
