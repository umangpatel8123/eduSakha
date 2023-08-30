import express from 'express';
import mongoose from 'mongoose';
import StudentSchema from '../models/Student.js'; // Import your StudentSchema
import RegisteredSchema from '../models/Registered.js'; // Import your RegisteredSchema
import EventSchema from '../models/Event.js'; // Import your EventSchema

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

export const pastEvents = async (req, res) => {
  const id = req.userId;
  const role = req.userRole;
  if (role !== 'student') {
    return res.status(401).json({success: false, msg: 'Invalid user role'});
  }
  try {
    const registeredEvents = await RegisteredSchema.find({
      studentId: id,
    }).populate({
      path: 'eventId',
      populate: {
        path: 'creator', // Populate the 'creator' field in the 'eventId' object
      },
    });
    const events = registeredEvents.map(regEvent => regEvent.eventId);
    const pastEvents = events.filter(event => {
      const today = new Date();
      const eventDate = new Date(event.end);
      return eventDate < today;
    });
    res.status(200).json({success: true, data: pastEvents});
  } catch (error) {
    res.status(404).json({success: false, msg: error.message});
  }
};

export const upcomingEvents = async (req, res) => {
  try {
    const today = new Date();
    const upcomingEvents = await EventSchema.find({
      start: {$gt: today}, // Find events where start date is greater than today
    }).populate('creator');
    // const upcomingEventIds = upcomingEvents.map(event => event._id);

    res.status(200).json({success: true, data: upcomingEvents});
  } catch (error) {
    res.status(500).json({success: false, msg: error.message});
  }
};

export const ongoingEvents = async (req, res) => {
  const id = req.userId;
  const role = req.userRole;

  if (role !== 'student') {
    return res.status(401).json({success: false, msg: 'Invalid user role'});
  }

  try {
    const registeredEvents = await RegisteredSchema.find({
      studentId: id,
    }).populate({
      path: 'eventId',
      populate: {
        path: 'creator', // Populate the 'creator' field in the 'eventId' object
      },
    });
    const events = registeredEvents.map(regEvent => regEvent.eventId);

    const ongoingEvents = events.filter(event => {
      const today = new Date();
      const eventStartDate = new Date(event.start);
      const eventEndDate = new Date(event.end);

      // Check if event's start date is before or equal to current date and
      // event's end date is after or equal to current date
      return eventStartDate <= today && eventEndDate >= today;
    });

    res.status(200).json({success: true, data: ongoingEvents});
  } catch (error) {
    res.status(500).json({success: false, msg: 'Internal server error'});
  }
};

export default router;
