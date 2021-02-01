import express from 'express';
import auth from '../middleware/auth';
import userModel from '../models/user';

const router = express.Router();

router.patch('/progress', auth, async (req: express.Request, res: express.Response) => {
  try {
    const { track, count }: { track: string; count: number } = req.body;
    const filter = { _id: req.user!.userid };
    let update: {};
    if (track === 'basic') {
      update = { 'track.basic.progress': Math.round(count + 100 / +process.env.BASIC_TRACK!) };
    } else if (track === 'intermediate') {
      update = { 'track.intermediate.progress': Math.round(count + 100 / +process.env.INTERMEDIATE_TRACK!) };
    } else if (track === 'advanced') {
      update = { 'track.advanced.progress': Math.round(count + 100 / +process.env.ADVANCED_TRACK!) };
    }
    await userModel.findOneAndUpdate(filter, update!, { new: true });
    res.status(201).json({ isUpdated: true });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

export { router as progress };
