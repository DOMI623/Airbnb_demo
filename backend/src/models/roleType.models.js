import mongoose from "mongoose";

const roleTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del rol es obligatorio"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    versionKey: false,
  }
);

const RoleType = mongoose.model("RoleType", roleTypeSchema);

export default RoleType;
