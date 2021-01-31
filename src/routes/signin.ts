import express from 'express';

const router = express.Router();

router.get('/signin', (_, res) => {
  res.send('signin');
});

export { router as signin };
