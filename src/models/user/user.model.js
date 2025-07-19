import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      street: { type: String, default: "" },
      ward: { type: String, default: "" },
      district: { type: String, default: "" },
      city: { type: String, default: "" },
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.freepik.com/512/3607/3607444.png",
    },
    birthDay: {
      type: Date,
      default: null,
    },
    role: { type: String, enum: ["member", "admin"], default: "member" },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: { type: Boolean, default: false },

    resetPassword: { type: String },
    deleteAt: { type: Date, default: null },
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
