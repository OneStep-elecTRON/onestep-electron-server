import express from 'express';
import bcrypt from 'bcrypt';
import validationMiddleware from '../middleware/validationSignin';
import { validationResult } from 'express-validator';
import userModel from '../models/user';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signin', validationMiddleware(), async (req: express.Request, res: express.Response) => {
  try {
    const valiErrors = validationResult(req);
    if (!valiErrors.isEmpty()) {
      res.status(400).send(valiErrors.array());
      return;
    }
    const { email, password }: { email: string; password: string } = req.body;
    const isUserEmailAvai = await userModel.findOne({ email });
    if (isUserEmailAvai === null) {
      res.status(201).json({ message: 'User not found' });
      return;
    }
    bcrypt.compare(password, isUserEmailAvai.password, (err, hash) => {
      if (err || hash === false) {
        res.status(404).json({ message: 'Incorrect password.' });
        return;
      }
      const token: string = jwt.sign(
        { username: isUserEmailAvai.username, userid: isUserEmailAvai._id },
        process.env.JWT_TOKEN!,
        {
          expiresIn: '24h',
        }
      );
      res.status(201).json({
        message: 'User logged in',
        data: {
          token,
        },
      });
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

export { router as signin };
