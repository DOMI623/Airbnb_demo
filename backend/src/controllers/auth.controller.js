import User from "../models/user.models.js";

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("role")
      .populate("address");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      phone: user.phone,
      address: user.address,
      createdAt: user.createdAt,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error obteniendo usuario", error: error.message });
  }
};
