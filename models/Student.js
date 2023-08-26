import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  studentId: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  studentEmail: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  studentPassword: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  studentPhone: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
});

export default mongoose.model('Student', StudentSchema);
