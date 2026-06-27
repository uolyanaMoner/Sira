import mongoose from "mongoose";

const saintSchema = new mongoose.Schema({
  name: String,
  title: String,
  story: String,
});

const readingSchema = new mongoose.Schema({
  psalm: String,
  gospel: String,
  epistle: String,

  vespers: [String],
  matins: [String],
  paul: [String],
  catholic: [String],
  acts: [String],
  psalmAndGospel: [String],
});

const synaxariumDaySchema = new mongoose.Schema(
  {
    date: { type: String, required: true, unique: true },

    gregorianDate: String,
    copticDate: String,

    intro: String,

    saints: [saintSchema],

    readings: readingSchema,
  },
  { timestamps: true }
);

export default mongoose.model("SynaxariumDay", synaxariumDaySchema);