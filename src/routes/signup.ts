import express from 'express';

const router = express.Router();

router.get('/signup', (_, res) => {
  res.send('signup');
});

export { router as signup };
