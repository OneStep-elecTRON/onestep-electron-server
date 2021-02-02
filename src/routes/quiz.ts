import express from 'express';
import auth from '../middleware/auth';
import userModel from '../models/user';

const router = express.Router();

router.patch('/quiz', auth, async (req: express.Request, res: express.Response) => {
  try {
    const { track, isCorrect }: { track: string; isCorrect: boolean } = req.body;
    const oldUserData: any = await userModel.findOne({ _id: req.user!.userid });
    const filter = { _id: req.user!.userid };
    let update: {};
    if (track === 'basic') {
      if (isCorrect) {
        update = {
          'track.basic.quizScore': oldUserData.track.basic.quizScore + 1,
          'track.basic.totalQuizAnswered': oldUserData.track.basic.totalQuizAnswered + 1,
        };
      } else {
        update = {
          'track.basic.totalQuizAnswered': oldUserData.track.basic.totalQuizAnswered + 1,
        };
      }
    } else if (track === 'intermediate') {
      if (isCorrect) {
        update = {
          'track.intermediate.quizScore': oldUserData.track.intermediate.quizScore + 1,
          'track.intermediate.totalQuizAnswered': oldUserData.track.intermediate.totalQuizAnswered + 1,
        };
      } else {
        update = {
          'track.intermediate.totalQuizAnswered': oldUserData.track.intermediate.totalQuizAnswered + 1,
        };
      }
    } else if (track === 'advanced') {
      if (isCorrect) {
        update = {
          'track.advanced.quizScore': oldUserData.track.advanced.quizScore + 1,
          'track.advanced.totalQuizAnswered': oldUserData.track.advanced.totalQuizAnswered + 1,
        };
      } else {
        update = {
          'track.advanced.totalQuizAnswered': oldUserData.track.advanced.totalQuizAnswered + 1,
        };
      }
    }
    await userModel.findOneAndUpdate(filter, update!, { new: true });
    res.status(201).json({ isUpdated: true });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

export { router as quiz };
