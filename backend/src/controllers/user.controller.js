import User from "../models/user.models.js";
import RoleType from "../models/roleType.models.js";
import { generateToken } from "../utils/jwt.js";
import { validateRegisterInput } from "../utils/validateUser.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const errorMsg = validateRegisterInput({ name, email, password });
    if (errorMsg) return res.status(400).json({ message: errorMsg });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "El usuario ya existe" });

    const roleDoc =
      (await RoleType.findOne({ name: role })) ||
      (await RoleType.findOne({ name: "client" }));

    if (!roleDoc) return res.status(400).json({ message: "Rol no válido" });

    const newUser = new User({
      name,
      email,
      password,
      role: roleDoc._id,
    });

    await newUser.save();

    const token = generateToken(newUser);

    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// LOGIN
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = generateToken(user);

    return res.status(200).json({
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
