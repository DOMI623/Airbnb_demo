import NotificationType from "../models/NotificationType.model.js";

export const createNotificationType = async (req, res) => {
  try {
    const {
      name,
      sendEmail = false,
      sendInApp = true,
      description = "",
    } = req.body;

    const existing = await NotificationType.findOne({ name });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Tipo de notificación ya existe" });
    }

    const newType = new NotificationType({
      name,
      sendEmail,
      sendInApp,
      description,
    });
    await newType.save();

    res
      .status(201)
      .json({ message: "Tipo de notificación creado", type: newType });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const getNotificationTypes = async (req, res) => {
  try {
    const types = await NotificationType.find();
    res.status(200).json({ types });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const getNotificationTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const type = await NotificationType.findById(id);
    if (!type) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }
    res.status(200).json({ type });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const updateNotificationType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sendEmail, sendInApp, description } = req.body;

    const updated = await NotificationType.findByIdAndUpdate(
      id,
      { name, sendEmail, sendInApp, description },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }

    res.status(200).json({ message: "Tipo actualizado", type: updated });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const deleteNotificationType = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await NotificationType.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }

    res.status(200).json({ message: "Tipo eliminado", type: deleted });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};
