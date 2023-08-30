import express from 'express';
import {
  getRegEvents,
  registerEvent,
  unregisterEvent,
  pastEvents,
  upcomingEvents,
  ongoingEvents,
} from '../controllers/student.js';
import {isAuth} from '../middleware/auth.js';

const router = express.Router();

router.get('/pastevents', isAuth, pastEvents);
router.get('/upcomingevents', isAuth, upcomingEvents);
router.get('/ongoing', isAuth, ongoingEvents);

router.get('/getregevent', isAuth, getRegEvents);
router.post('/register', isAuth, registerEvent);
router.post('/unregister', isAuth, unregisterEvent);

export default router;
