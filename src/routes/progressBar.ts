import express from 'express';
import auth from '../middleware/auth';
import userModel from '../models/user';

const router = express.Router();

router.patch('/progress', auth, async (req: express.Request, res: express.Response) => {
  const { track, count }: { track: string; count: number } = req.body;
  const filter = { _id: req.user!.userid };
  let update: {};
  if (track === 'basic') {
    update = { 'progress.basic': Math.round(count + 100 / +process.env.BASIC_TRACK!) };
  } else if (track === 'intermediate') {
    update = { 'progress.intermediate': Math.round(count + 100 / +process.env.INTERMEDIATE_TRACK!) };
  } else if (track === 'advanced') {
    update = { 'progress.advanced': Math.round(count + 100 / +process.env.ADVANCED_TRACK!) };
  }
  const updateProgress = await userModel.findOneAndUpdate(filter, update!, { new: true });
  res.status(201).json({
    message: `${track} progress updated`,
    data: {
      id: updateProgress._id,
      username: updateProgress.username,
      email: updateProgress.email,
      progress: updateProgress.progress,
    },
  });
});

export { router as progress };
