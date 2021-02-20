const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const TodoSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Todo Must Have A Name"],
    },
    description: {
      type: String,
      required: [true, "Todo Must Have A Description"],
    },
  },
  { timestamps: true }
);

exports.Todo = mongoose.model("Todo", TodoSchema);
