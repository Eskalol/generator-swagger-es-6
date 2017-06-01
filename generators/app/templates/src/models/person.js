import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
});

export default mongoose.model('Person', personSchema);
