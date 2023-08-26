import express from 'express';
import mongoose from 'mongoose';
import EventSchema from '../models/Event.js';
import ProffSchema from '../models/Proff.js';
import {isAuth} from '../middleware/auth.js';

const router = express.Router();

export const getEvents = async (req, res) => {
  const role = req.userRole;
  const id = req.userId;
  if (role !== 'professor') {
    return res.status(401).json({success: false, msg: 'Invalid user role'});
  }
  try {
    const events = await EventSchema.find({professorId: id});
    res.status(200).json({success: true, data: events});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
};

export const createEvent = async (req, res) => {
  const role = req.userRole;
  const id = req.userId;
  if (role !== 'professor') {
    return res.status(401).json({success, msg: 'Invalid user role'});
  }
  const {title, description, start, end} = req.body;
  const newEvent = new EventSchema({
    title: title,
    description: description,
    start: start,
    end: end,
    creator: id,
  });
  try {
    await newEvent.save();
    res
      .status(201)
      .json({success: true, msg: 'Event created successfully', data: newEvent});
  } catch (error) {
    res.status(409).json({success: false, msg: error.message});
  }
};

export const updateEvent = async (req, res) => {
  const {id: _id} = req.params;
  const {start, end} = req.body;
  const role = req.userRole;
  if (role !== 'professor') {
    return res.status(401).json({
      success: false,
      msg: 'invalid role',
    });
  }
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No event with that id');
  }

  try {
    const updatedEvent = await EventSchema.findByIdAndUpdate(
      _id,
      {$set: {start, end}}, // Use $set to update specific fields
      {new: true} // Return the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({success: false, msg: 'Event not found'});
    }

    res.json({
      success: true,
      msg: 'Event updated successfully',
      data: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({success: false, msg: error.message});
  }
};

export const deleteEvent = async (req, res) => {
  const {id} = req.params;
  const role = req.userRole;
  if (role !== 'professor') {
    return res.status(401).json({
      success: false,
      msg: 'invalid role',
    });
  }
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No event with that id');
  await EventSchema.findByIdAndRemove(id);
  res.json({message: 'Event deleted successfully'});
};

export default router;
