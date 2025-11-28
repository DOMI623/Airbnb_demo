import BookingStatus from "../models/statusBooking.models.js";
import mongoose from "mongoose";

// Obtener todos los statuses
export const getAllBookingStatuses = async (req, res) => {
  try {
    const statuses = await BookingStatus.find();
    res.status(200).json({ statuses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un status
export const createBookingStatus = async (req, res) => {
  try {
    const { name, description, color, isFinal } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ message: "El nombre del status es obligatorio" });
    }
    const existBookingStatus = await BookingStatus.findOne({ name });
    if (existBookingStatus) {
      return res
        .status(400)
        .json({ message: "El status con ese nombre ya existe" });
    }
    const newStatus = new BookingStatus({ name, description, color, isFinal });
    const savedStatus = await newStatus.save();
    res.status(201).json({ status: savedStatus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStatus = await BookingStatus.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ status: updatedStatus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un status
export const deleteBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID de status es requerido" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "El ID proporcionado no es válido" });
    }

    const statusFound = await BookingStatus.findById(id);

    if (!statusFound) {
      return res.status(404).json({ message: "El status no existe" });
    }

    await BookingStatus.findByIdAndDelete(id);

    res.status(200).json({ message: "Status eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
