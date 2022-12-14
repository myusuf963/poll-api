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
  results: {
    type: [],
    required: false,
  },
  user: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
    enum: ['news', 'sports', 'live-tv', 'movies', 'music', 'games', 'other'],
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
PollSchema.pre('save', function (next) {
  const poll = this;
  var now = new Date();
  poll.expires_at = now.setMinutes(now.getMinutes() + poll.duration);
  next();
});

PollSchema.pre('save', function (next) {
  const poll = this;
  const now = new Date();
  poll.expired = now > poll.expires_at;
  next();
});

const expired = (poll) => {
  const now = new Date();
  const expires = new Date(poll.expires_at);
  return now > expires;
};

const Poll = mongoose.model('Poll', PollSchema);
export default Poll;