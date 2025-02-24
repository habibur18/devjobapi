import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

export const TodoModel = mongoose.models.Todo ?? mongoose.model("Todo", todoSchema);
