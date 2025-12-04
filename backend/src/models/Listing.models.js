import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "La ubicación es obligatoria"],
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
    },
    images: [
      {
        type: String,
      },
    ],
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    availability: [
      {
        startDate: Date,
        endDate: Date,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
