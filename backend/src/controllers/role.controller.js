import RoleType from "../models/roleType.models.js";
import { isValidObjectId } from "../utils/IsValidObjetct.js";

export const getAllRoles = async (req, res) => {
  try {
    const roles = await RoleType.find().lean();
    return res.status(200).json({ success: true, data: roles });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ message: "El nombre del rol es obligatorio" });
    }

    const existingRole = await RoleType.findOne({ name }).lean();
    if (existingRole) {
      return res.status(409).json({ message: "El rol ya existe" });
    }

    const newRole = await RoleType.create({ name, description });

    return res.status(201).json({ success: true, data: newRole });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const role = await RoleType.findById(id);
    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    if (name) {
      const duplicate = await RoleType.findOne({
        name,
        _id: { $ne: id },
      }).lean();
      if (duplicate) {
        return res
          .status(409)
          .json({ message: "Ya existe otro rol con ese nombre" });
      }
    }

    role.name = name || role.name;
    role.description = description || role.description;

    await role.save();

    return res.status(200).json({ success: true, data: role });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const role = await RoleType.findById(id).lean();
    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    await RoleType.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Rol eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
