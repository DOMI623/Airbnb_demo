import Listing from "../models/Listing.models.js";
import User from "../models/user.models.js";
import { isValidObjectId } from "../utils/IsValidObjetct.js";

export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find()
      .populate("host", "name email")
      .populate("category", "name");

    res.status(200).json({ listings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getListingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const listing = await Listing.findById(id)
      .populate("host", "name email")
      .populate("category", "name");

    if (!listing) {
      return res.status(404).json({ message: "Propiedad no encontrada" });
    }

    res.status(200).json({ listing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      price,
      images,
      host,
      availability,
      category,
    } = req.body;

    if (!title || !description || !location || !price || !host) {
      return res.status(400).json({
        message: "Faltan campos obligatorios",
      });
    }

    if (!isValidObjectId(host)) {
      return res.status(400).json({ message: "Host ID inválido" });
    }

    const hostUser = await User.findById(host).populate("role");

    if (!hostUser) {
      return res.status(404).json({
        message: "El usuario especificado como host no existe",
      });
    }

    if (!hostUser.role || hostUser.role.name !== "host") {
      return res.status(403).json({
        message: "Este usuario no tiene permisos de host",
      });
    }

    if (category && !isValidObjectId(category)) {
      return res.status(400).json({ message: "Category ID inválido" });
    }

    const newListing = new Listing({
      title,
      description,
      location,
      price,
      images,
      host,
      availability,
      category,
    });

    const savedListing = await newListing.save();

    res.status(201).json({ listing: savedListing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const updatedListing = await Listing.findByIdAndUpdate(id, req.body, {
      new: true,
    })
      .populate("host", "name email")
      .populate("category", "name");

    if (!updatedListing) {
      return res.status(404).json({ message: "Propiedad no encontrada" });
    }

    res.status(200).json({ listing: updatedListing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({ message: "Propiedad no encontrada" });
    }

    await Listing.findByIdAndDelete(id);

    res.status(200).json({ message: "Propiedad eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
