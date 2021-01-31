import express from 'express';
import db from '../db';
import bcrypt from 'bcrypt';
import validationMiddleware from '../middleware/validationSignup';
import { validationResult } from 'express-validator';

const router = express.Router();
const firestore = db.firestore();

router.post('/signup', validationMiddleware(), async (req: express.Request, res: express.Response) => {
  try {
    const valiErrors = validationResult(req);
    if (!valiErrors.isEmpty()) {
      res.status(400).send(valiErrors.array());
      return;
    }
    const { email, password }: { email: string; password: string } = req.body;
    const isUserAvai = await firestore.collection('users').where('email', '==', email).get();
    if (!isUserAvai.empty) {
      res.status(201).json({ message: 'This email already exists' });
      return;
    }
    bcrypt.hash(password, 11, async (err, hash) => {
      if (!err) {
        await firestore.collection('users').doc().set({ email, password: hash });
        res.status(201).json({ message: 'User created' });
        return;
      }
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

export { router as signup };
