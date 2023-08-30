import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    unique: true,
    required: true,
  },
  studentEmail: {
    type: String,
    unique: true,
    required: true,
  },
  studentPassword: {
    type: String,
    unique: true,
    required: true,
  },
  studentPhone: {
    type: String,
    unique: true,
    required: true,
  },
});

export default mongoose.model('Student', StudentSchema);
