const mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Number,
      default: 0,
    },
    files: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "File",
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.validPassword = function (password) {
  if (this.password != null) {
    return bcrypt.compareSync(password, this.password);
  } else {
    return false;
  }
};

userSchema.methods.encrpytPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(7), null);
};

module.exports = mongoose.model("User", userSchema);
