import express from 'express';
import mongoose from 'mongoose';
import StudentSchema from '../models/Student.js'; // Import your StudentSchema
import RegisteredSchema from '../models/Registered.js'; // Import your RegisteredSchema

const router = express.Router();

export const getRegEvents = async (req, res) => {
  // const {id} = req.params; // Access the id parameter from req.params
  const id = req.userId;
  const role = req.userRole;
  if (role !== 'student') {
    return res.status(401).json({success: false, msg: 'Invalid user role'});
  }
  try {
    // Rest of your code remains the same
    const registeredEvents = await RegisteredSchema.find({
      studentId: id,
    }).populate('eventId');
    // const registeredEvents = student.registeredEvents.map(
    //   regEvent => regEvent.eventId
    // );
    const events = registeredEvents.map(regEvent => regEvent.eventId);
    res.status(200).json({success: true, data: events});
  } catch (error) {
    res.status(404).json({success: false, msg: error.message});
  }
};

export const registerEvent = async (req, res) => {
  // const {id} = req.params;
  const id = req.userId;
  const role = req.userRole;
  if (role !== 'student') {
    return res.status(401).json({success: false, msg: 'Invalid user role'});
  }
  const {eventId} = req.body;
  console.log(id, eventId);
  try {
    const reg = new RegisteredSchema({
      eventId: eventId,
      studentId: id,
    });
    await reg.save();
    res.status(201).send({
      success: true,
      msg: 'Event registered successfully',
      data: reg,
    });
  } catch (error) {
    res.status(409).send({success: false, msg: error.message});
  }
};

export const unregisterEvent = async (req, res) => {
  // const {id} = req.params; // Student ID
  const id = req.userId;
  const role = req.userRole;
  if (role !== 'student') {
    return res.status(401).json({success: false, msg: 'Invalid user role'});
  }
  const {eventId} = req.body;
  console.log(id, eventId);
  try {
    // Delete the registered event with the given studentId and eventId
    const result = await RegisteredSchema.deleteOne({
      studentId: id,
      eventId: eventId,
    });

    if (result.deletedCount > 0) {
      res
        .status(200)
        .json({success: true, msg: 'Event unregistered successfully.'});
    } else {
      res
        .status(404)
        .json({success: false, msg: 'Event not found for the student.'});
    }
  } catch (error) {
    res.status(500).json({success: false, msg: error.message});
  }
};

export default router;
