import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: mongoose.Schema.Types.String, required: true, unique: true },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
    match: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
  },
  password: { type: mongoose.Schema.Types.String, required: true },
  track: {
    basic: {
      progress: { type: mongoose.Schema.Types.Number, default: 0 },
      quizScore: { type: mongoose.Schema.Types.Number, default: 0 },
      totalQuizAnswered: { type: mongoose.Schema.Types.Number, default: 0 },
    },
    intermediate: {
      progress: { type: mongoose.Schema.Types.Number, default: 0 },
      quizScore: { type: mongoose.Schema.Types.Number, default: 0 },
      totalQuizAnswered: { type: mongoose.Schema.Types.Number, default: 0 },
    },
    advanced: {
      progress: { type: mongoose.Schema.Types.Number, default: 0 },
      quizScore: { type: mongoose.Schema.Types.Number, default: 0 },
      totalQuizAnswered: { type: mongoose.Schema.Types.Number, default: 0 },
    },
  },
});

export interface USER extends mongoose.Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  track: {
    basic: {
      progress: number;
      quizScore: number;
      totalQuizAnswered: number;
    };
    intermediate: {
      progress: number;
      quizScore: number;
      totalQuizAnswered: number;
    };
    advanced: {
      progress: number;
      quizScore: number;
      totalQuizAnswered: number;
    };
  };
}

const userModel = mongoose.model<USER>('users', userSchema);

export default module.exports = userModel;
