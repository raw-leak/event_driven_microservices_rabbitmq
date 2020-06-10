import mongoose, { Schema } from 'mongoose';

const TodoListSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  list: {
    type: [String]
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

export const TodoList = mongoose.model('TodoList', TodoListSchema);
