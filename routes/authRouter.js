import express from 'express';
import {
  proffSignup,
  proffLogin,
  studentLogin,
  studentSignup,
} from '../controllers/Auth.js';
import {isAuth} from '../middleware/auth.js';

const router = express.Router();

router.post('/proffSignup', proffSignup);
router.post('/proffLogin', proffLogin);
router.post('/studentSignup', studentSignup);
router.post('/studentLogin', studentLogin);

export default router;
