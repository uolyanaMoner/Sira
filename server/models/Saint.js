import mongoose from "mongoose";

const saintSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String, // ممكن نخليه يوم/شهر أو تاريخ كامل
      required: true,
    },
    story: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "saint",
    },
  },
  { timestamps: true }
);

const Saint = mongoose.model("Saint", saintSchema);

export default Saint;