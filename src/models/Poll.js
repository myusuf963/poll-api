import mongoose from 'mongoose';
import { voteSchema } from './Vote.js';

const PollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['news', 'sports', 'live-tv', 'movies', 'music', 'games', 'other'],
  },

  votes: {
    type: Array,
    required: false,
  },
  user: {
    type: String,
    required: false,
  },
  voters: [voteSchema],
  created_at: {
    type: Date,
    default: Date.now,
  },
  expires_at: {
    type: Date,
  },
  expired: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    required: true,
  },
});

PollSchema.pre('save', function (next) {
  const poll = this;
  poll.expired = expired(poll);
  next();
});

const expired = (poll) => {
  const now = new Date();
  const expires = new Date(poll.expires_at);
  return now > expires;
};

const Poll = mongoose.model('Poll', PollSchema);
export default Poll;
