const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true },
  ip1: { type: String, required: true },
  ip2: { type: String, required: true },
  ip3: { type: String, required: true },
  ip4: { type: String, required: true },
  attendance: { type: String, required: true },
  firstRecommendation: { type: String, required: true },
  firstRecommendationReason: { type: String, required: false },
  finalRecommendation: { type: String, required: true },
  finalRecommendationReason: { type: String, required: false }
});

module.exports = mongoose.model("Student", studentSchema);
