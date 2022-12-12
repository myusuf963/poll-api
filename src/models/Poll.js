import mongoose from 'mongoose';

const PollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  votes: {
    type: Array,
    required: false,
  },
  user: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const Poll = mongoose.model('Poll', PollSchema);
export default Poll;
