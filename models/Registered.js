import express from 'express';
import mongoose from 'mongoose';

const RegisteredSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
});

export default mongoose.model('Registered', RegisteredSchema);
