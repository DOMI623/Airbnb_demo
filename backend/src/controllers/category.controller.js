import Category from "../models/Category.models.js";
import { isValidObjectId } from "../utils/IsValidObjetct.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required." });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(409).json({ message: "Category already exists." });
    }

    const newCategory = new Category({ name, description });
    await newCategory.save();

    return res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid category ID." });
    }

    const { name, description } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    if (name) {
      const nameExists = await Category.findOne({ name, _id: { $ne: id } });
      if (nameExists) {
        return res
          .status(409)
          .json({ message: "Category name already exists." });
      }
    }

    category.name = name || category.name;
    category.description = description || category.description;

    await category.save();

    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid category ID." });
    }

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    await Category.findByIdAndDelete(id);

    return res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};
