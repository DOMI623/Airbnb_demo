import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id, // CORRECTO
      email: user.email,
      role: user.role, // ObjectId del rol
    },
    SECRET_KEY,
    { expiresIn: "7d" }
  );
};
