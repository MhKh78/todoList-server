const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "User Must Have A Username"],
    unique: [true, "Username Must Be Unique"],
  },
  email: {
    type: String,
    required: [true, "User Must Have An Email"],
    unique: [true, "Email Must Be Unique"],
  },
  password: {
    type: String,
    required: [true, "User Must Have A Password"],
  },
  todoList: [
    {
      type: Schema.ObjectId,
      ref: "Todo",
    },
  ],
});

UserSchema.pre(/^find/, function (next) {
  // this points to the current quert
  this.populate("todoList");
  next();
});
UserSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

exports.User = mongoose.model("User", UserSchema);
