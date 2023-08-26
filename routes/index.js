import express from 'express';
import studRouter from './studRouter.js';
import proffRouter from './proffRouter.js';
import authRouter from './authRouter.js';

const router = express.Router(studRouter, proffRouter, authRouter);

router.use(studRouter, authRouter, proffRouter);

export default router;
