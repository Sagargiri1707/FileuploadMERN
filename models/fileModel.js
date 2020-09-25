const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
  {
    data: Buffer,
    contentType: String,
    name: String,
    by: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
