import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import StudentSchema from '../models/Student.js';
import ProffSchema from '../models/Proff.js';

const router = express.Router();

export const proffSignup = async (req, res) => {
  const {name, proffId, proffEmail, proffPassword, proffPhone} = req.body;
  // console.log(name, proffId, proffEmail, proffPassword, proffPhone);

  try {
    if (
      proffEmail === undefined ||
      proffPassword === undefined ||
      proffId === undefined ||
      proffPhone === undefined ||
      name === undefined
    ) {
      return res
        .status(400)
        .json({success: false, msg: 'Please fill all the fields'});
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!proffEmail || !emailRegex.test(proffEmail)) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid email address',
      });
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!proffPassword || !passwordRegex.test(proffPassword)) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid password. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      });
    }

    if (await ProffSchema.findOne({proffEmail})) {
      return res.status(400).json({success: false, msg: 'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(proffPassword, 12);
    const proff = new ProffSchema({
      name,
      proffId,
      proffEmail,
      proffPassword: hashedPassword,
      proffPhone,
    });
    proff.save();
    const token = jwt.sign(
      {email: proff.proffEmail, id: proff._id, role: 'professor'},
      'test'
    );
    return res.status(200).json({success: true, result: proff, token: token});
    // ... Save the proff to the database or perform other actions
  } catch (error) {
    return res
      .status(400)
      .json({success: false, msg: 'Please fill all the fields'});
  }
};

export const proffLogin = async (req, res) => {
  const {proffEmail, proffPassword} = req.body;
  // console.log(proffEmail, proffPassword);
  try {
    if (proffEmail === undefined || proffPassword === undefined) {
      return res
        .status(400)
        .json({success: false, msg: 'Please fill all the fields'});
    }
    const proff = await ProffSchema.findOne({proffEmail});
    if (!proff) {
      return res.status(400).json({success: false, msg: 'User does not exist'});
    }
    const isPasswordCorrect = await bcrypt.compare(
      proffPassword,
      proff.proffPassword
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({success: false, msg: 'Invalid credentials'});
    }
    const token = jwt.sign(
      {email: proffEmail, id: proff._id, role: 'professor'},
      'test'
    );
    return res.status(200).json({success: true, result: proff, token});
  } catch (error) {
    return res.status(400).json({success: false, msg: 'internal server error'});
  }
};

export const studentSignup = async (req, res) => {
  const {name, studentId, studentEmail, studentPassword, studentPhone} =
    req.body;
  // console.log(name, studentId, studentEmail, studentPassword, studentPhone);
  try {
    if (
      name === undefined ||
      studentId === undefined ||
      studentEmail === undefined ||
      studentPassword === undefined ||
      studentPhone === undefined
    ) {
      return res
        .status(400)
        .json({success: false, msg: 'Please fill all the fields'});
    }
    //email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!studentEmail || !emailRegex.test(studentEmail)) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid email address',
      });
    }
    //   //password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!studentPassword || !passwordRegex.test(studentPassword)) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid password. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      });
    }
    if (await StudentSchema.findOne({studentEmail})) {
      return res.status(400).json({success: false, msg: 'User already exists'});
    }
    const hashedPassword = await bcrypt.hash(studentPassword, 12);
    const student = new StudentSchema({
      name,
      studentId,
      studentEmail,
      studentPassword: hashedPassword,
      studentPhone,
    });
    student.save();
    const token = jwt.sign(
      {email: studentEmail, id: student._id, role: 'student'},
      'test'
    );
    res.status(200).json({success: true, data: student, token: token});
  } catch (error) {
    console.log(error);
    return res.status(400).json({success: false, msg: 'internal server error'});
  }
};

export const studentLogin = async (req, res) => {
  const {studentEmail, studentPassword} = req.body;
  // console.log(studentEmail, studentPassword);
  try {
    if (studentEmail === undefined || studentPassword === undefined) {
      return res
        .status(400)
        .json({success: false, msg: 'Please fill all the fields'});
    }
    const stud = await StudentSchema.findOne({studentEmail});
    if (!stud) {
      return res.status(400).json({success: false, msg: 'User does not exist'});
    }
    const isPasswordCorrect = await bcrypt.compare(
      studentPassword,
      stud.studentPassword
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({success: false, msg: 'Invalid credentials'});
    }
    const token = jwt.sign(
      {email: studentEmail, id: stud._id, role: 'student'},
      'test'
    );
    return res.status(200).json({success: true, result: stud, token});
  } catch (error) {
    console.log(error);
    return res.status(400).json({success: false, msg: 'internal server error'});
  }
};

export default router;
