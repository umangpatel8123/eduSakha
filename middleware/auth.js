import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

export const isAuth = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ');
    if (bearer !== 'Bearer') {
      return res.status(400).send({success: false, msg: 'Invalid Tokenn'});
    }

    if (!token) {
      return res.status(401).json({success: false, msg: 'Token not provided'});
    }

    // Verify the token and extract the user's role and ID
    const decodedData = jwt.verify(token, 'test');
    console.log(decodedData, decodedData.role, decodedData.id);
    if (!decodedData || !decodedData.role || !decodedData.id) {
      return res.status(401).json({success: false, msg: 'Invalid tokennnnn'});
    }

    // Check if the user is a student
    if (decodedData.role === 'student') {
      console.log('stu');
      req.userId = decodedData.id;
      req.userRole = 'student';
    } else if (decodedData.role === 'professor') {
      console.log('pro');
      // Check if the user is a professor
      req.userId = decodedData.id;
      req.userRole = 'professor';
    } else {
      return res.status(401).json({success: false, msg: 'Invalid user role'});
    }

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({success: false, msg: 'Invalid token'});
  }
};

export default router;
