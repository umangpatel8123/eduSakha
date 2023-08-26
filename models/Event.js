import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  // price: {
  //   type: Number,
  //   required: true,
  //   trim: true,
  //   maxlength: 50,
  // },
  start: {
    type: Date,
    required: true,
    trim: true,
    maxlength: 50,
  },
  end: {
    type: Date,
    required: true,
    trim: true,
    maxlength: 50,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proff',
  },
});

export default mongoose.model('Event', EventSchema);
