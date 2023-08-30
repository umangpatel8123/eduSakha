import mongoose from 'mongoose';

const ProffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  proffId: {
    type: String,
    unique: true,
    required: true,
  },
  proffEmail: {
    type: String,
    unique: true,
    required: true,
  },
  proffPassword: {
    type: String,
    required: true,
  },
  proffPhone: {
    type: String,
    unique: true,
    required: true,
  },
});

export default mongoose.model('Proff', ProffSchema);
