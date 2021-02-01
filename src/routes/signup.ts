import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validationMiddleware from '../middleware/validationSignup';
import { validationResult } from 'express-validator';
import userModel from '../models/user';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', validationMiddleware(), async (req: express.Request, res: express.Response) => {
  try {
    const valiErrors = validationResult(req);
    if (!valiErrors.isEmpty()) {
      res.status(400).send(valiErrors.array());
      return;
    }
    const { username, email, password }: { username: string; email: string; password: string } = req.body;
    const isUserEmailAvai = await userModel.find({ email });
    const isUsernameAvai = await userModel.find({ username });
    if (isUserEmailAvai.length != 0) {
      res.status(201).json({ message: 'This email already exists' });
      return;
    }
    if (isUsernameAvai.length != 0) {
      res.status(201).json({ message: 'This username already exists' });
      return;
    }
    bcrypt.hash(password, 11, async (err, hash) => {
      if (!err) {
        const user = new userModel({
          _id: new mongoose.Types.ObjectId(),
          username: username,
          email: email,
          password: hash,
        });
        const createdUser = await user.save();
        const token: string = await jwt.sign(
          { username: createdUser.username, userid: createdUser._id },
          process.env.JWT_TOKEN!,
          {
            expiresIn: '24h',
          }
        );
        res.status(201).json({ message: 'User created', token });
        return;
      }
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

export { router as signup };
