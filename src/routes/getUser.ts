import express from 'express';
import auth from '../middleware/auth';
import userModel from '../models/user';

const router = express.Router();

router.get('/', auth, async (req: express.Request, res: express.Response) => {
  try {
    const user = await userModel.findOne({ _id: req.user!.userid });
    res.status(201).json({
      message: `User Data`,
      data: {
        id: user!._id,
        username: user!.username,
        email: user!.email,
        track: user!.track,
      },
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

export { router as getUser };
