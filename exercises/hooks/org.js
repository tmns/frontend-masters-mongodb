const mongoose = require("mongoose");
const Project = require("./project");

const orgSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  subscription: {
    status: {
      type: String,
      required: true,
      default: ["active"],
      enum: ["active", "trialing", "overdue", "canceled"]
    },
    last4: {
      type: Number,
      min: 4,
      max: 4
    }
  }
});

orgSchema.post("remvoe", async function(doc, next) {
  await Project.deleteMany({ org: doc._id });
});

module.exports = mongoose.model("org", orgSchema);
