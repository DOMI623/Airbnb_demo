import NotificationType from "../models/NotificationType.model.js";

export const seedNotificationTypes = async () => {
  const defaultTypes = [
    { name: "booking", sendEmail: true, sendInApp: true },
    { name: "message", sendEmail: false, sendInApp: true },
    { name: "promotion", sendEmail: true, sendInApp: true },
    { name: "system", sendEmail: true, sendInApp: true },
  ];

  for (let type of defaultTypes) {
    await NotificationType.updateOne({ name: type.name }, type, {
      upsert: true,
    });
  }

  console.log("✔ Notification Types Seeded");
};
