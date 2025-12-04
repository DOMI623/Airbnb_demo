import { Address } from "../models/address.models.js";
import User from "../models/user.models.js";

export const createAddress = async (req, res) => {
  try {
    const { street, city, state, zipCode, country } = req.body;

    const userId = req.user.id;

    if (!street || !city || !state || !zipCode || !country) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAddress = new Address({
      user: userId,
      street,
      city,
      state,
      zipCode,
      country,
    });

    const savedAddress = await newAddress.save();

    await User.findByIdAndUpdate(userId, {
      $push: { address: savedAddress._id },
    });

    res.status(201).json({
      message: "Address created successfully",
      address: savedAddress,
    });
  } catch (error) {
    console.log("Error creating address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find().populate("user", "name email");
    res.status(200).json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAdress = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Address ID is required" });
    }

    const deletedAddress = await Address.findByIdAndDelete(id);

    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyAddresses = async (req, res) => {
  try {
    const userId = req.user.id;

    const addresses = await Address.find({ user: userId }).select("-__v");

    return res.status(200).json(addresses);
  } catch (error) {
    console.error("Error obteniendo direcciones:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};
