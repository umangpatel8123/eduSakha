import express from 'express';
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  profPastEvents,
  profUpcomingEvents,
  profOngoingEvents,
} from '../controllers/proff.js';
import {isAuth} from '../middleware/auth.js';

const router = express.Router();

router.get('/profPast', isAuth, profPastEvents);
router.get('/profUpcoming', isAuth, profUpcomingEvents);
router.get('/profOngoing', isAuth, profOngoingEvents);

router.get('/getEvents', isAuth, getEvents);
router.post('/createEvent', isAuth, createEvent);
router.patch('/updateEvent/:id', isAuth, updateEvent);
router.delete('/deleteEvent/:id', isAuth, deleteEvent);

export default router;
