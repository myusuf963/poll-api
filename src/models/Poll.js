import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const Poll = mongoose.model('Poll', pollSchema);
export default Poll;
