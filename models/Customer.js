import mongoose from "mongoose";
const CustomerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    nrc: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", CustomerSchema);
