import express from 'express';
import {
  getRegEvents,
  registerEvent,
  unregisterEvent,
} from '../controllers/student.js';

const router = express.Router();

router.get('/getregevent/:id', getRegEvents);
router.post('/register/:id', registerEvent);
router.post('/unregister/:id', unregisterEvent);

export default router;
