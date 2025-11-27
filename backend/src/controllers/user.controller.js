import User from "../models/user.models.js";
import { generateToken } from "../utils/jwt.js";
import { validateRegisterInput } from "../utils/validateUser.js";

// Registro de usuario controlador
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const errorMsg = validateRegisterInput({ name, email, password });
    if (errorMsg) return res.status(400).json({ message: errorMsg });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Inicio de sesión de usuario controlador
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "constraseña incorrecta" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
