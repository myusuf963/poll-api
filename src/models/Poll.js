import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  votes: {
    type: Array,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
});

const Poll = mongoose.model('Poll', pollSchema);
export default Poll;
