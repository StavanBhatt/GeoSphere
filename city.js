const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  city: String,
  state_name: String,
  location: {
    type: {
      type: String,
      enum: ["Point"], // Only "Point" type for GeoJSON
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
});

citySchema.index({ location: "2dsphere" });

const City = mongoose.model("City", citySchema);

module.exports = City;
