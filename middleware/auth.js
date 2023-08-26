import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

export const isAuth = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ');

    if (bearer !== 'Bearer') {
      return res.status(400).send({success: false, msg: 'Invalid Token'});
    }

    if (!token) {
      return res.status(401).json({message: 'Token not provided'});
    }

    // Verify the token and extract the user's role and ID
    const decodedData = jwt.verify(token, 'your-secret-key');

    if (!decodedData || !decodedData.role || !decodedData.id) {
      return res.status(401).json({message: 'Invalid token'});
    }

    // Check if the user is a student
    if (decodedData.role === 'student') {
      req.userId = decodedData.id;
      req.userRole = 'student';
    } else if (decodedData.role === 'professor') {
      // Check if the user is a professor
      req.userId = decodedData.id;
      req.userRole = 'professor';
    } else {
      return res.status(401).json({message: 'Invalid user role'});
    }

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({message: 'Invalid token'});
  }
};

export default router;
