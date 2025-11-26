import { useState } from "react";
import { userService } from "../../services/userService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await userService.login({ email, password });
      console.log("LOGIN OK:", res.data);
    } catch (error) {
      console.log("ERROR LOGIN:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="p-6 shadow-lg bg-white flex flex-col gap-4"
        onSubmit={onSubmit}
      >
        <h2 className="text-xl font-bold">Login</h2>
        <input
          className="border p-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2">Entrar</button>
      </form>
    </div>
  );
}
