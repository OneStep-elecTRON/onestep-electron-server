import express from 'express';
// import db from '../db';

// const firestore = db.firestore();

const router = express.Router();

router.post('/signin', async (_, res) => {
  // const { email, password }: { email: string; password: string } = req.body;
  // const isUserAvai = await firestore.collection('users').where('email', '==', email).get();
  // if (isUserAvai.empty) {
  //   res.status(400).send({ message: 'User not found' });
  // }
  // const isUserAvai = await firestore.collection('users').where('email', '==', email).get();
  res.status(201).send({ message: 'User found' });
});

export { router as signin };
