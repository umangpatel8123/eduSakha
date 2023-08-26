import mongoose from 'mongoose';

const ProffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  proffId: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  proffEmail: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  proffPassword: {
    type: String,
    required: true,
    trim: true,
  },
  proffPhone: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
});

export default mongoose.model('Proff', ProffSchema);
